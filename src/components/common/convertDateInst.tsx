import { DatePicker, Input, Popconfirm, Typography } from 'antd'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateReestrDateEquip } from '../../redux/Reducers/equipmentReducer'
import { AppDispatch } from '../../redux/store'
import { updateReestrDatePrem } from '../../redux/Reducers/premisesReducer'
import { datePickerLocale } from './datePickerLocale'
import { updateReestrDateSys } from '../../redux/Reducers/systemsReducer'
import { updateReestrDateProc } from '../../redux/Reducers/processesReducer'
import { updateEndDate, updateStartDate } from '../../redux/Reducers/instrumentsReducer'
const { Text } = Typography

type ConvertDateType = {
    date: string | undefined
    forbDate: string | undefined
    id: string
    dateType: 'start' | 'end'
}

export const ConvertDateInst: React.FC<ConvertDateType> = ({id, date, dateType, forbDate}) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const handleDateChange = (date: any) => {
        setSelectedDate(date)
        setPopconfirmVisible(true)
    }

    const handleConfirm = () => {
        const date = new Date(selectedDate)
        const formattedSelectedDate = format(date, 'yyyy-MM-dd') === '1970-01-01' ? '' : format(date, 'yyyy-MM-dd')
        dateType === 'start' && dispatch(updateStartDate(id, formattedSelectedDate))
        dateType === 'end' && dispatch(updateEndDate(id, formattedSelectedDate))
        setPopconfirmVisible(false)
    }

    const handleCancel = () => {
        setPopconfirmVisible(false)
    }

    let dateFormat ="DD.MM.YYYY"
    const disabledDate = (current: any) => {
        // Получаем текущую дату
        const today = dayjs()
        const forbiddenDate = dayjs(forbDate)
        if (dateType==='start') {
            return current && current > today || current > forbiddenDate
        } else if (dateType === 'end') {
            return current && current <= forbiddenDate
        }
    }
    if (date) {
        let parts = date.split('.') // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const day = parts[0]
            const month = parts[1]
            const year = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            return <Text>{date}</Text>
        }
    
        parts = date.split('-') // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const year = parts[0]
            const month = parts[1]
            const day = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            return <Popconfirm
                        title="Подтверждение изменений"
                        description="Вы уверены, что хотите изменить данные?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Да"
                        cancelText="Нет"
                        open={isPopconfirmVisible}
                    >
                        <DatePicker size='small' disabledDate={disabledDate} locale={datePickerLocale} allowClear format={'DD.MM.YYYY'} defaultValue={dayjs(date, dateFormat)} bordered={false} onChange={(date) => handleDateChange(date)}  />
                    </Popconfirm>
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
                    <DatePicker disabledDate={disabledDate} style={{width: '200px'}} size='small' placeholder={date === '' ? 'Не подлежит поверке' : ''} locale={datePickerLocale} allowClear={false} format={'DD.MM.YYYY'} bordered={false} onChange={(date) => handleDateChange(date)}  />
                </Popconfirm>
    }
    return <></>
}