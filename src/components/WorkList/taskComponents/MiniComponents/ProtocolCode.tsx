import { Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateReestrDocsCodeEquipTask } from "../../../../redux/Reducers/equipmentReducer"
import { getCurrentPremData, updateReestrDocsCodePremTask } from "../../../../redux/Reducers/premisesReducer"
import { getCurrentSysData, updateReestrDocsCodeSysTask } from "../../../../redux/Reducers/systemsReducer"
import { getCurrentProcData, updateReestrDocsCodeProcTask } from "../../../../redux/Reducers/processesReducer"
import { WorkChangesDataType } from "../../../../redux/Reducers/workReducer"
import { TaskChanges } from "./TaskChanges"

const { Text } = Typography

type PropsType = {
    data: any,
    rec: any,
    myEquipDataIdArray?: any,
    myPremDataIdArray?: any,
    mySysDataIdArray?: any,
    myProcDataIdArray?: any,
    objectType: 'equipment' | 'premises' | 'systems' | 'processes'
    access: number
    changes: WorkChangesDataType | undefined
}

export const ProtocolCode: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, access, changes }) => {
    const dispatch: AppDispatch = useDispatch()

    const widthScreen = window.innerWidth

    const handleUpdateDocsCode = async (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        if (objectType === 'equipment') {
            await dispatch(updateReestrDocsCodeEquipTask(rec.id, recordId, text, dataType))
            await dispatch(getCurrentEquipData(myEquipDataIdArray))
        } else if (objectType === 'premises') {
            await dispatch(updateReestrDocsCodePremTask(rec.id, recordId, text, dataType))
            await dispatch(getCurrentPremData(myPremDataIdArray))
        } else if (objectType === 'systems') {
            await dispatch(updateReestrDocsCodeSysTask(rec.id, recordId, text, dataType))
            await dispatch(getCurrentSysData(mySysDataIdArray))
        } else if (objectType === 'processes') {
            await dispatch(updateReestrDocsCodeProcTask(rec.id, recordId, text, dataType))
            await dispatch(getCurrentProcData(myProcDataIdArray))
        }
    }

    return data.nvp === '' ? <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { fontSize: '11pt' }} editable={{ onChange: (text: string) => handleUpdateDocsCode(data.id, text, 'nvp'), text: '' }} type="warning">Нет данных</Text> :
        <>
            <Text type="success"
                style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { fontSize: '11pt' }}
                editable={access > 4 ? false : {
                    onChange: (text: string) => { handleUpdateDocsCode(data.id, text, 'nvp') }
                }}>
                {data.nvp}
            </Text>
            {changes && <TaskChanges changes={changes} key={changes.id} style={{position: 'relative', bottom: '2px', left: '4px'}} />}
        </>
}