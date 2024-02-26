import { Button, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateEquipWorkData } from "../../../../redux/Reducers/equipmentReducer"
import { getCurrentPremData, updatePremWorkData } from "../../../../redux/Reducers/premisesReducer"
import { getCurrentSysData, updateSysWorkData } from "../../../../redux/Reducers/systemsReducer"
import { getCurrentProcData, updateProcWorkData } from "../../../../redux/Reducers/processesReducer"
import { WorkChangesDataType } from "../../../../redux/Reducers/workReducer"
import { TaskChanges } from "./TaskChanges"

const { Text } = Typography

type PropsType = {
    data: any,
    myEquipDataIdArray?: any,
    myPremDataIdArray?: any,
    mySysDataIdArray?: any,
    myProcDataIdArray?: any,
    objectType: 'equipment' | 'premises' | 'systems' | 'processes',
    access: number
    changes: WorkChangesDataType | undefined
}

export const LabelStatus: React.FC<PropsType> = ({ data, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, access, changes }) => {
    const dispatch: AppDispatch = useDispatch()

    const widthScreen = window.innerWidth

    const handleLabelSwitch = async (pol: string) => {
        if (objectType === 'equipment') {
            await dispatch(updateEquipWorkData(data.id, 'et', pol))
            await dispatch(getCurrentEquipData(myEquipDataIdArray))
        } else if (objectType === 'premises') {
            await dispatch(updatePremWorkData(data.id, 'et', pol))
            await dispatch(getCurrentPremData(myPremDataIdArray))
        } else if (objectType === 'systems') {
            await dispatch(updateSysWorkData(data.id, 'et', pol))
            await dispatch(getCurrentSysData(mySysDataIdArray))
        } else if (objectType === 'processes') {
            await dispatch(updateProcWorkData(data.id, 'et', pol))
            await dispatch(getCurrentProcData(myProcDataIdArray))
        }
    }
    return data.et === '' ?
        <Button disabled={access > 4} onClick={() => handleLabelSwitch('1')} type="default" size="small">
            <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { fontSize: '11pt' }} type="warning">Не приклеена</Text>
        </Button> :
        <>
            <Button disabled={access > 4} onClick={() => handleLabelSwitch('')} type="default" size="small">
                <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { fontSize: '11pt' }} type="success">Приклеена</Text>
            </Button>
            {changes && <TaskChanges changes={changes} key={changes.id} />}
        </>
}