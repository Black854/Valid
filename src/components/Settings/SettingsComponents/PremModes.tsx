import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { PremModesType, getPremModes, setPremModesData } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getPremModesIsLoadingSelector, getPremModesSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"
import { NewPremMode } from "./FormCreators/CreateNewPremMode"

const { Text } = Typography

type PremModesPropsType = {
    access: number
}

export const PremModes: React.FC<PremModesPropsType> = ({ access }) => {
    const dispatch: AppDispatch = useDispatch()
    const premModesWithoutEdit = ['1', '8', '9']
    useEffect(() => {
        dispatch(getPremModes())
    }, [])

    const premModesData = useSelector(getPremModesSelector)
    const premModesIsLoading = useSelector(getPremModesIsLoadingSelector)

    const handleChangeType = (id: string, type: string) => {
        dispatch(setPremModesData(id, type))
    }

    const handleChangeLow = (id: string, low: string) => {
        dispatch(setPremModesData(id, undefined, low))
    }

    const handleChangeHight = (id: string, hight: string) => {
        dispatch(setPremModesData(id, undefined, undefined, hight))
    }

    const handleChangeIsActive = (id: string, isactive: string) => {
        dispatch(setPremModesData(id, undefined, undefined, undefined, isactive))
    }

    const columns: ColumnsType<PremModesType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Параметр</Text>,
            dataIndex: 'type',
            render: (text, record) => <Button size="small" type="default" disabled={premModesWithoutEdit.includes(record.id) || access > 2} onClick={premModesWithoutEdit.includes(record.id) ? undefined : () => handleChangeType(record.id, text === 't' ? 'h' : 't')}>{text === 't' ? 'Температура' : 'Влажность'}</Button>,
        },
        {
            title: <Text>Полное значение</Text>,
            dataIndex: 'hight',
            render: (text, record) => <Text>{`${record.low} - ${record.hight} ${record.type === 't' ? '°C' : '%'}`}</Text>,
            align: 'left',
        },
        {
            title: <Text>Начальное значение</Text>,
            dataIndex: 'low',
            render: (text, record) => <Text editable={(premModesWithoutEdit.includes(record.id) || access > 2) ? false : { onChange: (text) => { handleChangeLow(record.id, text) } }}>{text}</Text>,
            align: 'right',
        },
        {
            title: <Text>Конечное значение</Text>,
            dataIndex: 'hight',
            render: (text, record) => <Text editable={(premModesWithoutEdit.includes(record.id) || access > 2) ? false : { onChange: (text) => { handleChangeHight(record.id, text) } }}>{text}</Text>,
            align: 'left',
        },
        {
            title: <Text>Значение</Text>,
            dataIndex: 'isactive',
            render: (text, record) => <Button size="small" type="link" disabled={premModesWithoutEdit.includes(record.id) || access > 2} onClick={premModesWithoutEdit.includes(record.id) ? undefined : () => handleChangeIsActive(record.id, text === '0' ? '1' : '0')}>{access > 2 ? text === '0' ? <Text type='secondary'>Деактивировать</Text> : <Text type='secondary'>Активировать</Text> : text === '0' ? <Text type={premModesWithoutEdit.includes(record.id) ? 'secondary' : 'success'}>Деактивировать</Text> : <Text type={premModesWithoutEdit.includes(record.id) ? 'secondary' : 'warning'}>Активировать</Text>}</Button>,
            align: 'right',
        },
    ]

    const data: PremModesType[] = premModesData.map((item, index) => ({
        ...item,
        index: index + 1,
        key: item.id
    }))

    return <>
        <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    <NewPremMode access={access} />
                    Настройки режимов температуры/влажности помещений
                </Text>
            </>}
            size="small"
            loading={premModesIsLoading}
        />
        <Text type="warning" style={{ marginTop: '20px', display: 'inline-block' }}>* Системно запрещено изменение некоторых режимов </Text>
    </>
}