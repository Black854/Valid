import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from 'redux';
import thunkMiddleWare, { ThunkDispatch } from 'redux-thunk'
import { appReducer } from './Reducers/appReducer';
import { equipmentReducer } from './Reducers/equipmentReducer';
import { premisesReducer } from './Reducers/premisesReducer';
import { authReducer } from './Reducers/authReducer';
import { systemsReducer } from './Reducers/systemsReducer';
import { processesReducer } from './Reducers/processesReducer';
import { instrumentsReducer } from './Reducers/instrumentsReducer';
import { plansReducer } from './Reducers/plansReducer';
import { vmpReducer } from './Reducers/vmpReducer';
import { workReducer } from './Reducers/workReducer';
import { paperplanesReducer } from './Reducers/paperplanesReducer';

let rootReducer = combineReducers({
  app: appReducer,
  equipment: equipmentReducer,
  premises: premisesReducer,
  systems: systemsReducer,
  processes: processesReducer,
  instruments: instrumentsReducer,
  auth: authReducer,
  plans: plansReducer,
  vmp: vmpReducer,
  work: workReducer,
  paperplanes: paperplanesReducer,
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
