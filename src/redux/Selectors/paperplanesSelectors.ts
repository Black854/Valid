import { AppStateType } from "../store"

export const getPaperplanesSelector = (state: AppStateType) => {
    return (state.paperplanes.paperplanesData)
}

export const getIsPaperplanesLoading = (state: AppStateType) => {
    return (state.paperplanes.isLoading)
}