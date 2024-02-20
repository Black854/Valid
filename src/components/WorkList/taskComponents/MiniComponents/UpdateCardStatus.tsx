import { Button, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateEquipWorkData } from "../../../../redux/Reducers/equipmentReducer"
import { getCurrentPremData, updatePremWorkData } from "../../../../redux/Reducers/premisesReducer"
import { getCurrentSysData, updateSysWorkData } from "../../../../redux/Reducers/systemsReducer"
import { getCurrentProcData, updateProcWorkData } from "../../../../redux/Reducers/processesReducer"

const { Text } = Typography

type PropsType = {
    data: any,
    myEquipDataIdArray?: any,
    myPremDataIdArray?: any,
    mySysDataIdArray?: any,
    myProcDataIdArray?: any,
    objectType: 'equipment' | 'premises' | 'systems' | 'processes'
    access: number
}

export const UpdateCardStatus: React.FC<PropsType> = ({ data, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, access }) => {
    const dispatch: AppDispatch = useDispatch()
    
    const widthScreen = window.innerWidth

    const handleLabelSwitch = async (pol: string) => {
        if (objectType === 'equipment') {
            await dispatch(updateEquipWorkData(data.id, 'isCardUpdated', pol))
            await dispatch(getCurrentEquipData(myEquipDataIdArray))
        } else if (objectType === 'premises') {
            await dispatch(updatePremWorkData(data.id, 'isCardUpdated', pol))
            await dispatch(getCurrentPremData(myPremDataIdArray))
        } else if (objectType === 'systems') {
            await dispatch(updateSysWorkData(data.id, 'isCardUpdated', pol))
            await dispatch(getCurrentSysData(mySysDataIdArray))
        } else if (objectType === 'processes') {
            await dispatch(updateProcWorkData(data.id, 'isCardUpdated', pol))
            await dispatch(getCurrentProcData(myProcDataIdArray))
        }
    }
    return data.isCardUpdated === '' ?
        <Button disabled={access > 4} onClick={() => handleLabelSwitch('1')} type="default" size="small">
            <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? { } : { fontSize: '12pt' }} type="warning">Не актуализирована</Text>
        </Button> :
        <Button disabled={access > 4} onClick={() => handleLabelSwitch('')} type="default" size="small">
            <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? { } : { fontSize: '12pt' }} type="success">Актуализирована</Text>
        </Button>
}