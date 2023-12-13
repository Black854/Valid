import { Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateReestrDocsCodeEquip } from "../../../../redux/Reducers/equipmentReducer"

const { Text } = Typography

type PropsType = {
    data: any,
    rec: any,
    myEquipDataIdArray: any
}

export const ReportCode: React.FC<PropsType> = ({data, rec, myEquipDataIdArray}) => {
    const dispatch: AppDispatch = useDispatch()

    const handleUpdateDocsCode = async (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        await dispatch(updateReestrDocsCodeEquip(rec.id, recordId, text, dataType))
        await dispatch(getCurrentEquipData(myEquipDataIdArray))
    }

    return data.nvo === '' ? <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(data.id, text, 'nvo'), text: '' }} type="warning">Нет данных</Text> :
    <Text type="success"
        editable={{
            onChange: (text: string) => { handleUpdateDocsCode(data.id, text, 'nvo') }
        }}>
        {data.nvo}
    </Text>
}