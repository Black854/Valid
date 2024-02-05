import { Col, Row, Select, Spin, Tabs, TabsProps, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getEquipById, getEquipCardError, getEquipData, getEquipReestrDataSelector, getIsLoading, getIsReestrDataLoading } from "../../../redux/Selectors/equipmentSelectors"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { equipActions, getEquipReestrData, getEquipment, updateDepartment, updateGroup, updateInv, updateManufacturDate, updateManufacturer, updateNomer, updateSerial, updateVMPDepartment } from "../../../redux/Reducers/equipmentReducer"
import { ArHelper } from "../../common/arHelper"
import { useEffect } from "react"
import { getDepartmentsSelector, getEquipGroupsSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getEquipGroups, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { EquipDescriptions } from "./CardComponents/EquipDescription"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
import { EquipLabel } from "./CardComponents/EquipLabel"
import { CardPlans } from "../../common/CardPlans"
import { AddToMonthPlan } from "../../common/AddToMonthPlan"
import { getUserDataAccessSelector } from "../../../redux/Selectors/authSelectors"
import { NextYearCardPlans } from "../../common/NextYearCardPlans"

const { Text } = Typography

const EquipCard: React.FC = () => {
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
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getEquipReestrDataSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))

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
    }, [equipData, equipGroups, departments, VMPDepartments])

    useEffect(() => {
        dispatch(getEquipReestrData(id))
    }, [id])

    const equipCardError = useSelector(getEquipCardError)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (equipCardError) {
            messageApi.open({
                type: 'error',
                content: equipCardError,
                duration: 7
            })
            dispatch(equipActions.setEquipCardError(null))
        }
    }, [equipCardError])

    let filteredEquipGroups = equipGroups.filter(e => e.isactive !== '1');
    let groupsData = filteredEquipGroups.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))

    if (isLoading) {
        return <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} />
    } else if (equipObject) {
        
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
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    defaultValue={equipObject.sp}
                    onChange={handleUpdateVMPDepartment}
                    size="small"
                    bordered={false}
                    options={VMPDepartmentData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Подразделение (по ответственности)',
                value: <Select
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: '120px' }}
                    defaultValue={equipObject.sp2}
                    onChange={handleUpdateDepartment}
                    size="small"
                    bordered={false}
                    options={departmentData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Местонахождение',
                value: equipObject.nomer ? <Text editable={access > 3 ? false : { onChange: (text) => { updateDataNomer(text) }, text: equipObject.nomer }}>Помещение № {equipObject.nomer}</Text> :
                    <Text type="warning" editable={{ onChange: (text) => { updateDataNomer(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: <Select
                    defaultValue={equipObject.groupp}
                    onChange={handleUpdateGroup}
                    size="small"
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    bordered={false}
                    options={groupsData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Производитель',
                value: equipObject.manufacturer ? <Text copyable editable={access > 3 ? false : { onChange: (text) => { updateDataManufacturer(text) } }}>{equipObject.manufacturer}</Text> :
                    <Text type="warning" editable={access > 3 ? false : { onChange: (text) => { updateDataManufacturer(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Год изготовления',
                value: equipObject.manufacturdate ? <Text editable={access > 3 ? false : { onChange: (text) => { updateDataManufacturdate(text) } }}>{equipObject.manufacturdate}</Text> :
                    <Text type="warning" editable={access > 3 ? false : { onChange: (text) => { updateDataManufacturdate(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Серийный номер',
                value: equipObject.serial ? <Text copyable editable={access > 3 ? false : { onChange: (text) => { updateDataSerial(text) } }}>{equipObject.serial}</Text> :
                    <Text type="warning" editable={access > 3 ? false : { onChange: (text) => { updateDataSerial(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Учетный номер',
                value: equipObject.inv ? <Text copyable editable={access > 3 ? false : { onChange: (text) => { updateDataInv(text) } }}>{equipObject.inv}</Text> :
                    <Text type="warning" editable={access > 3 ? false : { onChange: (text) => { updateDataInv(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={equipObject.ar} id={equipObject.id} table='equipment' access={access} />
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={equipObject.ar} fio={equipObject.fio} table='equipment' />
            }
        ]

        const columns = [
            {
                dataIndex: 'rowName',
                render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
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
                key: '9',
                label: 'Взять в работу',
                children: <AddToMonthPlan id={equipObject.id} objectType="equipment" />,
            },
            {
                key: '3',
                label: 'Техническая информация',
                children: <TechnicalInfo id={equipObject.id} access={access} />,
            },
            {
                key: '4',
                label: 'Медиа файлы',
                children: <PhotosBlock id={equipObject.id} />,
            },
            {
                key: '5',
                label: 'График работ',
                children: <CardPlans objectName={equipObject.name} objectId={equipObject.id} sp={equipObject.sp} objectType="equipment" access={access} />,
            },
        ]

        const nextYearItem: TabsProps['items'] = [
            {
                key: '8',
                label: <Text>График работ {new Date().getFullYear() + 1}</Text>,
                children: <NextYearCardPlans objectName={equipObject.name} objectId={equipObject.id} sp={equipObject.sp} objectType="equipment" access={access} />,
            }
        ]

        const labelItem: TabsProps['items'] = [
            {
                key: '6',
                label: 'Статусная этикетка',
                children: <EquipLabel equipObject={equipObject} reestrData={reestrData} />,
                disabled: equipObject.ar === '0' || equipObject.ar === '12' || equipObject.ar === '15' || equipObject.date === null ? true : false
            }
        ]
        
        const currentMonth = new Date().getMonth()

        return (
            <>
                {contextHolder}
                <Row style={{ padding: '10px 0' }} >
                    <Col span={5} push={1} style={{ textAlign: 'center' }} >
                        <TitleImage equipObject={equipObject} id={id} />
                    </Col>
                    <Col span={16} push={2} style={{ minHeight: '89vh', display: "flex", flexDirection: 'column' }} >
                        <Tabs
                            defaultActiveKey="1"
                            items={currentMonth === 11 ? [...items, ...nextYearItem, ...labelItem] : [...items, ...labelItem]}
                            indicatorSize={(origin) => origin - 16}
                            style={{ flex: 1 }}
                            type="card"
                        />
                    </Col>
                </Row>
            </>
        )
    } else {
        return (
            <Text type="danger" style={{ fontSize: '12pt', textAlign: 'center', padding: '20px' }}>Внимание! Запрошенный Вами объект не существует!</Text>
        )
    }
}

export default EquipCard