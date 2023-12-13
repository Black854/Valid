import { Button, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentEquipData, updateEquipWorkData, updateReestrDocsCodeEquip } from "../../../../redux/Reducers/equipmentReducer"

const { Text } = Typography

type PropsType = {
    data: any,
    myEquipDataIdArray: any
}

export const PamStatus: React.FC<PropsType> = ({ data, myEquipDataIdArray }) => {
    const dispatch: AppDispatch = useDispatch()

    const handleLabelSwitch = async (pol: string) => {
        await dispatch(updateEquipWorkData(data.id, 'pam2', pol))
        await dispatch(getCurrentEquipData(myEquipDataIdArray))
    }
    return data.pam2 === '' ?
        <Button onClick={() => handleLabelSwitch('1')} type="default" size="small">
            <Text type="warning">Не приклеена</Text>
        </Button> :
        <Button onClick={() => handleLabelSwitch('')} type="default" size="small">
            <Text type="success">Приклеена</Text>
        </Button>
}