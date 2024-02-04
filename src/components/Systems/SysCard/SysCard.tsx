import { Col, Row, Select, Spin, Tabs, TabsProps, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { ArHelper } from "../../common/arHelper"
import { useEffect } from "react"
import { getDepartmentsSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
import { getIsLoading, getIsReestrDataLoading, getSysById, getSysCardError, getSysData, getSysReestrDataSelector } from "../../../redux/Selectors/systemsSelectors"
import { getSysReestrData, getSystems, sysActions, updateDepartment, updateVMPDepartment } from "../../../redux/Reducers/systemsReducer"
import { SysDescriptions } from "./CardComponents/SysDescription"
import { SysLabel } from "./CardComponents/SysLabel"
import { CardPlans } from "../../common/CardPlans"
import { AddToMonthPlan } from "../../common/AddToMonthPlan"
import { getUserDataAccessSelector } from "../../../redux/Selectors/authSelectors"
import { NextYearCardPlans } from "../../common/NextYearCardPlans"

const { Text } = Typography

const SysCard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    let id: string
    if (params.id === undefined) {
        id = 'none'
    } else {
        id = params.id
    }

    const sysData = useSelector(getSysData)
    const isLoading = useSelector(getIsLoading)
    const sysObject = useSelector((state: AppStateType) => getSysById(state, id))
    const departments = useSelector(getDepartmentsSelector)
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getSysReestrDataSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))

    useEffect(() => {
        if (sysData.length === 0) {
            dispatch(getSystems())
        } else if (departments.length === 0) {
            dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
            dispatch(getVMPDepartments())
        }
    }, [dispatch, sysData, departments, VMPDepartments])
    useEffect(() => {
        dispatch(getSysReestrData(id))
    }, [id])

    const sysCardError = useSelector(getSysCardError)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (sysCardError) {
            messageApi.open({
                type: 'error',
                content: sysCardError,
                duration: 7
            })
            dispatch(sysActions.setSysCardError(null))
        }
    }, [sysCardError])

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))

    if (isLoading) {
        return <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} />
    } else if (sysObject) {
        
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
                    defaultValue={sysObject.sp}
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
                    defaultValue={sysObject.sp2}
                    onChange={handleUpdateDepartment}
                    size="small"
                    bordered={false}
                    options={departmentData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={sysObject.ar} id={sysObject.id} table='systems' access={access} />
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={sysObject.ar} fio={sysObject.fio} table='systems' />
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
                children: <SysDescriptions columns={columns} data={data} />,
            },
            {
                key: '2',
                label: 'Перечень валидационных работ',
                children: <CardReestr id={sysObject.id} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} />,
            },
            {
                key: '9',
                label: 'Взять в работу',
                children: <AddToMonthPlan id={sysObject.id} objectType="systems" />,
            },
            {
                key: '3',
                label: 'Техническая информация',
                children: <TechnicalInfo id={sysObject.id} />,
            },
            {
                key: '4',
                label: 'Медиа файлы',
                children: <PhotosBlock id={sysObject.id} />,
            },
            {
                key: '5',
                label: 'График работ',
                children: <CardPlans objectName={sysObject.name} objectId={sysObject.id} sp={sysObject.sp} objectType="systems" access={access} />,
            },
            {
                key: '8',
                label: <Text>График работ {new Date().getFullYear() + 1}</Text>,
                children: <NextYearCardPlans objectName={sysObject.name} objectId={sysObject.id} sp={sysObject.sp} objectType="systems" access={access} />,
            },
            {
                key: '6',
                label: 'Статусная этикетка',
                children: <SysLabel sysObject={sysObject} reestrData={reestrData} />,
                disabled: sysObject.ar === '0' || sysObject.ar === '12' || sysObject.ar === '15' || sysObject.date === null ? true : false
            },
        ]

        return (
            <>
                {contextHolder}
                <Row style={{ padding: '10px 0' }} >
                    <Col span={5} push={1} style={{ textAlign: 'center' }} >
                        <TitleImage sysObject={sysObject} id={id} />
                    </Col>
                    <Col span={16} push={2} style={{ minHeight: '89vh', display: "flex", flexDirection: 'column' }} >
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
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

export default SysCard