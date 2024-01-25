import { Button, InputNumber } from "antd"
import { useState } from "react"
import { SaveOutlined } from '@ant-design/icons'
import { VMPDataType, updateVMPPlansData } from "../../redux/Reducers/vmpReducer"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"

type PropsType = {
    data: VMPDataType[]
    month: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11'
    sp: string
    access: number
}

export const CardPlansHelper: React.FC<PropsType> = ({ data, month, sp, access }) => {
    const dispatch: AppDispatch = useDispatch()
    const [daysCount, setDaysCount] = useState(parseInt(data[0]?.[month]) as number | null)
    const handleChangeCount = (text: number | null) => {
        text ? setDaysCount(text) : setDaysCount(0)
    }
    const handleSaveData = () => {
        daysCount !== null &&
        daysCount !== undefined &&
        dispatch(updateVMPPlansData(daysCount, parseInt(month) + 1, data[0].id, sp, data[0].idfromtable, data[0].tablename as 'premises' | 'equipment' | 'systems' | 'processes'))
    }
    return (
        <InputNumber
            style={{ width: '155px' }}
            min={0}
            max={31}
            placeholder="Кол-во дней"
            size="small"
            value={daysCount === 0 ? null : daysCount}
            addonAfter={<Button
                size="small"
                type="link"
                icon={<SaveOutlined style={{ fontSize: '18px' }} />}
                onClick={handleSaveData}
                disabled={parseInt(data[0]?.[month]) === daysCount}
            />}
            onChange={(text: number | null) => handleChangeCount(text)}
            disabled={access > 1}
        />
    )
}