import { Col, Row, Select, Spin, Tabs, TabsProps, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { ArHelper } from "../../common/arHelper"
import { useEffect } from "react"
import { getDepartmentsSelector, getPremModesSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getPremModes, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { TitleImage } from "./CardComponents/TitleImage"
import { PremDescriptions } from "./CardComponents/PremDescription"
import { CardReestr } from "./CardComponents/CardReestr"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { CurrentStatus } from "../../common/CurrentStatus"
import { getIsLoading, getIsReestrDataLoading, getPremById, getPremCardError, getPremData, getPremReestrDataSelector } from "../../../redux/Selectors/premisesSelectors"
import { getPremReestrData, getPremises, getTechnicalInfo, premActions, updateClass, updateDepartment, updateMode, updateNomer, updateVMPDepartment } from "../../../redux/Reducers/premisesReducer"
import { CleanPremList } from "./CardComponents/CleanPremList"
import { CleanPremGroups } from "./CardComponents/CleanPremGroups"
import { PremLabel } from "./CardComponents/PremLabel"
import { CardPlans } from "../../common/CardPlans"
import { AddToMonthPlan } from "../../common/AddToMonthPlan"
import { getUserDataAccessSelector } from "../../../redux/Selectors/authSelectors"
import { NextYearCardPlans } from "../../common/NextYearCardPlans"

const { Text } = Typography

const PremCard = () => {
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
    const departments = useSelector(getDepartmentsSelector)
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isReestrDataLoading = useSelector(getIsReestrDataLoading)
    const reestrData = useSelector(getPremReestrDataSelector)
    const premModes = useSelector(getPremModesSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))

    useEffect(() => {
        if (premData.length === 0) {
            dispatch(getPremises())
        } else if (departments.length === 0) {
            dispatch(getDepartments())
        } else if (VMPDepartments.length === 0) {
            dispatch(getVMPDepartments())
        } else if (premModes.length === 0) {
            dispatch(getPremModes())
        }
    }, [dispatch, premData, premModes, departments, VMPDepartments])

    useEffect(() => {
        dispatch(getTechnicalInfo(id))
    }, [])

    useEffect(() => {
        dispatch(getPremReestrData(id))
    }, [id])

    const premCardError = useSelector(getPremCardError)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (premCardError) {
            messageApi.open({
                type: 'error',
                content: premCardError,
                duration: 7
            })
            dispatch(premActions.setPremCardError(null))
        }
    }, [premCardError])

    let classesData = [
        { id: '1', value: 'Контролируемые' },
        { id: '2', value: 'Складские' },
        { id: '3', value: 'Чистые' }
    ]

    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))

    let filteredVMPDepartments = VMPDepartments.filter(e => e.isactive !== '1')
    let VMPDepartmentData = filteredVMPDepartments.map((e: any) => ({ value: e.vmpname1, label: e.vmpname1 }))

    if (isLoading) {
        return <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} />
    } else if (premObject) {
        const updateDataNomer = (nomer: string) => {
            dispatch(updateNomer(premObject.id, nomer))
        }

        const handleUpdateGroup = (text: string) => {
            dispatch(updateClass(id, text))
        }

        const handleUpdateMode = (text: string) => {
            dispatch(updateMode(id, text))
        }

        const handleUpdateDepartment = (text: string) => {
            dispatch(updateDepartment(id, text))
        }

        const handleUpdateVMPDepartment = (text: string) => {
            dispatch(updateVMPDepartment(id, text))
        }

        const filteredPremModes = premModes.filter(e => e.type === 't').map(e => ({ value: `${e.low} - ${e.hight} ºC`, label: `${e.low} - ${e.hight} ºC` }))

        const premSkladData = [
            {
                rowName: 'Подразделение (по ВМП)',
                value: <Select
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    defaultValue={premObject.sp}
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
                    defaultValue={premObject.sp2}
                    onChange={handleUpdateDepartment}
                    size="small"
                    bordered={false}
                    options={departmentData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Номер помещения',
                value: premObject.nomer ? <Text editable={{ onChange: (text) => { updateDataNomer(text) }, text: premObject.nomer }}>Помещение {premObject.nomer}</Text> :
                    <Text type="warning" editable={ access > 3 ? false : { onChange: (text) => { updateDataNomer(text) }, text: '' }}>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: <Select
                    defaultValue={premObject.class}
                    onChange={handleUpdateGroup}
                    size="small"
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    bordered={false}
                    options={classesData}
                    disabled
                />
            },
            {
                rowName: 'Температурный режим',
                value: <Select
                    defaultValue={premObject.mode}
                    onChange={handleUpdateMode}
                    size="small"
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    bordered={false}
                    options={filteredPremModes}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={premObject.ar} id={premObject.id} table='premises' access={access} />
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={premObject.ar} fio={premObject.fio} table='premises' />
            }
        ]

        const premOtherData = [
            {
                rowName: 'Подразделение (по ВМП)',
                value: <Select
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    defaultValue={premObject.sp}
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
                    defaultValue={premObject.sp2}
                    onChange={handleUpdateDepartment}
                    size="small"
                    bordered={false}
                    options={departmentData}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Группа',
                value: <>
                    <Select
                        defaultValue={premObject.class}
                        onChange={handleUpdateGroup}
                        size="small"
                        style={{ paddingRight: '20px', marginLeft: '-7px' }}
                        dropdownStyle={{ width: 'auto' }}
                        bordered={false}
                        options={classesData.filter(e => e.value !== 'Складские')}
                        disabled={access > 3}
                    />
                </>
            },
            {
                rowName: 'Температурный режим',
                value: <Select
                    defaultValue={premObject.mode}
                    onChange={handleUpdateGroup}
                    size="small"
                    style={{ paddingRight: '20px', marginLeft: '-7px' }}
                    dropdownStyle={{ width: 'auto' }}
                    bordered={false}
                    options={filteredPremModes}
                    disabled={access > 3}
                />
            },
            {
                rowName: 'Интервал оценки/реквалификации',
                value: <ArHelper ar={premObject.ar} id={premObject.id} table='premises' access={access} />
            },
            {
                rowName: 'Валидационный статус',
                value: <CurrentStatus ar={premObject.ar} fio={premObject.fio} table='premises' />
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
                children: <PremDescriptions columns={columns} data={premObject.class === 'Складские' ? premSkladData : premOtherData} />,
            },
            {
                key: '2',
                label: 'Перечень валидационных работ',
                children: <CardReestr id={premObject.id} mode={premObject.mode} isReestrDataLoading={isReestrDataLoading} reestrData={reestrData} group={premObject.class} />,
            },
            {
                key: '9',
                label: `Взять в работу`,
                children: <AddToMonthPlan id={premObject.id} objectType="premises" />,
            },
            {
                key: '3',
                label: 'Техническая информация',
                children: <TechnicalInfo id={premObject.id} premClass={premObject.class} />,
            },
            {
                key: '4',
                label: 'Медиа файлы',
                children: <PhotosBlock id={premObject.id} />,
            },
            {
                key: '5',
                label: `График работ`,
                children: <CardPlans objectName={premObject.class === 'Складские' ? `Помещение ${premObject.nomer} «${premObject.name}»` : premObject.name} objectId={premObject.id} sp={premObject.sp} objectType="premises" access={access} />,
            },
        ]

        const nextYearItems = [
            {
                key: '8',
                label: <Text>График работ {new Date().getFullYear() + 1}</Text>,
                children: <NextYearCardPlans objectName={premObject.class === 'Складские' ? `Помещение ${premObject.nomer} «${premObject.name}»` : premObject.name} objectId={premObject.id} sp={premObject.sp} objectType="premises" access={access} />,
            },
        ]

        const itemsOfCleanPremises = [
            {
                key: '6',
                label: 'Список помещений',
                children: <CleanPremList id={premObject.id} />,
            },
            {
                key: '7',
                label: 'Статусные этикетки',
                children: <CleanPremGroups id={premObject.id} premObject={premObject} reestrData={reestrData} />,
                disabled: premObject.ar === '0' || premObject.ar === '12' || premObject.ar === '15' || premObject.date === null ? true : false
            }
        ]

        const itemsOfSkladPremises = [
            {
                key: '6',
                label: 'Статусная этикетка',
                children: <PremLabel id={premObject.id} premObject={premObject} reestrData={reestrData} />,
                disabled: premObject.ar === '0' || premObject.ar === '12' || premObject.ar === '15' || premObject.date === null ? true : false
            }
        ]

        const currentMonth = new Date().getMonth()

        return <>
            {contextHolder}
            <Row style={{ padding: '10px 0' }} >
                <Col span={5} push={1} style={{ textAlign: 'center' }} >
                    <TitleImage premObject={premObject} id={id} />
                </Col>
                <Col span={16} push={2} style={{ minHeight: '89vh', display: "flex", flexDirection: 'column' }} >
                    <Tabs
                        defaultActiveKey="1"
                        items={premObject.class === 'Складские' ?
                            currentMonth === 11 ?
                                [...items, ...nextYearItems, ...itemsOfSkladPremises] :
                                [...items, ...nextYearItems, ...itemsOfSkladPremises] :
                            currentMonth === 11 ?
                                [...items, ...itemsOfCleanPremises] :
                                [...items, ...itemsOfCleanPremises]
                        }
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

export default PremCard