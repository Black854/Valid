import { Typography, Table, Row, Col, DatePicker, Button } from "antd"
import { useSelector } from "react-redux"
import { getAllValidatorsSelector } from "../../redux/Selectors/appSelectors"
import { Content } from "antd/es/layout/layout"
import { ColumnsType } from "antd/es/table"
import Column from "antd/es/table/Column"
import ColumnGroup from "antd/es/table/ColumnGroup"
import { RangePickerProps } from "antd/es/date-picker"
import dayjs from 'dayjs'

const { Text } = Typography
const { RangePicker } = DatePicker

type DataType = {
    // id: string
    fio: string
    month: string
    date: string
}


export const Vacations: React.FC = () => {
    const AllValidators = useSelector(getAllValidatorsSelector)

    const data = [
        {
            fio: 'Статус загрузки памятки',
            month: 'Статус загрузки памятки',
            date: 'Статус загрузки памятки',
        }
    ]

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const currentYear = dayjs().year(); // Получаем текущий год
        const currentMonth = dayjs().month(); // Получаем текущий месяц (январь = 0)

        const selectedYear = dayjs(current).year(); // Получаем год выбранной даты
        const selectedMonth = dayjs(current).month(); // Получаем месяц выбранной даты

        // Разрешаем только даты из января текущего года
        return !(selectedYear === currentYear && selectedMonth === 0);
    }

    const currentDate = dayjs(); // Получаем текущую дату
    const defaultStartDate = currentDate.startOf('year'); // Начало текущего года
    const defaultEndDate = currentDate.startOf('year').add(1, 'month').subtract(1, 'day'); // Конец января текущего года

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
                            render={(fio) => <Text>{fio}</Text>}
                        />
                        <ColumnGroup title="Даты фактического отсутствия" align="center">
                            <Column
                                title={<Text>Январь</Text>}
                                dataIndex='0'
                                key="0"
                                align="center"
                                render={(text, record: DataType) => text !== '0' ? <RangePicker allowClear size="small" disabledDate={disabledDate} 
                                picker="date" defaultValue={[defaultStartDate, defaultEndDate]} /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Февраль</Text>}
                                dataIndex='1'
                                key="1"
                                align="center"
                                render={(text) => text !== '0' ? <Button>123</Button> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Март</Text>}
                                dataIndex='2'
                                key="2"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Апрель</Text>}
                                dataIndex='3'
                                key="3"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Май</Text>}
                                dataIndex='4'
                                key="4"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Июнь</Text>}
                                dataIndex='5'
                                key="5"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Июль</Text>}
                                dataIndex='6'
                                key="6"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Август</Text>}
                                dataIndex='7'
                                key="7"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Сентябрь</Text>}
                                dataIndex='8'
                                key="8"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Октябрь</Text>}
                                dataIndex='9'
                                key="9"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Ноябрь</Text>}
                                dataIndex='10'
                                key="10"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                            <Column
                                title={<Text>Декабрь</Text>}
                                dataIndex='11'
                                key="11"
                                align="center"
                                render={(text) => text !== '0' ? <DatePicker /> : <DatePicker />}
                                width='7%'
                            />
                        </ColumnGroup>
                    </Table>
                </Col>
            </Row>
        </Content>
    )
}