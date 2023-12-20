import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { paperplanesAPI } from "../../api/paperplanesAPI"


export type PaperplanesDataType = {
    id: string
    planename: string
    urlplane: string
}

const initialState = {
    paperplanesData: [] as PaperplanesDataType[],
    isLoading: false
}

type InitialStateType = typeof initialState
export const paperplanesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'paperplanes/SET_IS_LOADING':
            return { ...state, isLoading: action.data }
        case 'paperplanes/SET_PAPERPLANES_DATA':
            return { ...state, paperplanesData: action.data }
        default:
            return state
    }
}

export const getPaperplanes = (): ThunkType => async (dispatch) => {
    dispatch(paperplanesActions.setIsLoading(true))
    let data = await paperplanesAPI.getPaperplanes()
    dispatch(paperplanesActions.setPaperplanesData(data.items))
    dispatch(paperplanesActions.setIsLoading(false))
}

export const deletePaperplanes = (id: string): ThunkType => async (dispatch) => {
    dispatch(paperplanesActions.setIsLoading(true))
    let data = await paperplanesAPI.deletePaperplanes(id)
    dispatch(paperplanesActions.setPaperplanesData(data.items))
    dispatch(paperplanesActions.setIsLoading(false))
}

export const createPaperplanes = (file: any): ThunkType => async (dispatch) => {
    dispatch(paperplanesActions.setIsLoading(true))
    let data = await paperplanesAPI.createPaperplanes(file)
    dispatch(paperplanesActions.setPaperplanesData(data.items))
    dispatch(paperplanesActions.setIsLoading(false))
}

type ActionTypes = InferActionsTypes<typeof paperplanesActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const paperplanesActions = {
    setIsLoading: (data: boolean) => ({ type: 'paperplanes/SET_IS_LOADING', data } as const),
    setPaperplanesData: (data: PaperplanesDataType[]) => ({ type: 'paperplanes/SET_PAPERPLANES_DATA', data } as const),
}