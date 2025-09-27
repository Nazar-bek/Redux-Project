import players from "../slices/players-slice";
import filters from "../slices/filters-slice";
import { configureStore } from "@reduxjs/toolkit";

const middleWare = () => (next) =>(action) =>{
  if(typeof action === "string"){
    return next({type: action})
  }
  return next(action)
}
const store = configureStore({
  reducer: {
    players, filters
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
  devTools: true,
})
export default store









// const devTools =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();



// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args)
//     const oldDispacth = store.dispatch

//     store.dispatch = action => {
//         if(typeof action === "string"){
//             return oldDispacth({
//                 type: action
//             })
//         }
//         return oldDispacth(action)
//     }
//     return store
// }
