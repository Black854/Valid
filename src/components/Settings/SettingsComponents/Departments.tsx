import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { DepartmentsType, getDepartments, setDepartmentsData } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsIsLoadingSelector, getDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const Departments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    const departmentsData = useSelector(getDepartmentsSelector)
    const departmentsIsLoading = useSelector(getDepartmentsIsLoadingSelector)

    const handleChangeName2 = (id: string, text: string) => {
        dispatch(setDepartmentsData(id, text))
    }

    const handleChangePos = (id: string, text: string) => {
        dispatch(setDepartmentsData(id, undefined, text))
    }

    const handleChangeFio = (id: string, text: string) => {
        dispatch(setDepartmentsData(id, undefined, undefined, text))
    }

    const handleChangeIsActive = (id: string, text: string) => {
        dispatch(setDepartmentsData(id, undefined, undefined, undefined, text))
    }

    const columns: ColumnsType<DepartmentsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Отдел</Text>,
            dataIndex: 'name',
        },
        {
            title: <Text>Наименование штатной единицы</Text>,
            dataIndex: 'name2',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeName2(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Должность сотрудника</Text>,
            dataIndex: 'pos',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangePos(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Ф.И.О. сотрудника</Text>,
            dataIndex: 'fio',
            render: (text, record) => <Text editable={{ onChange: (text) => {handleChangeFio(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Видимость в системе</Text>,
            dataIndex: 'stat',
            render: (text, record) => <Button onClick={() => {handleChangeIsActive(record.id, text === '1' ? '' : '1')}} size="small" type="link">{text === '1' ? <Text type="success">Активен</Text> : <Text type="warning">Не активен</Text>}</Button>,
            align: 'right',
        },
    ]

    const data: DepartmentsType[] = departmentsData.map((item, index) => ({
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
                    Настройки подразделений
                </Text>
            </>}
            size="small"
            loading={departmentsIsLoading}
        />
    </>
}