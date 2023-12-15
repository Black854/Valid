import { Typography, Table, Row, Col, DatePicker, Button, Calendar, theme, CalendarProps } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getAllValidatorsSelector, getVacationsDataSelector } from "../../redux/Selectors/appSelectors"
import { Content } from "antd/es/layout/layout"
import { ColumnsType } from "antd/es/table"
import Column from "antd/es/table/Column"
import ColumnGroup from "antd/es/table/ColumnGroup"
import { RangePickerProps } from "antd/es/date-picker"
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs';
import Title from "antd/es/typography/Title"
import { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { getAllValidators, getVacationsData } from "../../redux/Reducers/appReducer"

const { Text } = Typography
const { RangePicker } = DatePicker

type DataType = {
    fio: string
    month1: string
    month2: string
    month3: string
    month4: string
    month5: string
    month6: string
    month7: string
    month8: string
    month9: string
    month10: string
    month11: string
    month12: string
}


export const Vacations: React.FC = () => {
    const AllValidators = useSelector(getAllValidatorsSelector)
    const vacationsData = useSelector(getVacationsDataSelector)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllValidators())
        dispatch(getVacationsData())
    }, [])

    const currentYear = new Date().getFullYear()

    const data = AllValidators.sort((a, b) => {
        const fioA = a.fio.toLowerCase();
        const fioB = b.fio.toLowerCase();
      
        if (fioA < fioB) {
          return -1;
        }
        if (fioA > fioB) {
          return 1;
        }
        return 0;
      }).map(e => ({
        fio: e.fio,
        month1: vacationsData.find(data => data.fio === e.fio && data.month == `01.${currentYear}`)?.date,
        month2: vacationsData.find(data => data.fio === e.fio && data.month == `02.${currentYear}`)?.date,
        month3: vacationsData.find(data => data.fio === e.fio && data.month == `03.${currentYear}`)?.date,
        month4: vacationsData.find(data => data.fio === e.fio && data.month == `04.${currentYear}`)?.date,
        month5: vacationsData.find(data => data.fio === e.fio && data.month == `05.${currentYear}`)?.date,
        month6: vacationsData.find(data => data.fio === e.fio && data.month == `06.${currentYear}`)?.date,
        month7: vacationsData.find(data => data.fio === e.fio && data.month == `07.${currentYear}`)?.date,
        month8: vacationsData.find(data => data.fio === e.fio && data.month == `08.${currentYear}`)?.date,
        month9: vacationsData.find(data => data.fio === e.fio && data.month == `09.${currentYear}`)?.date,
        month10: vacationsData.find(data => data.fio === e.fio && data.month == `10.${currentYear}`)?.date,
        month11: vacationsData.find(data => data.fio === e.fio && data.month == `11.${currentYear}`)?.date,
        month12: vacationsData.find(data => data.fio === e.fio && data.month == `12.${currentYear}`)?.date,
    }))

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const currentYear = dayjs().year(); // Получаем текущий год
        const currentMonth = dayjs().month(); // Получаем текущий месяц (январь = 0)

        const selectedYear = dayjs(current).year(); // Получаем год выбранной даты
        const selectedMonth = dayjs(current).month(); // Получаем месяц выбранной даты

        // Разрешаем только даты из января текущего года
        return !(selectedYear === currentYear && selectedMonth === 0);
    }

    const currentDate = dayjs() // Получаем текущую дату
    const defaultStartDate = currentDate.startOf('year').add(1, 'month').subtract(1, 'day') // Начало текущего года
    const defaultEndDate = currentDate.startOf('year').add(12, 'month').subtract(12, 'day') // Конец января текущего года

    return (
        <Content style={{ padding: '20px 0', marginBottom: '60px' }}>
            <Row>
                <Col span={22} push={1}>
                    <Table
                        dataSource={data}
                        bordered
                        pagination={false}
                        rowKey='rowName'
                        title={() => <Text style={{ fontSize: '14pt' }}>График отпусков</Text>}
                        size="small"
                    >
                        <Column
                            title={<Text>Ф.И.О. сотрудника</Text>}
                            dataIndex='fio'
                            align="center"
                            key="fio"
                            render={(fio) => <Text style={{fontSize: '13pt'}}>{fio}</Text>}
                        />
                        <ColumnGroup title="Даты фактического отсутствия" align="center">
                            <Column
                                title={<Text>Январь</Text>}
                                dataIndex='month1'
                                key="1"
                                align="center"
                                render={(text, record: DataType) => text !== '0' ? <RangePicker allowClear size="small" disabledDate={disabledDate} 
                                picker="date" defaultValue={[defaultStartDate, defaultEndDate]} /> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Февраль</Text>}
                                dataIndex='month2'
                                key="2"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Март</Text>}
                                dataIndex='month3'
                                key="3"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Апрель</Text>}
                                dataIndex='month4'
                                key="4"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Май</Text>}
                                dataIndex='month5'
                                key="5"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Июнь</Text>}
                                dataIndex='month6'
                                key="6"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Июль</Text>}
                                dataIndex='month7'
                                key="7"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Август</Text>}
                                dataIndex='month8'
                                key="8"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Сентябрь</Text>}
                                dataIndex='month9'
                                key="9"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Октябрь</Text>}
                                dataIndex='month10'
                                key="10"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Ноябрь</Text>}
                                dataIndex='month11'
                                key="11"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                            <Column
                                title={<Text>Декабрь</Text>}
                                dataIndex='month12'
                                key="12"
                                align="center"
                                render={(text) => text ? <Text>{text}</Text> : <Button>123</Button>}
                                width='7%'
                            />
                        </ColumnGroup>
                    </Table>
                </Col>
            </Row>
        </Content>
    )
}