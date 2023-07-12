import {
  DocumentSnapshot,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  AddressType,
  AvailabilityObjectType,
  EventType,
  PublicUserDataType,
  UsersAttendingType,
} from '../../types'
import { auth, db } from './firestore'
import { getUserData } from './auth'

const BASE_LINK = 'http://localhost:3000'

export const getEventLink = (eventID: string): string => {
  return BASE_LINK + `/event/${eventID}`
}

export const createEvent = async (
  name: string,
  description: string,
  locationName: string,
  address: AddressType | null,
  dates: string[]
): Promise<string | undefined> => {
  const uid = auth?.currentUser?.uid ?? null
  const email = auth?.currentUser?.email ?? null
  if (uid) {
    try {
      const userDataRes = await getDoc(doc(db, 'users', uid))
      const userData = userDataRes.data() as PublicUserDataType | undefined
      if (!userData) throw new Error('Please Log In')

      const eventData: EventType = {
        name,
        description,
        locationName,
        address,
        dates,
        authorData: {
          uid,
          name: userData.name,
          username: userData.username,
          email,
        },
      }

      const eventDocRef = await addDoc(collection(db, 'events'), eventData)
      const eventID = eventDocRef.id
      const inviteLink = getEventLink(eventID)
      return inviteLink
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export const getEvent = async (eventID: string): Promise<EventType> => {
  const eventDocRef = doc(db, 'events', eventID)
  const eventDocSnap = await getDoc(eventDocRef)

  if (!eventDocSnap.exists()) {
    throw new Error('Event Does Not Exist')
  }
  const res: EventType = eventDocSnap.data() as EventType
  return res
}

export const setUserAvailability = async (
  eventID: string,
  userID: string,
  { date, type }: AvailabilityObjectType
) => {
  const eventDocRef = doc(db, 'events', eventID)
  const userAvailabilityCol = collection(eventDocRef, 'userAvailability')
  const userAvailabilityDoc = doc(userAvailabilityCol, userID)
  const docSnapshot: DocumentSnapshot = await getDoc(userAvailabilityDoc)
  if (docSnapshot.exists()) {
    // Document already exists, update the data
    try {
      await setDoc(userAvailabilityDoc, { [date]: type }, { merge: true })
    } catch (error: any) {
      throw new Error(error.message)
    }
  } else {
    // Document doesn't exist, set the data for the first time
    const localUser = JSON.parse(
      localStorage.getItem('GROUP_SYNC_USER_DATA') || ''
    )

    let name
    const email = auth?.currentUser?.email || localUser.email

    let firestoreUserData

    try {
      firestoreUserData = await getUserData(userID)
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        firestoreUserData = undefined
      } else {
        throw new Error(error.message)
      }
    }
    try {
      if (firestoreUserData?.name) {
        name = firestoreUserData.name
      } else {
        const localUser = JSON.parse(
          localStorage.getItem('GROUP_SYNC_USER_DATA') || ''
        )
        if (!localUser?.name) {
          throw new Error('USER NOT AUTHENTICATED, PLEASE REFRESH')
        } else {
          name = localUser.name
        }
      }
      await setDoc(userAvailabilityDoc, {
        [date]: type,
        uid: userID,
        name,
        email,
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
export const getUserAvailability = async (
  eventID: string,
  userID: string
): Promise<AvailabilityObjectType[] | undefined> => {
  const eventDocRef = doc(db, 'events', eventID)
  const userAvailabilityCol = collection(eventDocRef, 'userAvailability')
  const userAvailabilityDoc = doc(userAvailabilityCol, userID)
  const res = await getDoc(userAvailabilityDoc)
  const data: AvailabilityObjectType[] | undefined =
    res.data() as AvailabilityObjectType[]
  return data
}

export const getAttendingUsers = async (
  eventID: string
): Promise<UsersAttendingType[]> => {
  try {
    const eventDocRes = doc(db, 'events', eventID)
    const userAvailabilityCol = collection(eventDocRes, 'userAvailability')
    const usersListRes = await getDocs(userAvailabilityCol)

    const userList: { name: string; email: string }[] = []

    usersListRes.forEach(doc => {
      const userData = doc.data()
      const { name, email } = userData
      userList.push({ name, email })
    })

    return userList
  } catch (error: any) {
    throw new Error(error.message)
  }
}
