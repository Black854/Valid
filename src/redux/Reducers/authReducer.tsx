import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"

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

// export const getAllValidators = (): ThunkType => async (dispatch) => {
//     let data = await authAPI.getAllValidators()
//     dispatch(authActions.setAllValidators(data.items))
// }

type ActionTypes = InferActionsTypes<typeof authActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const authActions = {
    // setAllValidators: ( data: AllValidators[] ) => ({type: 'auth/SET_ALL_VALIDATORS', data} as const),
}