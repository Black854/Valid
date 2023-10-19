import { Col, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from "react-redux";
import { getEquipData } from "../redux/equipmentSelectors";
import { getEquipment } from "../redux/equipmentReducer";
import { Typography } from 'antd';

const { Text } = Typography;

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
    console.log(equipData)
    if (equipData.length === 1) {
        //@ts-ignore
        dispatch(getEquipment())
    }
    let equipNewData = equipData.map(e => ({
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
        title: 'Наименование',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Подразделение',
        dataIndex: 'sp2',
        filters: [
            { text: 'МБЛ', value: 'МБЛ' },
            { text: 'БХЛ', value: 'БХЛ' },
            { text: 'ФХЛ', value: 'ФХЛ' },
            { text: 'ЛИП', value: 'ЛИП' },
            { text: 'ЦС', value: 'ЦС' },
            { text: 'ГК', value: 'ГК' },
        ],
        onFilter: (value: any, record) => record.sp2.indexOf(value) === 0,
        sorter: (a, b) => a.sp2.localeCompare(b.sp2),
        sortDirections: ['descend'],
        width: '10%',
        align: 'center',
    },
    {
        title: 'Группа',
        dataIndex: 'group',
        filters: [
            { text: 'Термостаты', value: 'Термостаты' },
            { text: 'Тех. оборудование', value: 'Тех. оборудование' },
            { text: 'Лаб. оборудование', value: 'Лаб. оборудование' },
            { text: 'Термоконтейнеры', value: 'Термоконтейнеры' }
        ],
        onFilter: (value: any, record) => record.group.indexOf(value) === 0,
        sorter: (a, b) => a.group.localeCompare(b.group),
        sortDirections: ['descend'],
        width: '12%',
        align: 'right',
    },
    {
        title: 'Дата (до)',
        dataIndex: 'date',
        render: (date, record) => { 
            const currentDate = new Date();
            const year = currentDate.getFullYear(); // Получаем год (YYYY)
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Получаем месяц (MM)
            const day = String(currentDate.getDate()).padStart(2, '0'); // Получаем день (DD)
            
            const formattedDate = parseInt(`${year}${month}${day}`, 10);


            const dateFromData = new Date(date);
            const yearFromData = dateFromData.getFullYear(); // Получаем год (YYYY)
            const monthFromData = String(dateFromData.getMonth() + 1).padStart(2, '0'); // Получаем месяц (MM)
            const dayFromData = String(dateFromData.getDate()).padStart(2, '0'); // Получаем день (DD)

            let formattedDateFromData = parseInt(`${yearFromData}${monthFromData}${dayFromData}`, 10) + {(record.sp2 === '1') ? '10000' : '2000'};
            
            if (formattedDate >= formattedDateFromData) {
                console.log(formattedDateFromData)
                console.log(formattedDate)
                return <Text type="danger">{`${dayFromData}.${monthFromData}.${yearFromData}`}</Text>
            } else {
                return <Text strong>{`${dayFromData}.${monthFromData}.${yearFromData}`}</Text>
            }
        },
        width: '8%',
        align: 'center'
    },
    ];

    const data: DataType[] = equipNewData

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