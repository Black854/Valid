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
import { getIsLoading, getIsReestrDataLoading, getProcById, getProcCardError, getProcData, getProcReestrDataSelector } from "../../../redux/Selectors/processesSelectors"
import { getProcReestrData, getProcesses, procActions, updateDepartment, updateVMPDepartment } from "../../../redux/Reducers/processesReducer"
import { ProcDescriptions } from "./CardComponents/ProcDescription"
import { ProcLabel } from "./CardComponents/ProcLabel"
import { CardPlans } from "../../common/CardPlans"
import { AddToMonthPlan } from "../../common/AddToMonthPlan"
import { getUserDataAccessSelector } from "../../../redux/Selectors/authSelectors"
import { NextYearCardPlans } from "../../common/NextYearCardPlans"

const { Text } = Typography

const ProcCard: React.FC = () => {

    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)
    const departments = useSelector(getDepartmentsSelector).filter(e => e.stat === '1').map((e: any) => ({ value: e.name, label: e.name }))
    const VMPDepartments = useSelector(getVMPDepartmentsSelector).filter(e => e.isactive !== '1').map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getProcReestrDataSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const procCardError = useSelector(getProcCardError)

    const params = useParams()
    const id = params.id === undefined ? 'none' : params.id

    const procObject = useSelector((state: AppStateType) => getProcById(state, id))

    const dispatch: AppDispatch = useDispatch()

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (procData.length === 0) {
            dispatch(getProcesses())
        } else if (departments.length === 0) {
            dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
            dispatch(getVMPDepartments())
        }
    }, [dispatch, procData, departments, VMPDepartments])

    useEffect(() => {
        dispatch(getProcReestrData(id))
    }, [id])

    useEffect(() => {
        if (procCardError) {
            messageApi.open({
                type: 'error',
                content: procCardError,
                duration: 7
            })
            dispatch(procActions.setProcCardError(null))
        }
    }, [procCardError])

    if (isLoading) {
        return <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} />
    } else if (procObject) {

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
                    defaultValue={procObject.sp}
                    onChange={handleUpdateVMPDepartment}
                    size="small"
                    bordered={false}
                    options={VMPDepartments}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Подразделение (по ответственности)',
                value: <Select
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: '120px' }}
                    defaultValue={procObject.sp2}
                    onChange={handleUpdateDepartment}
                    size="small"
                    bordered={false}
                    options={departments}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={procObject.ar} id={procObject.id} table='processes' access={access} />
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={procObject.ar} fio={procObject.fio} table='processes' />
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
                children: <ProcDescriptions columns={columns} data={data} />,
            },
            {
                key: '2',
                label: 'Перечень валидационных работ',
                children: <CardReestr id={procObject.id} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} group={procObject.groupp} />,
            },
            {
                key: '9',
                label: 'Взять в работу',
                children: <AddToMonthPlan id={procObject.id} objectType="processes" />,
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
                label: 'График работ',
                children: <CardPlans objectName={procObject.name} objectId={procObject.id} sp={procObject.sp} objectType="processes" access={access} />,
            }
        ]

        const nextYearItem: TabsProps['items'] = [
            {
                key: '8',
                label: <Text>График работ {new Date().getFullYear() + 1}</Text>,
                children: <NextYearCardPlans objectName={procObject.name} objectId={procObject.id} sp={procObject.sp} objectType="processes" access={access} />,
            }
        ]

        const labelItem: TabsProps['items'] = [
            {
                key: '6',
                label: 'Статусная этикетка',
                children: <ProcLabel procObject={procObject} reestrData={reestrData} />,
                disabled: procObject.ar === '0' || procObject.ar === '12' || procObject.ar === '15' || procObject.date === null ? true : false
            }
        ]

        const currentMonth = new Date().getMonth()

        return <>
            {contextHolder}
            <Row style={{ padding: '10px 0' }} >
                <Col span={5} sm={4} push={1} style={{ textAlign: 'center' }} >
                    <TitleImage procObject={procObject} id={id} />
                </Col>
                <Col span={16} sm={17} push={2} style={{ minHeight: '89vh', display: "flex", flexDirection: 'column' }} >
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
    } else {
        return <Text type="danger" style={{ fontSize: '12pt', textAlign: 'center', padding: '20px' }}>Внимание! Запрошенный Вами объект не существует!</Text>
    }

}

export default ProcCard