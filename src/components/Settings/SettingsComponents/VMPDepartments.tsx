import { Button, Table, Typography, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { VMPDepartmentsType, getDepartments, getVMPDepartments, setVMPDepartmentsData } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsSelector, getVMPDepartmentsIsLoadingSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"
import { NewVMPDepartmentForm } from "./FormCreators/CreateNewVMPDepartment"
import { VMPConsumers } from "./FormCreators/VMPConsumers"

const { Text } = Typography

type VMPDepartmentsPropsType = {
    access: number
}

export const VMPDepartments: React.FC<VMPDepartmentsPropsType> = ({ access }) => {
    const [messageApi, contextHolder] = message.useMessage()

    const error = () => {
        messageApi.open({
            type: 'warning',
            content: `Внимание! Мастер-план с аналогичным подразделением уже существует!`,
            duration: 5
        })
    }

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartments())
        dispatch(getVMPDepartments())
    }, [])

    const VMPdepartmentsData = useSelector(getVMPDepartmentsSelector)
    const departmentsData = useSelector(getDepartmentsSelector)
    const VMPdepartmentsIsLoading = useSelector(getVMPDepartmentsIsLoadingSelector)

    const handleChangeVmpname1 = (id: string, text: string) => {
        VMPdepartmentsData.map(e => e.vmpname1.toLowerCase()).includes(text.toLowerCase()) ?
            error() :
            dispatch(setVMPDepartmentsData(id, text))
    }

    const handleChangeVmpname2 = (id: string, text: string) => {
        dispatch(setVMPDepartmentsData(id, undefined, text))
    }

    const handleChangeCode = (id: string, text: string) => {
        dispatch(setVMPDepartmentsData(id, undefined, undefined, text))
    }

    const handleChangeCode2 = (id: string, text: string) => {
        dispatch(setVMPDepartmentsData(id, undefined, undefined, undefined, text))
    }

    const handleChangeIsActive = (id: string, text: string) => {
        dispatch(setVMPDepartmentsData(id, undefined, undefined, undefined, undefined, text))
    }

    const handleChangeMenuname = (id: string, text: string) => {
        dispatch(setVMPDepartmentsData(id, undefined, undefined, undefined, undefined, undefined, text))
    }

    const columns: ColumnsType<VMPDepartmentsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Название в меню</Text>,
            dataIndex: 'menuname',
            render: (text, record) => <Text editable={access > 1 ? false : { onChange: (text) => { handleChangeMenuname(record.id, text) } }}>{text}</Text>,
        },
        {
            title: <Text>Подразделение мастер-плана</Text>,
            dataIndex: 'vmpname1',
            render: (text, record) => <Text editable={access > 1 ? false : { onChange: (text) => { handleChangeVmpname1(record.id, text) } }}>{text}</Text>,
        },
        {
            title: <Text>Наименование в р.п.</Text>,
            dataIndex: 'vmpname2',
            render: (text, record) => <Text editable={access > 1 ? false : { onChange: (text) => { handleChangeVmpname2(record.id, text) } }}>{text}</Text>,
        },
        {
            title: <Text>Кодировка ВМП</Text>,
            dataIndex: 'code',
            render: (text, record) => <Text editable={access > 1 ? false : { onChange: (text) => { handleChangeCode(record.id, text) } }}>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Кодировка формы графика</Text>,
            dataIndex: 'code2',
            render: (text, record) => <Text editable={access > 1 ? false : { onChange: (text) => { handleChangeCode2(record.id, text) } }}>{text}</Text>,
            align: 'left',
        },
        {
            title: <Text>Согласователи</Text>,
            dataIndex: 'isactive',
            render: (text, record) => <VMPConsumers VMPId={record.id} VMPname={record.vmpname2} departments={departmentsData} consumers={record.consumers} access={access} />,
            align: 'center',
        },
        {
            title: <Text>Действия</Text>,
            dataIndex: 'isactive',
            render: (text, record) => <>
                <Button disabled={access > 1} onClick={() => { handleChangeIsActive(record.id, text === '1' ? '0' : '1') }} size="small" type="link">{access > 1 ? text === '0' ? <Text type="secondary">Деактивировать</Text> : <Text type="secondary">Активировать</Text> : text === '0' ? <Text type="success">Деактивировать</Text> : <Text type="warning">Активировать</Text>}</Button>
            </>,
            align: 'right',
        },
    ]

    const data: VMPDepartmentsType[] = VMPdepartmentsData.map((item, index) => ({
        ...item,
        index: index + 1,
        key: item.id
    }))

    return <>
        {contextHolder}
        <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    <NewVMPDepartmentForm access={access} />
                    Настройки графиков ВМП
                </Text>
            </>}
            size="small"
            loading={VMPdepartmentsIsLoading}
        />
    </>
}