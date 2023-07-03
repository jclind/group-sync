import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { AddressType, EventType } from '../../types'
import { auth, db } from './firestore'

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
  if (uid) {
    const eventData: EventType = {
      name,
      description,
      locationName,
      address,
      dates,
      eventCreatorUID: uid,
    }

    try {
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
