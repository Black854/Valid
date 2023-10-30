import { Col, Row, Select, Spin, Tabs, TabsProps, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getEquipById, getEquipData, getIsDepartmentLoading, getIsGroupLoading, getIsLoading, getIsReestrDataLoading, getIsVMPDepartmentLoading, getReestrDataSelector } from "../../../redux/equipmentSelectors"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { getEquipment, getReestrData, updateDepartment, updateGroup, updateInv, updateManufacturDate, updateManufacturer, updateNomer, updateSerial, updateVMPDepartment } from "../../../redux/equipmentReducer"
import { ArHelper } from "../../helpers/arHelper"
import React, { useEffect } from "react"
import { getDepartmentsSelector, getEquipGroupsSelector, getVMPDepartmentsSelector } from "../../../redux/appSelectors"
import { getDepartments, getEquipGroups, getVMPDepartments } from "../../../redux/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { EquipDescriptions } from "./CardComponents/EquipDescription"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
const { Text } = Typography

export const EquipCard = () => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    let id: string
    if (params.id === undefined) {
        id = 'none'
    } else {
        id = params.id
    }
    
    const equipData = useSelector(getEquipData)
    const isLoading = useSelector(getIsLoading)
    const equipObject = useSelector((state: AppStateType) => getEquipById(state, id))
    const equipGroups = useSelector(getEquipGroupsSelector)
    const departments = useSelector(getDepartmentsSelector)
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isDepartmentLoading = useSelector(getIsDepartmentLoading)
    const isVMPDepartmentLoading = useSelector(getIsVMPDepartmentLoading)
    const isGroupLoading = useSelector(getIsGroupLoading)
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getReestrDataSelector)

    useEffect(() => {
        if (equipData.length === 0) {
          dispatch(getEquipment())
        } else if (equipGroups.length === 0) {
          dispatch(getEquipGroups('active'))
        } else if (departments.length === 0) {
          dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
          dispatch(getVMPDepartments())
        }
    }, [dispatch, equipData, equipGroups, departments, VMPDepartments])
    useEffect (() => {
        dispatch(getReestrData(id))
    }, [id])
    let filteredEquipGroups = equipGroups.filter(e => e.isactive !== '1');
    let groupsData = filteredEquipGroups.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))
    
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    } else if (equipObject) {
        interface DataType {
            ar: string
            date: string
            fio: string
            foto: string
            groupp: string
            id: string
            inv: string
            manual: string
            manufacturdate: string
            manufacturer: string
            name: string
            nomer: string
            sp: string
            sp2: string
            serial: string
        }
        
        const updateDataNomer = (nomer: string) => {
            dispatch(updateNomer(equipObject.id, nomer))
        }

        const updateDataManufacturer = (manufacturer: string) => {
            dispatch(updateManufacturer(equipObject.id, manufacturer))
        }

        const updateDataManufacturdate = (manufacturDate: string) => {
            dispatch(updateManufacturDate(equipObject.id, manufacturDate))
        }

        const updateDataInv = (inv: string) => {
            dispatch(updateInv(equipObject.id, inv))
        }

        const updateDataSerial = (serial: string) => {
            dispatch(updateSerial(equipObject.id, serial))
        }

        const handleUpdateGroup = (text: string) => {
            dispatch(updateGroup(id, text))
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
                            defaultValue={equipObject.sp}
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
                            defaultValue={equipObject.sp2}
                            onChange={handleUpdateDepartment}
                            size="small"
                            bordered={false}
                            options={departmentData}
                            loading={isDepartmentLoading}
                        />
            },
            {
                rowName: 'Местонахождение',
                value:  equipObject.nomer ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}, text: equipObject.nomer}}>Помещение № { equipObject.nomer}</Text>:
                                            <Text type="danger" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: <Select
                            defaultValue={equipObject.groupp}
                            onChange={handleUpdateGroup}
                            size="small"
                            style={{paddingRight: '20px', marginLeft: '-7px'}}
                            dropdownStyle={{width: 'auto'}}
                            bordered={false}
                            options={groupsData}
                            loading={isGroupLoading}
                        />
            },
            {
                rowName: 'Производитель',
                value: equipObject.manufacturer ? <Text editable={{ onChange: (text) => {updateDataManufacturer(text)}}}>{equipObject.manufacturer}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataManufacturer(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Год изготовления',
                value: equipObject.manufacturdate ? <Text editable={{ onChange: (text) => {updateDataManufacturdate(text)}}}>{equipObject.manufacturdate}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataManufacturdate(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Серийный номер',
                value: equipObject.serial ? <Text editable={{ onChange: (text) => {updateDataSerial(text)}}}>{equipObject.serial}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataSerial(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Учетный номер',
                value: equipObject.inv ? <Text editable={{ onChange: (text) => {updateDataInv(text)}}}>{equipObject.inv}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataInv(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={equipObject.ar} id={equipObject.id} /> 
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={equipObject.ar} fio={equipObject.fio} /> 
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
              children: <EquipDescriptions columns={columns} data={data} />,
            },
            {
              key: '2',
              label: 'Перечень валидационных работ',
              children: <CardReestr id={equipObject.id} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} group={equipObject.groupp} />,
            },
            {
              key: '3',
              label: 'Техническая информация',
              children: <TechnicalInfo id={equipObject.id} />,
            },
            {
              key: '4',
              label: 'Фотографии/Документы',
              children: <PhotosBlock id={equipObject.id} />,
            },
          ]

        return (
            <>
            <Row style={{padding: '10px 0'}} >
                <Col span={5} push={1} style={{textAlign: 'center'}} >
                    <TitleImage equipObject={equipObject} id={id} />
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
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Оборудования с данным идентификатором не существует!</Text>
        )
    }
    
}