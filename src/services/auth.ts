import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from './firestore'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

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

export const signUpDefault = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) throw new Error('Username Taken')

    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    setUsername(username, userCred.user.uid)
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
// export const loginDefault = async (email: string)

// Sign up with email and password
// export const signUpWithEmailAndPassword = async (
//   email: string,
//   password: string
// ): Promise<User> => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     )
//     return userCredential.user
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// // Sign in with email and password
// export const signInWithEmailAndPassword = async (
//   email: string,
//   password: string
// ): Promise<User> => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     )
//     return userCredential.user
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// Sign out
// export const signOut = async (): Promise<void> => {
//   try {
//     await signOut(auth)
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

// // Get the currently authenticated user
// export const getCurrentUser = (): User | null => {
//   const user = auth.currentUser
//   return user
// }
