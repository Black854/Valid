import { Col, Row, Select, Spin, Tabs, TabsProps, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { ArHelper } from "../../common/arHelper"
import React, { useEffect } from "react"
import { getDepartmentsSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
import { getIsDepartmentLoading, getIsLoading, getIsReestrDataLoading, getIsVMPDepartmentLoading, getProcById, getProcData, getProcReestrDataSelector } from "../../../redux/Selectors/processesSelectors"
import { getProcesses, getReestrData, updateDepartment, updateVMPDepartment } from "../../../redux/Reducers/processesReducer"
import { ProcDescriptions } from "./CardComponents/ProcDescription"
import { ProcLabel } from "./CardComponents/ProcLabel"
const { Text } = Typography

export const ProcCard = () => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    let id: string
    if (params.id === undefined) {
        id = 'none'
    } else {
        id = params.id
    }
    
    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)
    const procObject = useSelector((state: AppStateType) => getProcById(state, id))
    const departments = useSelector(getDepartmentsSelector)
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isDepartmentLoading = useSelector(getIsDepartmentLoading)
    const isVMPDepartmentLoading = useSelector(getIsVMPDepartmentLoading)
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getProcReestrDataSelector)

    useEffect(() => {
        if (procData.length === 0) {
          dispatch(getProcesses())
        } else if (departments.length === 0) {
          dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
          dispatch(getVMPDepartments())
        }
    }, [dispatch, procData, departments, VMPDepartments])
    useEffect (() => {
        dispatch(getReestrData(id))
    }, [id])

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))
    
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    } else if (procObject) {
        interface DataType {
            ar: string
            date: string
            fio: string
            foto: string
            groupp: string
            id: string
            manual: string
            name: string
            sp: string
            sp2: string
        }

        const handleUpdateDepartment = (text: string) => {
            dispatch(updateDepartment(id, text))
        }

        const handleUpdateVMPDepartment = (text: string) => {
            dispatch(updateVMPDepartment(id, text))
        }

        const data = [
            {
                rowName: 'Подразделение (по ВМП)',
                value: <Select
                            style={{paddingRight: '20px', marginLeft: '-7px'}}
                            dropdownStyle={{width: 'auto'}}
                            defaultValue={procObject.sp}
                            onChange={handleUpdateVMPDepartment}
                            size="small"
                            bordered={false}
                            options={VMPDepartmentData}
                            loading={isVMPDepartmentLoading}
                        />
            },
            {
                rowName: 'Подразделение (по ответственности)',
                value: <Select
                            style={{paddingRight: '20px', marginLeft: '-7px'}}
                            dropdownStyle={{width: '120px'}}
                            defaultValue={procObject.sp2}
                            onChange={handleUpdateDepartment}
                            size="small"
                            bordered={false}
                            options={departmentData}
                            loading={isDepartmentLoading}
                        />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={procObject.ar} id={procObject.id} table='processes' /> 
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={procObject.ar} fio={procObject.fio} table='processes' /> 
            }
        ]
        
        const columns = [
            {
              dataIndex: 'rowName',
              render: (rowName: string) => <Text style={{fontSize: '12pt'}} >{rowName}</Text>,
            },
            {
              dataIndex: 'value',
              width: '60%'
            },
        ]

        const items: TabsProps['items'] = [
            {
              key: '1',
              label: 'Описание',
              children: <ProcDescriptions columns={columns} data={data} />,
            },
            {
              key: '2',
              label: 'Перечень валидационных работ',
              children: <CardReestr id={procObject.id} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} group={procObject.groupp} />,
            },
            {
              key: '3',
              label: 'Техническая информация',
              children: <TechnicalInfo id={procObject.id} />,
            },
            {
              key: '4',
              label: 'Медиа файлы',
              children: <PhotosBlock id={procObject.id} />,
            },
            {
              key: '5',
              label: 'Статусная этикетка',
              children: <ProcLabel procObject={procObject} reestrData={reestrData} />,
              disabled: procObject.ar === '0' || procObject.ar === '12' || procObject.ar === '15' || procObject.date === null ? true : false
            },
          ]

        return (
            <>
            <Row style={{padding: '10px 0'}} >
                <Col span={5} push={1} style={{textAlign: 'center'}} >
                    <TitleImage procObject={procObject} id={id} />
                </Col>
                <Col span={16} push={2} style={{minHeight: '89vh', display: "flex", flexDirection: 'column'}} >
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        indicatorSize={(origin) => origin - 16}
                        style={{flex: 1}}
                        type="card"
                    />
                </Col>
            </Row>
            </>
        )
    } else {
        return (
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Запрошенный Вами объект не существует!</Text>
        )
    }
    
}