import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { VMPDepartmentsType, getVMPDepartments, setVMPDepartmentsData } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsIsLoadingSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"
import { NewVMPDepartmentForm } from "./FormCreators/CreateNewVMPDepartment"

const { Text } = Typography

export const VMPDepartments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getVMPDepartments())
    }, [])

    const VMPdepartmentsData = useSelector(getVMPDepartmentsSelector)
    const VMPdepartmentsIsLoading = useSelector(getVMPDepartmentsIsLoadingSelector)

    const handleChangeVmpname1 = (id: string, text: string) => {
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
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeMenuname(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Подразделение мастер-плана</Text>,
            dataIndex: 'vmpname1',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeVmpname1(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Наименование в р.п.</Text>,
            dataIndex: 'vmpname2',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeVmpname2(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Кодировка мастер-плана</Text>,
            dataIndex: 'code',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeCode(record.id, text)}}}>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Кодировка формы</Text>,
            dataIndex: 'code2',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeCode2(record.id, text)}}}>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Действия</Text>,
            dataIndex: 'isactive',
            render: (text, record) => <Button onClick={() => {handleChangeIsActive(record.id, text === '1' ? '0' : '1')}} size="small" type="link">{text === '0' ? <Text type="success">Активен</Text> : <Text type="warning">Не активен</Text>}</Button>,
            align: 'right',
        },
    ]

    const data: VMPDepartmentsType[] = VMPdepartmentsData.map((item, index) => ({
        ...item,
        index: index + 1,
      }))

    return <>
        <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    <NewVMPDepartmentForm />
                    Настройки мастер-планов
                </Text>
            </>}
            size="small"
            loading={VMPdepartmentsIsLoading}
        />
    </>
}