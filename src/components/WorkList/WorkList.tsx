import { Typography, Col, Image, Row, Spin, Table, message } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { getPremData, getIsLoading, getCurrentPremDataSelector } from "../../redux/Selectors/premisesSelectors"
import { EyeOutlined } from '@ant-design/icons'
import { RenderDateHelper } from "../common/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { getCurrentPremData, getPremises } from "../../redux/Reducers/premisesReducer"
import { getCurrentEquipDataSelector, getEquipData } from "../../redux/Selectors/equipmentSelectors"
import { getCurrentEquipData, getEquipment } from "../../redux/Reducers/equipmentReducer"
import { EquipTasks } from "./taskComponents/EquipTasks"
import { PremTasks } from "./taskComponents/PremTasks"
import { ProgressHelper } from "./taskComponents/ProgressHelper"
import { AllValidatorsType, getAllValidators } from "../../redux/Reducers/appReducer"
import { getCurrentSysData, getSystems } from "../../redux/Reducers/systemsReducer"
import { getCurrentProcData, getProcesses } from "../../redux/Reducers/processesReducer"
import { getCurrentSysDataSelector, getSysData } from "../../redux/Selectors/systemsSelectors"
import { getCurrentProcDataSelector, getProcData } from "../../redux/Selectors/processesSelectors"
import { ProcTasks } from "./taskComponents/ProcTasks"
import { SysTasks } from "./taskComponents/SysTasks"
import { getAuthUserNameSelector } from "../../redux/Selectors/authSelectors"

const { Text } = Typography

export const WorkList: React.FC = () => {
    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
        dispatch(getSystems())
        dispatch(getProcesses())
        dispatch(getAllValidators())
    }, [])

    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }

    const premData = useSelector(getPremData)
    const equipData = useSelector(getEquipData)
    const sysData = useSelector(getSysData)
    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)
    const AuthUserName = useSelector(getAuthUserNameSelector)

    const premNewData = premData.map(e => ({
        objectType: 'premises' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: 'prem' + e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.class,
        mode: e.mode,
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const equipNewData = equipData.map(e => ({
        objectType: 'equipment' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: 'equip' + e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.groupp,
        mode: 'none',
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const sysNewData = sysData.map(e => ({
        objectType: 'systems' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: 'sys' + e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: 'none',
        class: 'none',
        mode: 'none',
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const procNewData = procData.map(e => ({
        objectType: 'processes' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: 'proc' + e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: 'none',
        class: 'none',
        mode: 'none',
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const myPremDataIdArray = premNewData.map(e => e.id)
    const myEquipDataIdArray = equipNewData.map(e => e.id)
    const mySysDataIdArray = sysNewData.map(e => e.id)
    const myProcDataIdArray = procNewData.map(e => e.id)

    const myPremData = useSelector(getCurrentPremDataSelector)
    const myEquipData = useSelector(getCurrentEquipDataSelector)
    const mySysData = useSelector(getCurrentSysDataSelector)
    const myProcData = useSelector(getCurrentProcDataSelector)

    useEffect(() => {
        dispatch(getCurrentPremData(myPremDataIdArray))
        dispatch(getCurrentEquipData(myEquipDataIdArray))
        dispatch(getCurrentSysData(mySysDataIdArray))
        dispatch(getCurrentProcData(myProcDataIdArray))
    }, [premData, equipData, sysData, procData])

    type DataType = typeof premNewData[0]
    const data: DataType[] = [...premNewData, ...equipNewData, ...sysNewData, ...procNewData]

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{ fontSize: '12pt' }}>№</Text>,
            dataIndex: 'index',
            render: (text, record, index) => index + 1,
            align: 'center',
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Наименование</Text>,
            dataIndex: 'name',
            render: (text, record) => (
                <Row>
                    <Col span={1}>
                        <Image style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}
                            src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
                            preview={{ mask: <EyeOutlined style={{ fontSize: '12pt' }} /> }}
                        />
                    </Col>
                    <Col span={23}>
                        <NavLink to={'/' + record.objectType + '/' + record.id} style={{ fontSize: '12pt', marginLeft: '10px' }}>
                            {record.class === 'Складские' ? `Помещение ${record.nomer} «${text}»` : text}
                        </NavLink>
                    </Col>
                </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Прогресс</Text>,
            render: (text, record, index) => {
                return <ProgressHelper type="work" key={index} record={record} myPremData={myPremData} myEquipData={myEquipData} mySysData={mySysData} myProcData={myProcData} />
            },
            align: 'center',
            width: '12%',
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Подразделение</Text>,
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
            title: <Text strong style={{ fontSize: '12pt' }}>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
    ]
    return (isLoading) ? <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} /> :
        <Content style={{ padding: '20px 0', marginBottom: '60px' }}>
            {contextHolder}
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: (rec) => {
                                return rec.objectType === 'premises' ? <PremTasks myPremData={myPremData} error={error} rec={rec} myPremDataIdArray={myPremDataIdArray} /> :
                                    rec.objectType === 'equipment' ? <EquipTasks myEquipData={myEquipData} error={error} rec={rec} myEquipDataIdArray={myEquipDataIdArray} /> :
                                        rec.objectType === 'systems' ? <SysTasks mySysData={mySysData} error={error} rec={rec} mySysDataIdArray={mySysDataIdArray} /> :
                                            rec.objectType === 'processes' ? <ProcTasks myProcData={myProcData} error={error} rec={rec} myProcDataIdArray={myProcDataIdArray} /> :
                                                null
                            }
                        }}
                        dataSource={data}
                        bordered={false}
                        pagination={false}
                        title={() => <Text style={{ fontSize: '14pt' }}>Мои задачи (всего: {data.length})</Text>}
                        size="small"
                    />
                </Col>
            </Row>
        </Content>
}