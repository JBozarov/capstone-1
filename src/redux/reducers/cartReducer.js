import { ADD_TO_CART, EMPTY_CART, UPDATE_CART, REMOVE_ITEM } from './actionTypes'


const initialState = []

export function addToCart(item) {
   return {
      type: ADD_TO_CART, 
      payload: item 
   }
}

export function emptyCart () {
   return {
      type: EMPTY_CART, 
      payload: []
   }
}

export function updateQuantity (index, qty) {
   return {
      type: UPDATE_CART, 
      payload: [index, qty]
   }
}

export function removeItem (index) {
   return {
      type: REMOVE_ITEM, 
      payload: index
   }
}


export const cartReducer = (state = initialState, action ) => {
   const { type, payload } = action
   switch(type) {
      case ADD_TO_CART : {
         if (state.length<1) {
            return [...state, payload]
         }
         else  {

            let cartItems = []; 
            var toggle = true; 

            cartItems = state.map(product => {
               if (product.id === payload.id && product.images === payload.images && product.size === payload.size ){
                  toggle = false
                  product.cartQuantity += 1; 
                  product.totalPrice = product.price * product.cartQuantity; 
                  return product
               } 
               return product; 
            })

            if (toggle) {
               cartItems.push({
                  id: payload.id,
                  name: payload.name,
                  images: payload.images,
                  price: payload.price, 
                  quantity: payload.quantity,
                  cartQuantity: payload.cartQuantity, 
                  serial: payload.serial, 
                  size: payload.size, 
                  totalPrice: payload.totalPrice
               })
            }
         
            return [...cartItems]
         }
         
      }
      case EMPTY_CART : return payload
      case UPDATE_CART : {
         let [index, newQty] = payload; 
         let updatedCart = []
         updatedCart = state.map((product, i) => {
            if (i === parseInt(index)) {
               product.cartQuantity = parseInt(newQty)
               product.totalPrice = product.price * product.cartQuantity;
            }
            return product
         })
         return [...updatedCart]
      }

      case REMOVE_ITEM : {
         let index = payload
         let filtered = state.filter((product, i) => i !== parseInt(index))
         return [...filtered]
      }
      default: return state
   }
}

export default cartReducer