import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from './postSlice.js';
import socketSlice from "./socketSlice.js"
import chatSlice from "./chatSlice.js";
import rtnSlice from "./rtnSlice.js";
import { authAPi, postApi, userApi, messageApi } from "@/service/index.js";

import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:rtnSlice,
    [authAPi.reducerPath]: authAPi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
})

// Custom middleware to handle unauthorized responses
const unauthorizedMiddleware = (store) => (next) => (action) => {
    if (
      action?.payload?.status === 401
    ) {
      cookies.remove("social");
      cookies.remove("social_user");
      cookies.remove("isLoggedIn");
    }
  
    return next(action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            authAPi.middleware,
            postApi.middleware,
            userApi.middleware,
            messageApi.middleware,
        ]).concat([
            unauthorizedMiddleware,
        ])
});
export default store;