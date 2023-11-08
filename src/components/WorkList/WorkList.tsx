import { Typography, Col, Image, Row, Spin, Table, Badge, Space, Dropdown, TableColumnsType, Progress } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { getPremData, getIsLoading, getCurrentPremData } from "../../redux/premisesSelectors"
import { EyeOutlined} from '@ant-design/icons'
import { RenderDateHelper } from "../helpers/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { ReestrType, getPremises, getReestrData } from "../../redux/premisesReducer"
import { getCurrentEquipData, getEquipData } from "../../redux/equipmentSelectors"
import { getAuthUserNameSelector } from "../../redux/authSelectors"
import { DownOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { getEquipment } from "../../redux/equipmentReducer"

const { Text } = Typography
  
export const WorkList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const premData = useSelector(getPremData)
    const equipData = useSelector(getEquipData)
    const isLoading = useSelector(getIsLoading)
    const AuthUserName = useSelector(getAuthUserNameSelector)

    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
    }, [])
    
    const premNewData = premData.map(e => ({
        objectType: 'premises',
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.class,
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)
    
    const equipNewData = equipData.map(e => ({
        objectType: 'equipment',
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.groupp,
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const myPremDataIdArray = premNewData.map(e => e.id)
    const myEquipDataIdArray = equipNewData.map(e => e.id)

    const myPremData = useSelector(getCurrentPremData)
    const myEquipData = useSelector(getCurrentEquipData)

    type DataType = typeof premNewData[0]
    const data: DataType[] = [...premNewData, ...equipNewData]

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
            dataIndex: 'index',
            render: (text, record, index) => index + 1,
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
                    <NavLink to={'/' + record.objectType + '/' + record.id} style={{fontSize: '12pt', marginLeft: '10px'}}>
                        {record.class==='Складские' ? `Помещение ${record.nomer} «${text}»` : text}
                    </NavLink>
                </Col>  
            </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Прогресс</Text>,
            render: (text, record, index) => <Progress percent={70} size="small" status="normal" />,
            align: 'center',
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






    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    }
    return (
        <Content style={{padding: '20px 0',  marginBottom: '60px' }}>
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record) => {
                                type ExpandedDataType = {
                                    key: React.Key
                                }

                                const columns: TableColumnsType<ExpandedDataType> = [
                                    { title: 'Прогресс', dataIndex: 'progress', key: 'progress', align: 'center' },
                                    { title: 'Протокол', dataIndex: 'vp', key: 'vp', align: 'center' },
                                    { title: 'Код протокола', dataIndex: 'nvp', key: 'nvp', align: 'center' },
                                    { title: 'Дата протокола', dataIndex: 'dvp', key: 'dvp', align: 'center' },
                                    { title: 'Отчет', dataIndex: 'vo', key: 'vo', align: 'center' },
                                    { title: 'Код отчета', dataIndex: 'nvo', key: 'nvo', align: 'center' },
                                    { title: 'Дата отчета', dataIndex: 'dvo', key: 'dvo', align: 'center' },
                                    { title: 'Этикетка приклеена', dataIndex: 'et', key: 'et', align: 'center' },
                                ]

                                if (record.objectType === 'premises') {
                                    let data: any = [{
                                        key: '1',
                                        progress: '2014-12-24 23:12:00',
                                        vp: 'This is production name',
                                        nvp: 'Upgraded: 56',
                                        dvp: 'Upgraded: 56',
                                        vo: 'Upgraded: 56',
                                        nvo: 'Upgraded: 56',
                                        dvo: 'Upgraded: 56',
                                        et: ''
                                    }]

                                    const data2 = myPremData.find(e => e.idfromtable === record.id)

                                    if (data2 !== undefined) {
                                        data = [data2]
                                    }

                                    return record.class === 'Чистые' && <Table columns={columns} dataSource={data} pagination={false} />
                                }
                            
                                

                            }
                        }}
                        dataSource={data}
                        bordered
                        pagination={false}
                        title={() => <Text style={{fontSize: '14pt'}}>Мои задачи (всего: {data.length})</Text>}
                        size="small"
                    /> 
                </Col>
            </Row>
        </Content>
    )
}