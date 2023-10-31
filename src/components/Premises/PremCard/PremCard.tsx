import { Col, Row, Select, Spin, Tabs, TabsProps, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { ArHelper } from "../../helpers/arHelper"
import React, { useEffect } from "react"
import { getDepartmentsSelector, getPremClassesGroups, getVMPDepartmentsSelector } from "../../../redux/appSelectors"
import { getDepartments, getVMPDepartments } from "../../../redux/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { PremDescriptions } from "./CardComponents/PremDescription"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
import { getIsClassLoading, getIsDepartmentLoading, getIsLoading, getIsReestrDataLoading, getIsVMPDepartmentLoading, getPremById, getPremData, getPremReestrDataSelector } from "../../../redux/premisesSelectors"
import { getPremises, getReestrData, updateClass, updateDepartment, updateNomer, updateVMPDepartment } from "../../../redux/premisesReducer"
const { Text } = Typography

export const PremCard = () => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    let id: string
    if (params.id === undefined) {
        id = 'none'
    } else {
        id = params.id
    }
    
    const premData = useSelector(getPremData)
    const isLoading = useSelector(getIsLoading)
    const premObject = useSelector((state: AppStateType) => getPremById(state, id))
    const classesGroups = useSelector(getPremClassesGroups)
    const departments = useSelector(getDepartmentsSelector)
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isDepartmentLoading = useSelector(getIsDepartmentLoading)
    const isVMPDepartmentLoading = useSelector(getIsVMPDepartmentLoading)
    const isClassLoading = useSelector(getIsClassLoading)
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getPremReestrDataSelector)

    useEffect(() => {
        if (premData.length === 0) {
          dispatch(getPremises())
        } else if (departments.length === 0) {
          dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
          dispatch(getVMPDepartments())
        }
    }, [dispatch, premData, classesGroups, departments, VMPDepartments])
    useEffect (() => {
        dispatch(getReestrData(id))
    }, [id])
    let classesData = [
        {id: '1', value: 'Контролируемые'},
        {id: '2', value: 'Складские'},
        {id: '3', value: 'Чистые'}
    ]

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))
    
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    } else if (premObject) {        
        const updateDataNomer = (nomer: string) => {
            dispatch(updateNomer(premObject.id, nomer))
        }

        const handleUpdateGroup = (text: string) => {
            dispatch(updateClass(id, text))
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
                            defaultValue={premObject.sp}
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
                            defaultValue={premObject.sp2}
                            onChange={handleUpdateDepartment}
                            size="small"
                            bordered={false}
                            options={departmentData}
                            loading={isDepartmentLoading}
                        />
            },
            {
                rowName: 'Номер помещения',
                value:  premObject.nomer ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}, text: premObject.nomer}}>Помещение { premObject.nomer}</Text>:
                                            <Text type="danger" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: <Select
                            defaultValue={premObject.class}
                            onChange={handleUpdateGroup}
                            size="small"
                            style={{paddingRight: '20px', marginLeft: '-7px'}}
                            dropdownStyle={{width: 'auto'}}
                            bordered={false}
                            options={classesData}
                            loading={isClassLoading}
                        />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={premObject.ar} id={premObject.id} table='premises' /> 
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={premObject.ar} fio={premObject.fio} table='premises' /> 
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
              children: <PremDescriptions columns={columns} data={data} />,
            },
            {
              key: '2',
              label: 'Перечень валидационных работ',
              children: <CardReestr id={premObject.id} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} group={premObject.class} />,
            },
            // {
            //   key: '3',
            //   label: 'Техническая информация',
            //   children: <TechnicalInfo id={premObject.id} />,
            // },
            {
              key: '4',
              label: 'Медиа файлы',
              children: <PhotosBlock id={premObject.id} />,
            },
          ]

        return (
            <>
            <Row style={{padding: '10px 0'}} >
                <Col span={5} push={1} style={{textAlign: 'center'}} >
                    <TitleImage premObject={premObject} id={id} />
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
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Помещения с данным идентификатором не существует!</Text>
        )
    }
    
}