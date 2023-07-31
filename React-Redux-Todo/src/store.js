import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

import todoReducer from './reducers/todoReducer';

const persistConfig = {
    key: 'todos',
    storage
}

const persistedReducer = persistReducer(persistConfig, todoReducer)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(thunk),
        composeEnhancer(applyMiddleware(thunk))
    )
);


export const persistor = persistStore(store)

export default store;


