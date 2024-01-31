import { Switch, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getTermSettingsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"
import { getLabelTermSettings, setLabelTermSettings } from "../../../redux/Reducers/appReducer"

const { Text } = Typography

type PremModesPropsType = {
    access: number
}

export const OtherSettings: React.FC<PremModesPropsType> = ({ access }) => {
    const dispatch: AppDispatch = useDispatch()
    
    const termSettings = useSelector(getTermSettingsSelector)

    useEffect(() => {
        !termSettings && dispatch(getLabelTermSettings())
    }, [])

    const handleChangeType = (param: boolean) => {
        let paramLabel
        param ? paramLabel = '1' : paramLabel = '0'
        dispatch(setLabelTermSettings(paramLabel))
    }

    return <>
        <Text style={{fontSize: '14pt', marginTop: '15px', display: 'inline-block', marginRight: '20px'}}>Добавлять 1 месяц к сроку действия валидационного статуса</Text>
        <Switch disabled={access > 1} size="small" style={{position: 'absolute', top: '24px'}} checked={termSettings ? termSettings === '1' : false} onChange={(param) => handleChangeType(param)} />
    </>
}