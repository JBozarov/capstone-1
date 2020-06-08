import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import './Cart.css'
import logo from '../../logo.svg'
import { BsArrowRight } from 'react-icons/bs'
import { Button } from 'react-bootstrap'
import { emptyCart, updateQuantity, removeItem } from '../../redux/reducers/cartReducer'
import paypal from './paypal.jpg'

const Cart = (props) => {
   const [ qty, setQty ] = useState(1)
   const [ tempIndex, setTempIndex ] = useState(0)
   const cart = useSelector(state => state.cartReducer)
   console.log("added cart", cart)
   const dispatch = useDispatch();
   
   const total = cart.reduce((a, b) => parseFloat(a) + parseFloat(b.totalPrice), 0); 
   let grantTotal = (total*1.08).toFixed(2)

   const onToken = token => {
      dispatch(emptyCart()); 
   }

   const handleChange = (e, i) => {
      setQty(e.target.value)
      setTempIndex(i)
   }

   console.log(qty, tempIndex); 
   const updateItem = ind => {
      if ( tempIndex === ind ) {
         dispatch(updateQuantity(tempIndex, qty))
      }
   }

   const remove = index => dispatch(removeItem(index))
   return (
      <div className='cart-component'>
      
         <div className='cart-items' >
         {cart.length>0 ? cart.map((item, index) => 
            <div key={index} className='single-cart-item' > 
               <img src={item.images} className='cart-image' /> 
               <div className='right-box'>
                  <h6> {item.name} </h6>
                  <h5> Price: {item.price} and total: {item.totalPrice} </h5>
                  <p> SIZE: {item.size} </p>
                  <p> QTY: {item.quantity} </p>
                  <p className='qty-and-update' >
                     {/*<label>Qty: <select>{[...Array(50)].map((e, i)=><option value={i+1} onChange={e => handleChange(e, item.id)} key={i}>{i+1}</option>)}</select></label>*/}
                     <input type='number' min='1' className='quantity-input' onChange={e => handleChange(e, index)} />
                     <Button variant="outline-dark" size="sm" onClick={() => updateItem(index)} >UPDATE</Button>{' '}
                     <Button variant="outline-dark" size="sm" onClick={() => remove(index)} >REMOVE</Button>{' '}
                  </p>
               </div>
            </div>
            ) : <h1> Your cart is empty </h1> }
         </div>

         <div className='payment' >
            <div className='payment-box-1' >CHECKOUT <span> <BsArrowRight size={30} ></BsArrowRight> </span> </div>
            <div className='payment-box-1' style={{backgroundColor: 'white', color: 'black'}} > <img src={paypal} className='paypal-img' /> <span> <BsArrowRight size={30} ></BsArrowRight> </span> </div>
            <div className='order-summary' >
               <h3>ORDER SUMMARY</h3>
               <h5 className='order-summary-line' ><span>PURCHASED ITEMS</span><span>{total.toFixed(2)}</span> </h5>
               <h5 className='order-summary-line' ><span>DELIVERY</span><span>FREE</span> </h5>
               <h5 className='order-summary-line' ><span>SALES TAX ( 8%) </span><span>{(total*0.08).toFixed(2)}</span> </h5>
               <input placeholder='Enter promo code' className='promo-code-input' />
               <h5 className='order-summary-line' style={{fontWeight: '800'}} ><span>GRANT TOTAL</span><span>{grantTotal}</span> </h5>
            </div>
            <StripeCheckout name='SOMERTON' description='making a payment' 
               stripeKey='pk_test_Syf0NZeZFNpsmNmcoGCC9D7500Ek6o36XW' token={onToken} 
               image={logo}
               amount={total*100} panelLabel="Submit Payment" 
               allowRememberMe={true} billingAddress={false} zipCode={false} >
            </StripeCheckout>
         </div>
      </div>
   )
}

export default Cart