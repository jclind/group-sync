import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from './firestore'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { PublicUserDataType } from '../../types'

interface User {
  uid: string
  email: string
  username: string
}

export const checkUsernameAvailability = async (
  username: string
): Promise<boolean> => {
  try {
    const q = query(
      collection(db, 'usernames'),
      where('username', '==', username)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.empty
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export const setUsername = async (username: string, uid: string) => {
  if (!uid) {
    throw new Error('User not logged in')
  }
  try {
    const usernameDoc = doc(db, 'usernames', uid)
    await setDoc(usernameDoc, { username })
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export const getUsername = async (uid: string) => {
  if (!uid) {
    throw new Error('User ID not passed, Error.')
  }
  try {
    const usernameDoc = doc(db, 'usernames', uid)
    const usernameSnapshot = await getDoc(usernameDoc)
    const usernameData = usernameSnapshot.data()
    return usernameData?.username
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const addUser = async (
  uid: string,
  name: string,
  username: string,
  hasAccount: boolean
) => {
  const userData = {
    name,
    username,
    dateJoined: new Date().toString(),
    hasAccount,
  }
  try {
    const usersDocRef = doc(db, 'users', uid)
    await setDoc(usersDocRef, userData)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export const getUserData = async (
  uid: string
): Promise<PublicUserDataType | undefined> => {
  const userDoc = doc(db, 'publicUserData', uid)
  const userSnapshot = await getDoc(userDoc)

  const res: PublicUserDataType | undefined = userSnapshot.data() as
    | PublicUserDataType
    | undefined
  return res
}

export const signUpDefault = async (
  email: string,
  password: string,
  name: string,
  username: string
) => {
  try {
    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) throw new Error('Username Taken')
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    await setUsername(username, userCred.user.uid)
    await addUser(userCred.user.uid, name, username, true)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const loginDefault = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.log('sign out failed', error.message)
    throw new Error(error.message)
  }
}

export const isCurrUserSignedIn = (userID: string): boolean => {
  const uid = auth?.currentUser?.uid ?? null
  if (uid === userID) return true
  return false
}
