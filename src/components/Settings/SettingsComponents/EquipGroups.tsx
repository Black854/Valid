import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { DepartmentsType, EquipGroupsType, getDepartments, getEquipGroups, setEquipGroupsData } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getEquipGroupsIsLoadingSelector, getEquipGroupsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const EquipGroups: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getEquipGroups("all"))
    }, [])

    
    const equipGroupsWithoutEdit = ['Авторефрижераторы', 'Лаб. оборудование', 'Термоконтейнеры', 'Термостаты', 'Тех. оборудование']

    const equipGroupsData = useSelector(getEquipGroupsSelector)
    const equipGroupsIsLoading = useSelector(getEquipGroupsIsLoadingSelector)

    const handleChangeName = (id: string, name: string) => {
        dispatch(setEquipGroupsData(id, name))
    }

    const handleChangeIsActive = (id: string, isactive: string) => {
        dispatch(setEquipGroupsData(id, undefined, isactive))
    }

    const columns: ColumnsType<EquipGroupsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Наименование (карточка)</Text>,
            dataIndex: 'name',
            render: (text, record) => <Text editable={ equipGroupsWithoutEdit.includes(text) ? false : { onChange: (text) => {handleChangeName(record.id, text)}}}>{text}</Text>,
        },
        {
            title: <Text>Видимость в системе</Text>,
            dataIndex: 'isactive',
            render: (text, record) => <Button size="small" type="link" disabled={equipGroupsWithoutEdit.includes(record.name)} onClick={ equipGroupsWithoutEdit.includes(record.name) ? undefined : ()=>handleChangeIsActive(record.id, text === '' ? '1' : '')}>{text === '' ? <Text type={equipGroupsWithoutEdit.includes(record.name) ? 'secondary' : 'success'}>Деактивировать</Text> :<Text type={equipGroupsWithoutEdit.includes(record.name) ? 'secondary' : 'warning'}>Активировать</Text>}</Button>,
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
            loading={equipGroupsIsLoading}
        />
        <Text type="warning" style={{marginTop: '20px', display: 'inline-block'}}>* Системно запрещено изменение некоторых групп </Text>
    </>
}