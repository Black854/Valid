import { Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getIsIntervalLoading } from "../../redux/equipmentSelectors"
import { getIntervals } from "../../redux/appSelectors"
import { updateInterval } from "../../redux/equipmentReducer"
import { AppDispatch } from "../../redux/store"

type ArHelperPropsType = {
    ar: string
    id: string
}

export const ArHelper: React.FC<ArHelperPropsType> = ({ar, id}) => {
    const data = useSelector(getIntervals)
    const dispatch: AppDispatch = useDispatch()
    const isIntervalLoading = useSelector(getIsIntervalLoading)
    const handleUpdateInterval = (interval: string) => {
        dispatch(updateInterval(id, interval))
    }

    return (
        <Select
            style={{paddingRight: '20px', marginLeft: '-7px'}}
            dropdownStyle={{width: '300px'}}
            defaultValue={ar}
            onChange={handleUpdateInterval}
            size="small"
            bordered={false}
            options={data}
            loading={isIntervalLoading}
        />
    )
}