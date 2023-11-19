import { Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getIntervals } from "../../redux/Selectors/appSelectors"
import { AppDispatch } from "../../redux/store"
import { updateEquipInterval } from "../../redux/Reducers/equipmentReducer"
import { updatePremInterval } from "../../redux/Reducers/premisesReducer"
import { updateSysInterval } from "../../redux/Reducers/systemsReducer"
import { updateProcInterval } from "../../redux/Reducers/processesReducer"

type ArHelperPropsType = {
    ar: string
    id: string
    table: 'equipment' | 'premises' | 'systems' | 'processes'
}

export const ArHelper: React.FC<ArHelperPropsType> = ({ar, id, table}) => {
    const data = useSelector(getIntervals)
    const dispatch: AppDispatch = useDispatch()
    const handleUpdateInterval = (interval: string) => {
        if (table === 'equipment') {
            dispatch(updateEquipInterval(id, interval))
        } else if (table === 'premises') {
            dispatch(updatePremInterval(id, interval))
        } else if (table === 'systems') {
            dispatch(updateSysInterval(id, interval))
        } else if (table === 'processes') {
            dispatch(updateProcInterval(id, interval))
        }
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
        />
    )
}