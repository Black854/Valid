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
import { getInstruments } from "../../redux/Reducers/instrumentsReducer"
import { getInstData, getIsLoading } from "../../redux/Selectors/instrumentsSelectors"
import { format } from 'date-fns'
import { RenderDateHelperInstruments } from "../common/RenderDateHelperInstruments"

const { Text } = Typography;

interface DataType {
    id: string
    name: string
    name2: string
    serial: string
    invno: string
    startDate: string
    endDate: string
    foto: string
}
  
export const Instruments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const instData = useSelector(getInstData)
    const isLoading = useSelector(getIsLoading)

    if (instData.length === 0 && isLoading===false) {
        dispatch(getInstruments())
    }
    const instNewData = instData.map(e => ({
        id: e.id,
        key: e.id,
        name: e.name,
        name2: e.name2,
        serial: e.serial,
        invno: e.invno,
        startDate: e.date1,
        endDate: e.date2,
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
            title: <Text strong style={{fontSize: '12pt'}}>Тип</Text>,
            dataIndex: 'name2',
            render: (name2, record) => <Text>{name2}</Text>,
            sorter: (a, b) => a.name2.localeCompare(b.name2)
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата (до)</Text>,
            dataIndex: 'endDate',
            render: (endDate, record) => { return (record.startDate === '' && endDate === '') ? <Text type="secondary">Не подлежит поверке</Text> : <RenderDateHelperInstruments date={endDate} /> },
            width: '10%',
            align: 'center'
        },
    ]

    const data: DataType[] = instNewData.map((item, index) => ({
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
                        title={() => <Text style={{fontSize: '14pt'}}>Инструменты (всего: {instData.length})</Text>}
                        size="small"
                        style={{marginBottom: '30px'}}
                    /> 
                </Col>
            </Row>
        </Content>
    )
}