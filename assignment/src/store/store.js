import { combineReducers, configureStore } from "@reduxjs/toolkit";
import resultReducer from './resultSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
const rootReducer =combineReducers({
  result:resultReducer,
})

const persistConfig = {
    key:"root",
    storage,
    whitelist:["result"],
    stateReconciler: autoMergeLevel1,
    throttle:200,
    timeout:0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =configureStore({
    reducer:persistedReducer,

})
export const persistor = persistStore(store);

