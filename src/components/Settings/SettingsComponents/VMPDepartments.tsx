import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { VMPDepartmentsType, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const VMPDepartments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getVMPDepartments())
    }, [])

    const VMPdepartmentsData = useSelector(getVMPDepartmentsSelector)

    const columns: ColumnsType<VMPDepartmentsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Название в меню</Text>,
            dataIndex: 'menuname',
        },
        {
            title: <Text>Подразделение мастер-плана</Text>,
            dataIndex: 'vmpname1',
            render: (text) => <Text editable>{text}</Text>,
        },
        {
            title: <Text>Наименование в р.п.</Text>,
            dataIndex: 'vmpname2',
            render: (text) => <Text editable>{text}</Text>,
        },
        {
            title: <Text>Кодировка мастер-плана</Text>,
            dataIndex: 'code',
            render: (text) => <Text editable>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Кодировка формы</Text>,
            dataIndex: 'code2',
            render: (text) => <Text editable>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Действия</Text>,
            dataIndex: 'isactive',
            render: (text) => <Button size="small" type="default">{text === '' ? <Text type="success">Деактивировать</Text> : <Text type="warning">Активировать</Text>}</Button>,
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
                    Настройки мастер-планов
                </Text>
            </>}
            size="small"
        />
    </>
}