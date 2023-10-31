import { Typography, Col, Image, Row, Spin, Table } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { getPremData, getIsLoading } from "../../redux/premisesSelectors"
import { EyeOutlined} from '@ant-design/icons'
import { RenderDateHelper } from "../helpers/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React from "react"
import { AppDispatch } from "../../redux/store"
import { getPremises } from "../../redux/premisesReducer"

const { Text } = Typography
  
export const Premises: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const premData = useSelector(getPremData)
    const isLoading = useSelector(getIsLoading)

    if (premData.length === 0 && isLoading===false) {
        dispatch(getPremises())
    }
    const premNewData = premData.map(e => ({
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.class,
        date: e.date,
        ar: e.ar,
        foto: e.foto
    }))

    type DataType = typeof premNewData[0]

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Наименование</Text>,
            dataIndex: 'name',
            render: (text, record) => (
            <Row>
                <Col span={1}>
                    <Image style={{
                        maxWidth: '30px',
                        maxHeight: '30px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden'}} 
                        src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
                        preview = {{mask: <EyeOutlined style={{fontSize: '12pt'}} />}}
                    />
                </Col>
                <Col span={23}>
                    <NavLink to={record.id} style={{fontSize: '12pt', marginLeft: '10px'}}>
                        {record.class==='Складские' ? `Помещение ${record.nomer} «${text}»` : text}
                    </NavLink>
                </Col>  
            </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name)
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
            dataIndex: 'class',
            filters: [
                { text: 'Контролируемые', value: 'Контролируемые' },
                { text: 'Чистые', value: 'Чистые' },
                { text: 'Складские', value: 'Складские' }
            ],
            render: (text) => <Text>{text}</Text>,
            onFilter: (value: any, record) => record.class.indexOf(value) === 0,
            sorter: (a, b) => a.class.localeCompare(b.class),
            sortDirections: ['ascend'],
            width: '12%',
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
    ]

    const data: DataType[] = premNewData
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    }
    return (
        <Content style={{padding: '20px 0',  marginBottom: '60px'}}>
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={false}
                        title={() => <Text style={{fontSize: '14pt'}}>Помещения (всего {premData.length} объектов)</Text>}
                    /> 
                </Col>
            </Row>
        </Content>
    )
}