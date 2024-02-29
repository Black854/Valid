import { DatePicker, Popconfirm, Typography } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../redux/store'
import { getCurrentPremData, updateReestrDatePremTask } from '../../../../redux/Reducers/premisesReducer'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { getCurrentEquipData, updateReestrDateEquipTask } from '../../../../redux/Reducers/equipmentReducer'
import { getCurrentSysData, updateReestrDateSysTask } from '../../../../redux/Reducers/systemsReducer'
import { getCurrentProcData, updateReestrDateProcTask } from '../../../../redux/Reducers/processesReducer'
import { WorkChangesDataType } from '../../../../redux/Reducers/workReducer'
import { TaskChanges } from './TaskChanges'

dayjs.locale('ru')
const { Text } = Typography

const widthScreen = window.innerWidth

type ConvertDateType = {
    date: string | undefined
    id: string
    objectId: string
    dateType: 'dvp' | 'dvo'
    group: 'equipment' | 'premises' | 'systems' | 'processes'
    myDataIdArray: string[]
    access: number
    changes: WorkChangesDataType | undefined
}

export const DatePickerForWork: React.FC<ConvertDateType> = ({ id, objectId, date, dateType, group, myDataIdArray, access, changes }) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const handleDateChange = (date: any) => {
        setSelectedDate(date)
        setPopconfirmVisible(true)
    }

    const handleConfirm = async () => {
        const date = new Date(selectedDate)
        let formattedSelectedDate = format(date, 'yyyy-MM-dd') // Текущая дата для сравнения с датой объекта
        formattedSelectedDate === '1970-01-01' && (formattedSelectedDate = '')
        setPopconfirmVisible(false)
        if (group === 'premises') {
            await dispatch(updateReestrDatePremTask(id, objectId, formattedSelectedDate, dateType))
            await dispatch(getCurrentPremData(myDataIdArray))
        } else if (group === 'equipment') {
            await dispatch(updateReestrDateEquipTask(id, objectId, formattedSelectedDate, dateType))
            await dispatch(getCurrentEquipData(myDataIdArray))
        } else if (group === 'systems') {
            await dispatch(updateReestrDateSysTask(id, objectId, formattedSelectedDate, dateType))
            await dispatch(getCurrentSysData(myDataIdArray))
        } else if (group === 'processes') {
            await dispatch(updateReestrDateProcTask(id, objectId, formattedSelectedDate, dateType))
            await dispatch(getCurrentProcData(myDataIdArray))
        }
    }

    const handleCancel = () => {
        setPopconfirmVisible(false)
    }

    let dateFormat = "DD.MM.YYYY"

    const disabledDate = (current: any) => {
        const today = dayjs()

        // Сравниваем текущую дату с выбранной датой и заблокируем все даты после сегодняшней
        return current && current > today //добавить  сюда еще блокирование дат раньше предыдущего отчета
    }

    if (date) {
        let parts = date.split('.')
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const day = parts[0]
            const month = parts[1]
            const year = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            return <Text>{date}</Text>
        }

        parts = date.split('-')
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const year = parts[0]
            const month = parts[1]
            const day = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            return <>
                <Popconfirm
                    title="Подтверждение изменений"
                    description="Вы уверены, что хотите изменить данные?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    okText="Да"
                    cancelText="Нет"
                    open={isPopconfirmVisible}
                >
                    <DatePicker disabled={access > 4} style={{ borderColor: '#87d068', accentColor: 'green', color: 'red' }} size='small' status={date === '' ? 'warning' : undefined} allowClear disabledDate={disabledDate} format={'DD.MM.YYYY'} value={dayjs(date, dateFormat)} onChange={(date) => handleDateChange(date)} />
                </Popconfirm>
                {changes && <TaskChanges changes={changes} key={changes.id} style={{position: 'relative', bottom: '2px', left: '6px'}} />}
            </>
        }
    } else {
        return <Popconfirm
            title="Подтверждение изменений"
            description="Вы уверены, что хотите изменить данные?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Да"
            cancelText="Нет"
            open={isPopconfirmVisible}
        >
            <DatePicker style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { }} disabled={access > 4} size='small' status={date === '' ? 'warning' : undefined} allowClear disabledDate={disabledDate} format={'DD.MM.YYYY'} onChange={(date) => handleDateChange(date)} />
        </Popconfirm>
    }
    return <></>
}