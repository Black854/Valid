import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./store"

const initialState = {
    isAuth: true,
    login: 'black',
    userId: '21',
    userName: 'Чернов К.А.',
    apiKey: '',
}

type InitialStateType = typeof initialState
export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// export const getEquipGroups = (type: 'active' | 'all'): ThunkType => async (dispatch) => {
//     let data = await appAPI.getEquipGroups(type)
//     dispatch(appActions.setEquipGroups(data.groups))
// }

type ActionTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const appActions = {
    // setEquipGroups: ( data: EquipGroup[] ) => ({type: 'app/SET_EQUIP_GROUPS', data} as const),
}