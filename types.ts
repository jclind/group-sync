export interface EventType {
  name: string
  description: string
  locationName: string
  address: AddressType | null
  dates: string[]
  eventCreatorUID: string
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
