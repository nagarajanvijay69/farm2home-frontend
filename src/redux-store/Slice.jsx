import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
     name: 'data',
     initialState: {
          Login: false,
          User: "",
          products: [],
          filterProduct: [],
          otp: Number,
          cart: [],
          order: [],
          allorder: [],
          prompt : ""
     },
     reducers: {
          setLogin: (state) => {
               state.Login = true
          },
          setLogout: (state) => {
               state.Login = false,
                    state.User = "",
                    state.cart = []
                    // state.order = []
          },
          setUser: (state, action) => {
               state.User = action.payload;
               // state.cart = action.payload.cart || [];
          },
          setProducts: (state, action) => {
               state.products = action.payload;
          },
          addProducts: (state, action) => {
               state.filterProduct = action.payload;
          },
          Setotp: (state, action) => {
               state.otp = action.payload;
          },
          initCart: (state, action) => {
               state.cart = action.payload || [];
          },
          addCart: (state, action) => {
               const id = action.payload;

               const product = state.products.find(item => item._id === id);
               const existingCartItem = state.cart.findIndex(item => item.productId === id);
               console.log('product', product);
               console.log('index', existingCartItem);
               if (existingCartItem > -1) {
                    state.cart[existingCartItem].quantity += 1;
               } else {
                    state.cart.push({
                         productId: id,
                         name: product.name,
                         category: product.category,
                         discription: product.discription,
                         offerPrice: product.offerPrice,
                         price: product.price,
                         imageOne: product.imageOne,
                         imageTwo: product.imageTwo,
                         imageThree: product.imageThree,
                         imageFour: product.imageFour,
                         isStock: product.isStock,
                         quantity: 1
                    });
               }
          },
          removeCart: (state, action) => {
               const index = action.payload;
               state.cart.splice(index, 1);
          },
          addOrder: (state, action) => {
               state.order.push(action.payload);
          },
          initOrder: (state, action) => {
               state.order = action.payload;

          },
          initallorder: (state, action) => {
               if (state.order[0]) {
                    state.allorder.push(action.payload);
               } else {
                    state.allorder[0] = action.payload;
               }
          },
          setPrompt: (state, action) => {
               state.prompt = action.payload;
          }
     }
})


export default Slice.reducer
export const { setLogin, setLogout, setUser, setProducts, addProducts, Setotp,
     initCart, addCart, removeCart, addOrder, initOrder, initallorder, setPrompt
} = Slice.actions