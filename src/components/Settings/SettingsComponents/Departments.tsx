import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { DepartmentsType, getDepartments } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const Departments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartments())
    }, [])

    const departmentsData = useSelector(getDepartmentsSelector)

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
            render: (sp) => <Text editable>{sp}</Text>,
        },
        {
            title: <Text>Должность сотрудника</Text>,
            dataIndex: 'pos',
            render: (text) => <Text editable>{text}</Text>,
        },
        {
            title: <Text>Ф.И.О. сотрудника</Text>,
            dataIndex: 'fio',
            render: (text) => <Text editable>{text}</Text>,
        },
        {
            title: <Text>Видимость в системе</Text>,
            dataIndex: 'stat',
            render: (text) => <Button size="small" type="link">{text === '1' ? <Text type="success">Активен</Text> : <Text type="warning">Не активен</Text>}</Button>,
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
        />
    </>
}