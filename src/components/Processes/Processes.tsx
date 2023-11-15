import { Typography, Col, Image, Row, Spin, Table } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { EyeOutlined} from '@ant-design/icons'
import { RenderDateHelper } from "../common/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React from "react"
import { AppDispatch } from "../../redux/store"
import { getIsLoading, getProcData } from "../../redux/Selectors/processesSelectors"
import { getProcesses } from "../../redux/Reducers/processesReducer"

const { Text } = Typography;

interface DataType {
    id: string,
    sp2: string
    name: string
    serial: string
    inv: string
    group: string
    date: string
    ar: string
    foto: string
}
  
export const Processes: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)

    if (procData.length === 0 && isLoading===false) {
        dispatch(getProcesses())
    }
    const procNewData = procData.map(e => ({
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        serial: e.serial,
        inv: e.inv,
        group: e.groupp,
        date: e.date,
        ar: e.ar,
        foto: e.foto
    }))

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
            dataIndex: 'index',
            align: 'center'
        },
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
                    <NavLink to={record.id} style={{fontSize: '12pt', marginLeft: '10px'}}>{text}</NavLink>
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
            title: <Text strong style={{fontSize: '12pt'}}>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
    ]

    const data: DataType[] = procNewData.map((item, index) => ({
        ...item,
        index: index + 1,
    }))
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
                        pagination={false}
                        title={() => <Text style={{fontSize: '14pt'}}>Оборудование (всего: {procData.length})</Text>}
                        size="small"
                        style={{marginBottom: '30px'}}
                    /> 
                </Col>
            </Row>
        </Content>
    )
}