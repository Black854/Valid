import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { DepartmentsType, EquipGroupsType, getDepartments, getEquipGroups } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getEquipGroupsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const EquipGroups: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getEquipGroups("all"))
    }, [])

    const equipGroupsData = useSelector(getEquipGroupsSelector)

    const columns: ColumnsType<EquipGroupsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Наименование (карточка)</Text>,
            dataIndex: 'name',
        },
        {
            title: <Text>Видимость в системе</Text>,
            dataIndex: 'isactive',
            render: (text) => <Button size="small" type="link">{text === '' ? <Text type="success">Деактивировать</Text> : <Text type="warning">Активировать</Text>}</Button>,
            align: 'right',
        },
    ]

    const data: EquipGroupsType[] = equipGroupsData.map((item, index) => ({
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
                    Настройки групп оборудования
                </Text>
            </>}
            size="small"
        />
    </>
}