import { Button, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { getCurrentPremData, updatePremWorkData } from "../../../../redux/Reducers/premisesReducer"

const { Text } = Typography

type PropsType = {
    data: any,
    myPremDataIdArray: any
    access: number
}

export const SeasonSwitcher: React.FC<PropsType> = ({ data, myPremDataIdArray, access }) => {
    const dispatch: AppDispatch = useDispatch()
    
    const widthScreen = window.innerWidth

    const handleLabelSwitch = async (pol: string) => {
        await dispatch(updatePremWorkData(data.id, 'season', pol))
        await dispatch(getCurrentPremData(myPremDataIdArray))
    }

    return data.season === '0' ?
        <Button disabled={access > 4} onClick={() => handleLabelSwitch('1')} type="default" size="small">
            <Text type="warning">Не указан</Text>
        </Button> :
        data.season === '1' ?
            <Button disabled={access > 4} onClick={() => handleLabelSwitch('2')} type="default" size="small">
                <Text type="success">Вне сезонов</Text>
            </Button> :
            data.season === '2' ?
                <Button disabled={access > 4} onClick={() => handleLabelSwitch('3')} type="default" size="small">
                    <Text type="success">Зима</Text>
                </Button> :
                <Button disabled={access > 4} onClick={() => handleLabelSwitch('0')} type="default" size="small">
                    <Text type="success">Лето</Text>
                </Button>
}