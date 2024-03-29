import { Typography, Col, Image, Row, Table, message } from "antd"
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
import { ProgressHelper } from "../WorkList/taskComponents/ProgressHelper"
import { getAllValidators } from "../../redux/Reducers/appReducer"
import { getCurrentSysData, getSystems } from "../../redux/Reducers/systemsReducer"
import { getCurrentProcData, getProcesses } from "../../redux/Reducers/processesReducer"
import { getCurrentSysDataSelector, getSysData } from "../../redux/Selectors/systemsSelectors"
import { getCurrentProcDataSelector, getProcData } from "../../redux/Selectors/processesSelectors"
import { addMonths, format, subMonths } from "date-fns"
import { PlansComponent } from "./PlansComponent"
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"
import { getIntervals, getServerSelector, getTermSettingsSelector } from "../../redux/Selectors/appSelectors"

const { Text } = Typography

const Signal: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
        dispatch(getSystems())
        dispatch(getProcesses())
        dispatch(getAllValidators())
    }, [])

    const premData = useSelector(getPremData)
    const equipData = useSelector(getEquipData)
    const sysData = useSelector(getSysData)
    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)
    const intervals = useSelector(getIntervals)
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)

    const termSettings = useSelector(getTermSettingsSelector)
    const termSettingsNumber = termSettings ? parseInt(termSettings) : 0

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
        fio: e.fio,
    })).filter(e => {
        const monthCount = parseInt((intervals.find(el => el.value === e.ar)?.interval || '0')) + termSettingsNumber
        if (e.date !== null && e.date !== '' && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта

            const objectDate = new Date(e.date)
            const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
            const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

            const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
            const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
            return (formattedCurrentDate >= formattedObjectDate) || (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth)
        } else if ((e.date === null || e.date === '') && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            return e.date === null || e.date === ''
        }
    })

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
    })).filter(e => {
        const monthCount = parseInt((intervals.find(el => el.value === e.ar)?.interval || '0')) + termSettingsNumber
        if (e.date !== null && e.date !== '' && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта

            const objectDate = new Date(e.date)
            const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
            const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

            const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
            const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
            return (formattedCurrentDate >= formattedObjectDate) || (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth)
        } else if ((e.date === null || e.date === '') && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            return e.date === null || e.date === ''
        }
    })

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
    })).filter(e => {
        const monthCount = parseInt((intervals.find(el => el.value === e.ar)?.interval || '0')) + termSettingsNumber
        if (e.date !== null && e.date !== '' && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта

            const objectDate = new Date(e.date)
            const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
            const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

            const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
            const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
            return (formattedCurrentDate >= formattedObjectDate) || (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth)
        } else if ((e.date === null || e.date === '') && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            return e.date === null || e.date === ''
        }
    })

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
    })).filter(e => {
        const monthCount = parseInt((intervals.find(el => el.value === e.ar)?.interval || '0')) + termSettingsNumber
        if (e.date !== null && e.date !== '' && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта

            const objectDate = new Date(e.date)
            const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
            const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

            const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
            const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
            return (formattedCurrentDate >= formattedObjectDate) || (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth)
        } else if ((e.date === null || e.date === '') && e.ar !== '0' && e.ar !== '11' && e.ar !== '12' && e.ar !== '15') {
            return e.date === null || e.date === ''
        }
    })

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
    let data: DataType[] = [...premNewData, ...equipNewData, ...sysNewData, ...procNewData]

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{ fontSize: '12pt' }}>№</Text>,
            dataIndex: 'index',
            render: (text, record, index) => index + 1,
            align: 'center'
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
                            src={record.foto ? server + record.foto : empty}
                            preview={{ mask: <EyeOutlined style={{ fontSize: '12pt' }} /> }}
                        />
                    </Col>
                    <Col span={23}>
                        <NavLink to={'/' + record.objectType + '/' + record.id} style={{ fontSize: '12pt', marginLeft: '10px' }}>
                            {record.class === 'Складские' ? `Помещение ${record.nomer} «${text}»` : text}
                        </NavLink>
                    </Col>
                </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name)
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
            title: <Text strong style={{ fontSize: '12pt' }}>Статус</Text>,
            dataIndex: 'fio',
            render: (fio, record) => {
                return <>
                    {fio === '' ? <Text type='warning'>Не в работе</Text> :
                        <Text>{`Выполняет ${fio}`}</Text>}
                    {fio !== '' && <ProgressHelper type="work" record={record} myEquipData={myEquipData} myPremData={myPremData} myProcData={myProcData} mySysData={mySysData} access={access} />}
                </>
            },
            width: '12%',
            align: 'center'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Срок (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
        {
            title: <Text strong style={{ fontSize: '12pt', textAlign: 'center', display: 'block' }}>Информация</Text>,
            dataIndex: 'type1',
            render: (type1, record) => { return <PlansComponent record={record} myEquipData={myEquipData} myPremData={myPremData} myProcData={myProcData} mySysData={mySysData} /> },
            width: '13%',
        },
    ]
    return <>
        <Content style={{ padding: '20px 0', marginBottom: '60px' }}>
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={false}
                        title={() => <Text style={{ fontSize: '14pt' }}>Сигнальный лист (всего: {data.length})</Text>}
                        size="small"
                        loading={isLoading}
                    />
                </Col>
            </Row>
        </Content>
    </>
}

export default Signal