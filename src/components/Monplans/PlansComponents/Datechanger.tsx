import { DatePicker, Popconfirm, Select } from "antd"
import { useState } from "react"
import { AppDispatch } from "../../../redux/store"
import { useDispatch } from "react-redux"
import { updatePlansDates } from "../../../redux/Reducers/plansReducer"
import 'dayjs/locale/ru'
import { datePickerLocale } from './../../common/datePickerLocale'
import dayjs from 'dayjs'

type FioChangerType = {
    startDate: string
    record: any
    date: string
}

export const DateChanger: React.FC<FioChangerType> = ({startDate, record, date}) => {
    const [visible, setVisible] = useState(false)
    const [dateArray, setDate] = useState([] as any)
    const dispatch: AppDispatch = useDispatch()

    const сhangeDate = () => {
        let formattedStartDate: string = ''
        let formattedEndDate: string = ''
    
        if (dateArray) {
          const startDate = new Date(dateArray[0].$d)
          const startDay = startDate.getDate()
          const startMonth = startDate.getMonth() + 1
          const startYear = startDate.getFullYear()
          formattedStartDate = `${startDay < 10 ? '0' + startDay : startDay}.${startMonth < 10 ? '0' + startMonth : startMonth}.${startYear}`
    
          const endDate = new Date(dateArray[1].$d)
          const endDay = endDate.getDate()
          const endMonth = endDate.getMonth() + 1
          const endYear = endDate.getFullYear()
          formattedEndDate = `${endDay < 10 ? '0' + endDay : endDay}.${endMonth < 10 ? '0' + endMonth : endMonth}.${endYear}`
        }
        dispatch(updatePlansDates(formattedStartDate, formattedEndDate, record.idfromtable, record.tablename, record.id, date ))
        setVisible(false)
    }

    const dateChangeHandler = (dateArray: any) => {
        setDate(dateArray)
        setVisible(true)
    }
    
    const dateFormat = 'DD.MM.YYYY'
    return (<>
        <DatePicker.RangePicker 
            locale={datePickerLocale}
            allowClear
            value={startDate !== '' ? record.date2 !== '' ? [dayjs(startDate !== '' ? startDate : null, dateFormat), dayjs(record.date2, dateFormat)] : [dayjs(startDate, dateFormat), null] : [null, null]}
            format={dateFormat}
            onChange={(dateArray: any) => dateChangeHandler(dateArray)}
            disabled={record.status === 'Выполнено'}
            status={(startDate !== '') ? '' : 'warning'}
        />
        <Popconfirm
          title='Подтвердите изменение'
          description='Вы уверены, что хотите изменить даты проводимых работ?'
          okText='Да'
          cancelText='Нет'
          onConfirm={сhangeDate}
          open={visible}
          onCancel={() => setVisible(false)}
        />
    </>)
}