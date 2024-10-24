export const initialProduct = { name: '', price: 0, quantity: 0 }

export const initialRestaurant = {
  id: '',
  category: '',
  name: '',
  address: {
    street: '',
    postalCode: '',
    city: ''
  },
  image: '',
  shippingCost: {
    freeShipping: true,
    shippingCost: 0,
    minOrder: 0
  }
}

export const initialUserProfile = {
  name: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: 'Rome',
  country: 'Italy',
}