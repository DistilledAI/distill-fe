import rootReducer from "@reducers/index"
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
// import sessionStorage from "redux-persist/lib/storage/session"
import localStorage from "redux-persist/lib/storage"

// let store: Store
// let persistor: Persistor

// const initStore = () => {
//   const persistConfig = {
//     key: "root",
//     storage: localStorage,
//     whitelist: ["agents", "sidebarCollapsed", "user"],
//   }

//   const persistedReducer = persistReducer(persistConfig, rootReducer)

//   store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false,
//       }),
//   })

//   persistor = persistStore(store)
// }

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: [
    "sidebarCollapsed",
    "user",
    "instructBanner",
    "firstLogin",
    "priceInfo",
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { persistor, store }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
