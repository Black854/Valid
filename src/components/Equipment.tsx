import { Col, Row, Table } from "antd";
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from "react-redux";
import { getEquipData } from "../redux/equipmentSelectors";

interface DataType {
    sp2: string
    name: string
    serial: string
    inv: string
    group: string
  }
  
let Equipment: React.FC = () => {

    let equipData = useSelector(getEquipData)
    let equipNewData = equipData.map(e => ({
        sp2: e.sp2,
        name: e.name,
        serial: e.serial,
        inv: e.inv,
        group: e.groupp
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
                            pagination={{ pageSize: 20 }}
                            title={() => 'Оборудование'}
                            // footer={() => 'Footer'}
                        /> 
                    </Col>
                </Row>
              
        </Content>
    )
}

export default Equipment