import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import thunkMiddleWare, { ThunkDispatch } from 'redux-thunk'
import { appReducer } from './appReducer';
import { equipmentReducer } from './equipmentReducer';

let rootReducer = combineReducers({
  app: appReducer,
  equipment: equipmentReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>

type PropertiesTypes<T> = T extends {[key: string]: infer U } ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
      store:any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleWare)
))

window.store = store
