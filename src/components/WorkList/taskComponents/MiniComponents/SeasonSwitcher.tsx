import { Button, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentPremData, updatePremWorkData } from "../../../../redux/Reducers/premisesReducer"

const { Text } = Typography

type PropsType = {
    data: any,
    myPremDataIdArray: any
}

export const SeasonSwitcher: React.FC<PropsType> = ({ data, myPremDataIdArray }) => {
    const dispatch: AppDispatch = useDispatch()

    const handleLabelSwitch = async (pol: string) => {
        await dispatch(updatePremWorkData(data.id, 'season', pol))
        await dispatch(getCurrentPremData(myPremDataIdArray))
    }

    return data.season === '0' ?
        <Button onClick={() => handleLabelSwitch('1')} type="default">
            <Text type="warning">Не указан</Text>
        </Button> :
        data.season === '1' ?
            <Button onClick={() => handleLabelSwitch('2')} type="default">
                <Text type="success">Вне сезонов</Text>
            </Button> :
            data.season === '2' ?
                <Button onClick={() => handleLabelSwitch('3')} type="default">
                    <Text type="success">Зима</Text>
                </Button> :
                <Button onClick={() => handleLabelSwitch('0')} type="default">
                    <Text type="success">Лето</Text>
                </Button>
}