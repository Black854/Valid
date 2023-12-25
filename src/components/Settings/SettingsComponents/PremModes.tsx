import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { PremModesType, getPremModes } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getPremModesSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const PremModes: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getPremModes())
    }, [])

    const premModesData = useSelector(getPremModesSelector)

    const columns: ColumnsType<PremModesType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Параметр</Text>,
            dataIndex: 'type',
            render: (text) => <Button size="small" type="default">{text === 't' ? 'Температура' : 'Влажность'}</Button>,
        },
        {
            title: <Text>Начальное значение</Text>,
            dataIndex: 'low',
            render: (text) => <Text editable>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Конечное значение</Text>,
            dataIndex: 'hight',
            render: (text) => <Text editable>{text}</Text>,
            align: 'left',
        },
        {
            title: <Text>Значение</Text>,
            dataIndex: 'isactive',
            render: (text) => <Button size="small" type="link">{text === '' ? <Text type="success">Деактивировать</Text> : <Text type="warning">Активировать</Text>}</Button>,
            align: 'right',
        },
    ]

    const data: PremModesType[] = premModesData.map((item, index) => ({
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