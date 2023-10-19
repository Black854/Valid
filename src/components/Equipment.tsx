import { Col, Row, Spin, Table } from "antd";
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from "react-redux";
import { getEquipData, getIsLoading } from "../redux/equipmentSelectors";
import { getEquipment } from "../redux/equipmentReducer";
import { Typography } from 'antd';
import { addMonths } from 'date-fns';
import { format } from 'date-fns';

const { Text, Link } = Typography;

interface DataType {
    sp2: string
    name: string
    serial: string
    inv: string
    group: string
    date: string
    ar: string
  }
  
let Equipment: React.FC = () => {
    let dispatch = useDispatch()

    let equipData = useSelector(getEquipData)
    let isLoading = useSelector(getIsLoading)

    if (equipData.length === 0) {
        //@ts-ignore
        dispatch(getEquipment())
    }
    let equipNewData = equipData.map(e => ({
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        serial: e.serial,
        inv: e.inv,
        group: e.groupp,
        date: e.date,
        ar: e.ar
    }))

const columns: ColumnsType<DataType> = [
    {
        title: <Text strong style={{fontSize: '12pt'}}>Наименование</Text>,
        dataIndex: 'name',
        render: (text) => <><Link strong style={{fontSize: '12pt'}}>{text}</Link></>,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: <Text strong style={{fontSize: '12pt'}}>Подразделение</Text>,
        dataIndex: 'sp2',
        filters: [
            { text: 'МБЛ', value: 'МБЛ' },
            { text: 'БХЛ', value: 'БХЛ' },
            { text: 'ФХЛ', value: 'ФХЛ' },
            { text: 'ЛИП', value: 'ЛИП' },
            { text: 'ЦС', value: 'ЦС' },
            { text: 'ГК', value: 'ГК' },
        ],
        render: (sp) => <Text>{sp}</Text>,
        onFilter: (value: any, record) => record.sp2.indexOf(value) === 0,
        sorter: (a, b) => a.sp2.localeCompare(b.sp2),
        sortDirections: ['descend'],
        width: '12%',
        align: 'center',
    },
    {
        title: <Text strong style={{fontSize: '12pt'}}>Группа</Text>,
        dataIndex: 'group',
        filters: [
            { text: 'Термостаты', value: 'Термостаты' },
            { text: 'Тех. оборудование', value: 'Тех. оборудование' },
            { text: 'Лаб. оборудование', value: 'Лаб. оборудование' },
            { text: 'Термоконтейнеры', value: 'Термоконтейнеры' }
        ],
        render: (text) => <Text>{text}</Text>,
        onFilter: (value: any, record) => record.group.indexOf(value) === 0,
        sorter: (a, b) => a.group.localeCompare(b.group),
        sortDirections: ['descend'],
        width: '12%',
        align: 'right',
    },
    {
        title: <Text strong style={{fontSize: '12pt'}}>Дата (до)</Text>,
        dataIndex: 'date',
        render: (date, record) => {
            let ar = record.ar
            let monthCount = 0
            if (ar === '1') { monthCount = 13 }
            else if (ar === '2') { monthCount = 25 }
            else if (ar === '3') { monthCount = 37 }
            else if (ar === '5') { monthCount = 61 }

            if (date) {
                const parts = date.split('.'); // Разделяем строку по точкам
                if (parts.length === 3) {
                    // Проверяем, что строка содержит три части: день, месяц и год
                    const day = parts[0];
                    const month = parts[1];
                    const year = parts[2];
                    // Создаем новую дату в формате "yyyy-MM-dd"
                    date = `${year}-${month}-${day}`;
                    // console.log(date)
                }
            }
            
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd'); // Текущая дата для сравнения с датой объекта
            // console.log('Текущая дата для сравнения - ' + formattedCurrentDate)

            const equipDate = new Date(date)
            const resultEquipDate = addMonths(equipDate, monthCount); // Прибавляем monthCount месяцев
            const formattedEquipDate = format(resultEquipDate, 'yyyyMMdd'); // Текущая дата для сравнения с датой объекта
            // console.log('Дата квалификации объекта для сравнения - ' + formattedEquipDate)
           
            let dateForPrint = format(resultEquipDate, 'dd.MM.yyyy');
            
            if (ar === '0') { return <Text type="secondary">Не валидируется</Text> }
            else if (ar==='12') { return <Text type="secondary">Законсервировано</Text> }
            else if (ar==='15') { return <Text type="secondary">Списано</Text> }
            else if (ar==='11' || ar==='10') { return <Text type="secondary">До изменений</Text> }
            else if (record.date === null) { return <Text type="secondary">Новый объект</Text> }
            else if (formattedCurrentDate >= formattedEquipDate) { return <Text type="danger">{dateForPrint}</Text> }
            else { return <Text type="success">{dateForPrint}</Text> }
        },
        width: '10%',
        align: 'center'
    },
    ];

    const data: DataType[] = equipNewData
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    }
    return (
        <Content style={{padding: '20px 0',  marginBottom: '40px'}}>
                <Row>
                    <Col span={22} push={1}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            title={() => 'Оборудование'}
                            // footer={() => 'Footer'}
                        /> 
                    </Col>
                </Row>
        </Content>
    )
}

export default Equipment