import { Timestamp } from 'firebase/firestore'

export interface EventType {
  name: string
  description: string
  locationName: string
  address: AddressType | null
  dates: string[]
  authorData: {
    uid: string
    name: string
    username: string | undefined
    email: string | null
  }
}
export type UsersAttendingType = {
  name: string
  email?: string
}

export interface AddressType {
  address_components: AddressComponent[]
  formatted_address: string
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export type UserLocalDataType = {
  name: string
  email?: string
  uid: string
  availability?: AvailabilityType[]
}

export type AvailabilityObjectType = {
  date: string
  type: 'AVAILABLE' | 'MAYBE' | 'BUSY'
}
export type AvailabilityType = 'AVAILABLE' | 'MAYBE' | 'BUSY'

export type PublicUserDataType = {
  name: string
  username?: string
  dateJoined: string
  hasAccount: boolean
}

export type EventMessageType = {
  text: string
  name: string
  avatarURL: string
  createdAt: number
}
