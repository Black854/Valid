import { Typography, Col, Image, Row, Spin, message } from "antd"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { getPremData, getIsLoading, getCurrentPremDataSelector } from "../../redux/Selectors/premisesSelectors"
import { EyeOutlined } from '@ant-design/icons'
import { RenderDateHelper } from "../common/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { PremDataType, getCurrentPremData, getPremises } from "../../redux/Reducers/premisesReducer"
import { getCurrentEquipDataSelector, getEquipData } from "../../redux/Selectors/equipmentSelectors"
import { EquipDataType, getCurrentEquipData, getEquipment } from "../../redux/Reducers/equipmentReducer"
import { ProgressHelper } from "./taskComponents/ProgressHelper"
import { AllValidatorsType, getAllValidators } from "../../redux/Reducers/appReducer"
import { getAllValidatorsSelector, getServerSelector } from "../../redux/Selectors/appSelectors"
import { SysDataType, getCurrentSysData, getSystems } from "../../redux/Reducers/systemsReducer"
import { ProcDataType, getCurrentProcData, getProcesses } from "../../redux/Reducers/processesReducer"
import { getCurrentSysDataSelector, getSysData } from "../../redux/Selectors/systemsSelectors"
import { getCurrentProcDataSelector, getProcData } from "../../redux/Selectors/processesSelectors"
import { getWorkError } from "../../redux/Selectors/workSelectors"
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"
import { Tasks } from "./Tasks"

const { Text } = Typography

const Monitoring: React.FC = () => {

    const premData = useSelector(getPremData)
    const equipData = useSelector(getEquipData)
    const sysData = useSelector(getSysData)
    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)
    const usersFilters = useSelector(getAllValidatorsSelector).map((e: AllValidatorsType) => ({ value: e.fio, text: e.fio }))
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)
    const myPremData = useSelector(getCurrentPremDataSelector)
    const myEquipData = useSelector(getCurrentEquipDataSelector)
    const mySysData = useSelector(getCurrentSysDataSelector)
    const myProcData = useSelector(getCurrentProcDataSelector)
    const workError = useSelector(getWorkError)

    const dispatch: AppDispatch = useDispatch()

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
        dispatch(getSystems())
        dispatch(getProcesses())
        dispatch(getAllValidators())
    }, [])

    useEffect(() => {
        dispatch(getCurrentPremData(myPremDataIdArray))
    }, [premData])


    useEffect(() => {
        dispatch(getCurrentEquipData(myEquipDataIdArray))
    }, [equipData])


    useEffect(() => {
        dispatch(getCurrentSysData(mySysDataIdArray))
    }, [sysData])


    useEffect(() => {
        dispatch(getCurrentProcData(myProcDataIdArray))
    }, [procData])

    useEffect(() => {
        workError && messageApi.open({ type: 'error', content: workError })
    }, [workError])

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }

    const newDataFunc = (data: EquipDataType[] | PremDataType[] | SysDataType[] | ProcDataType[], objectType: 'equipment' | 'premises' | 'systems' | 'processes') => {
        const mappedData = data.map(e => ({ mode: 'none', groupp: 'none', class: 'none', ...e }))
        return mappedData.map(e => ({
            objectType: objectType,
            id: e.id,
            key: objectType === 'equipment' ? 'equip' + e.id : objectType === 'premises' ? 'prem' + e.id : objectType === 'systems' ? 'sys' + e.id : 'proc' + e.id,
            sp2: e.sp2,
            name: e.name,
            nomer: objectType === 'equipment' || objectType === 'premises' ? e.nomer : 'none',
            class: objectType === 'equipment' ? e.groupp : objectType === 'premises' ? e.class : 'none',
            mode: objectType === 'premises' ? e.mode : 'none',
            date: e.date,
            ar: e.ar,
            foto: e.foto,
            fio: e.fio
        })).filter(e => e.fio !== '')
    }

    const equipNewData = newDataFunc(equipData, 'equipment')
    const premNewData = newDataFunc(premData, 'premises')
    const sysNewData = newDataFunc(sysData, 'systems')
    const procNewData = newDataFunc(procData, 'processes')

    const myPremDataIdArray = premNewData.map(e => e.id)
    const myEquipDataIdArray = equipNewData.map(e => e.id)
    const mySysDataIdArray = sysNewData.map(e => e.id)
    const myProcDataIdArray = procNewData.map(e => e.id)

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
            title: <Text strong style={{ fontSize: '12pt' }}>Прогресс</Text>,
            render: (text, record, index) => {
                return <ProgressHelper type="mon" key={index} record={record} myPremData={myPremData} myEquipData={myEquipData} mySysData={mySysData} myProcData={myProcData} access={access} />
            },
            align: 'center',
            width: '10%'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Исполнитель</Text>,
            dataIndex: 'fio',
            render: (fio) => {
                return <Text>{fio}</Text>
            },
            align: 'center',
            filters: usersFilters,
            onFilter: (value: any, record) => record.fio.indexOf(value) === 0,
            sorter: (a, b) => a.fio.localeCompare(b.fio),
            width: '12%'
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
            width: '12.5%',
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

    return isLoading ? <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} /> :
        <Tasks columns={columns}
            error={error}
            data={data}
            isLoading={isLoading}
            myPremData={myPremData}
            myEquipData={myEquipData}
            mySysData={mySysData}
            myProcData={myProcData}
            access={access}
            myPremDataIdArray={myPremDataIdArray}
            myEquipDataIdArray={myEquipDataIdArray}
            mySysDataIdArray={mySysDataIdArray}
            myProcDataIdArray={myProcDataIdArray}
            contextHolder={contextHolder}
            tasksType="Все задачи"
        />
}

export default Monitoring