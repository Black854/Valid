import { Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateReestrDocsCodeEquip } from "../../../../redux/Reducers/equipmentReducer"
import { getCurrentPremData, updateReestrDocsCodePrem } from "../../../../redux/Reducers/premisesReducer"
import { getCurrentSysData, updateReestrDocsCodeSys } from "../../../../redux/Reducers/systemsReducer"
import { getCurrentProcData, updateReestrDocsCodeProc } from "../../../../redux/Reducers/processesReducer"

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
}

export const ProtocolCode: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, access }) => {
    const dispatch: AppDispatch = useDispatch()
    
    const widthScreen = window.innerWidth

    const handleUpdateDocsCode = async (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {

        if (objectType === 'equipment') {
            await dispatch(updateReestrDocsCodeEquip(rec.id, recordId, text, dataType))
            await dispatch(getCurrentEquipData(myEquipDataIdArray))
        } else if (objectType === 'premises') {
            await dispatch(updateReestrDocsCodePrem(rec.id, recordId, text, dataType))
            await dispatch(getCurrentPremData(myPremDataIdArray))
        } else if (objectType === 'systems') {
            await dispatch(updateReestrDocsCodeSys(rec.id, recordId, text, dataType))
            await dispatch(getCurrentSysData(mySysDataIdArray))
        } else if (objectType === 'processes') {
            await dispatch(updateReestrDocsCodeProc(rec.id, recordId, text, dataType))
            await dispatch(getCurrentProcData(myProcDataIdArray))
        }
    }

    return data.nvp === '' ? <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? { } : { fontSize: '12pt' }} editable={{ onChange: (text: string) => handleUpdateDocsCode(data.id, text, 'nvp'), text: '' }} type="warning">Нет данных</Text> :
        <Text type="success"
            style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? { } : { fontSize: '12pt' }}
            editable={access > 4 ? false : {
                onChange: (text: string) => { handleUpdateDocsCode(data.id, text, 'nvp') }
            }}>
            {data.nvp}
        </Text>
}