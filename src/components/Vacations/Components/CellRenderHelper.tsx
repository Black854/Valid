import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, DatePicker, Modal, Popconfirm, Typography } from "antd"
import { RangePickerProps } from "antd/es/date-picker"
import dayjs from 'dayjs'
import { useState } from "react"
import { deleteVacationsData, setVacationsData } from "../../../redux/Reducers/appReducer"
import { AppDispatch } from "../../../redux/store"
import { useDispatch } from "react-redux"

const { Text } = Typography

const { RangePicker } = DatePicker

type propsType = {
    text: string
    month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    year: string
    fio: string
    access: number
}

export const CellRenderHelper: React.FC<propsType> = ({ text, month, year, fio, access }) => {
    const [showCreateVacationsModal, setShowCreateVacationsModal] = useState(false)
    const [showEditVacationsModal, setShowEditVacationsModal] = useState(false)
    const [dates, setDates] = useState([] as any)
    const dispatch: AppDispatch = useDispatch()

    const monthLabel = () => {
        switch (month) {
            case 0:
                return 'январь'
            case 1:
                return 'февраль'
            case 2:
                return 'март'
            case 3:
                return 'апрель'
            case 4:
                return 'май'
            case 5:
                return 'июнь'
            case 6:
                return 'июль'
            case 7:
                return 'август'
            case 8:
                return 'сентябрь'
            case 9:
                return 'октябрь'
            case 10:
                return 'ноябрь'
            case 11:
                return 'декабрь'
        }
    }

    const submitForm = () => {
        if (dates.length > 0) {
            let vacationsDates
            if (String(dates[0]['$D']).padStart(2, '0') + '.' + String(month + 1).padStart(2, '0') + '.' + year === String(dates[1]['$D']).padStart(2, '0') + '.' + String(month + 1).padStart(2, '0') + '.' + year) {
                vacationsDates = (String(dates[0]['$D']).padStart(2, '0') + '.' + String(month + 1).padStart(2, '0') + '.' + year)
            } else {
                vacationsDates = (String(dates[0]['$D']).padStart(2, '0') + '.' + String(month + 1).padStart(2, '0') + '.' + year + ' - ' + String(dates[1]['$D']).padStart(2, '0') + '.' + String(month + 1).padStart(2, '0') + '.' + year)
            }
            const vacationsMonth = (String(month + 1).padStart(2, '0') + '.' + year)
            setDates([])
            dispatch(setVacationsData(fio, vacationsDates, vacationsMonth))
            setShowCreateVacationsModal(false)
            setShowEditVacationsModal(false)
        }
    }

    const handleCancel = (modalType: string) => {
        if (modalType === 'showCreateVacationsModal') {
            setShowCreateVacationsModal(false)
        } else if (modalType === 'showEditVacationsModal') {
            setShowEditVacationsModal(false)
        }
    }

    const handleDeleteVacationsData = () => {
        const vacationsMonth = (String(month + 1).padStart(2, '0') + '.' + year)
        dispatch(deleteVacationsData(fio, vacationsMonth))
    }

    const getEndOfMonth = (month: number, year: number) => {
        const lastDay = new Date(year, month, 0).getDate() // Получаем последний день месяца
        const formattedDate = `${String(lastDay).padStart(2, '0')}`
        return formattedDate
    }

    let startDate
    let endDate

    if (text && text.length > 11) {
        const [start, end] = text.split(' - ')
        const [startDay, startMonth, startYear] = start.split('.')
        const [endDay, endMonth, endYear] = end.split('.')

        startDate = dayjs(`${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`)
        endDate = dayjs(`${endYear}-${endMonth.padStart(2, '0')}-${endDay.padStart(2, '0')}`)
    } else if (text) {
        const [startDay, startMonth, startYear] = text.split('.')

        startDate = dayjs(`${startYear}-${startMonth.padStart(2, '0')}-${startDay.padStart(2, '0')}`)
        endDate = startDate
    } else {
        startDate = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-01`)
        endDate = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-${getEndOfMonth(month + 1, parseInt(year))}`)
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const currentYear = dayjs().year()
        const selectedYear = dayjs(current).year()
        const selectedMonth = dayjs(current).month()

        return !(selectedYear === currentYear && selectedMonth === month)
    }

    return text ?
        <>
            <Text>{text}</Text>
            <Button disabled={access > 2} icon={<EditOutlined />} type="link" size="small" onClick={() => setShowEditVacationsModal(true)} />
            <Modal destroyOnClose centered title={`Редактирование отпуска на ${monthLabel()} ${year}`} open={showEditVacationsModal} onCancel={() => handleCancel('showEditVacationsModal')} footer={[<Button key="close" onClick={() => handleCancel('showEditVacationsModal')} type="primary">Отмена</Button>]} >
                <Text style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px' }}>Выберите даты отпуска: </Text>
                <RangePicker disabledDate={disabledDate} allowEmpty={[false, true]} format={'DD.MM.YYYY'} defaultValue={[startDate, endDate]} onChange={(e => setDates(e))} />
                <Button disabled={dates.length < 2} style={{ marginTop: '15px' }} size="small" type="primary" onClick={submitForm}>Изменить данные</Button>
            </Modal>
            <Popconfirm
                title='Подтвердите удаление'
                description='Вы уверены, что хотите удалить данные об отпуске?'
                okText='Да'
                cancelText='Нет'
                onConfirm={handleDeleteVacationsData}
            >
                <Button disabled={access > 2} icon={<DeleteOutlined />} danger type="link" size="small" />
            </Popconfirm>
        </>
        :
        <>
            <Button disabled={access > 2} icon={<PlusOutlined />} type="link" onClick={() => setShowCreateVacationsModal(true)} />
            <Modal destroyOnClose centered title={`Добавление отпуска на ${monthLabel()} ${year}`} open={showCreateVacationsModal} onCancel={() => handleCancel('showCreateVacationsModal')} footer={[<Button key="close" onClick={() => handleCancel('showCreateVacationsModal')} type="primary">Отмена</Button>]} >
                <Text style={{ display: 'inline-block', marginRight: '10px', marginTop: '10px' }}>Выберите даты отпуска: </Text>
                <RangePicker disabledDate={disabledDate} allowEmpty={[false, true]} format={'DD.MM.YYYY'} defaultValue={[startDate, endDate]} onChange={(e => setDates(e))} />
                <Button disabled={dates.length < 2} style={{ marginTop: '15px' }} size="small" type="primary" onClick={submitForm}>Добавить отпуск</Button>
            </Modal>
        </>
}