import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { PrinterOutlined } from "@ant-design/icons"
import { Button, Table, Typography } from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { UserActionsType, defaultPagination, getUserAccountsActions } from "../../redux/Reducers/appReducer"
import { getUserAccountsActionsSelector } from "../../redux/Selectors/appSelectors"

const { Text } = Typography

export const UserAccountsActions: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserAccountsActions())
    }, [])

    const userAccountsActions = useSelector(getUserAccountsActionsSelector)

    const componentRef = useRef<HTMLDivElement>(null)

    const columns: ColumnsType<UserActionsType> = [
        {
            title: <Text>ID</Text>,
            dataIndex: 'id',
            render: (id) => <Text>{id}</Text>,
            align: 'center',
            width: '6%',
        },
        {
            title: <Text>Дата</Text>,
            dataIndex: 'date',
            render: (date) => <Text>{date}</Text>,
            width: '11%',
            align: 'center',
        },
        {
            title: <Text>Имя</Text>,
            dataIndex: 'fio',
            render: (fio) => <Text>{fio}</Text>,
            align: 'center',
            width: '12%',
        },
        {
            title: <Text>IP-адрес</Text>,
            dataIndex: 'ip',
            render: (ip) => <Text>{ip}</Text>,
            width: '12%',
        },
        {
            title: <Text>Тип</Text>,
            dataIndex: 'type',
            render: (type) => <Text>{type}</Text>,
            align: 'center',
            width: '12%',
        },
        {
            title: <Text>Детали</Text>,
            dataIndex: 'changes',
            render: (changes) => <Text>{changes}</Text>,
        },
    ]

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return <>
        <Button type="primary" onClick={handlePrint} icon={<PrinterOutlined />} size="small" style={{ margin: '20px 20px 0 0' }}>Напечатать</Button>
        <Table
            columns={columns}
            dataSource={userAccountsActions ? userAccountsActions : undefined}
            bordered={false}
            pagination={defaultPagination}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    Аудиторский след учетных записей (всего: {userAccountsActions ? userAccountsActions.length : '0'})
                </Text>
            </>}
            size="small"
            ref={componentRef}
        />
    </>
}