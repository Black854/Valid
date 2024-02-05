import { Button, DatePicker, Table, Typography } from "antd"
import { useParams } from "react-router-dom"
import { getThemeType } from "../../redux/Selectors/appSelectors"
import { useDispatch, useSelector } from "react-redux"
import { ColumnsType } from "antd/es/table"
import { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { getVMPChangeListSelector } from "../../redux/Selectors/vmpSelectors"
import { ChangeListDataType, getVMPChangeList, updateChangeListData } from "../../redux/Reducers/vmpReducer"
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"

const { Text } = Typography

type ChangeListPropsType = {
    VMPName: string | undefined
}

export const ChangeList: React.FC<ChangeListPropsType> = ({ VMPName }) => {

    const themeType = useSelector(getThemeType)
    const params = useParams()
    const dispatch: AppDispatch = useDispatch()
    const getVMPChangeListData = useSelector(getVMPChangeListSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))

    const data = getVMPChangeListData.map((e, index) => ({ ...e, index: index + 1 }))

    useEffect(() => {
        if (params.number && params.year) {
            dispatch(getVMPChangeList(params.number, params.year))
        }
    }, [params])

    const handleUpdateChangeListData = (id: string, text: string, type: 'version' | 'date2' | 'doc' | 'changes' | 'print') => {
        if (params.number && params.year) {
            if (type === 'date2' && text) {
                const date = new Date(text)
                const formattedSelectedDate = format(date, 'yyyy-MM-dd')
                dispatch(updateChangeListData(id, formattedSelectedDate, type, params.number, params.year))

            } else {
                dispatch(updateChangeListData(id, text, type, params.number, params.year))
            }
        }
    }

    const dateFormat = "DD.MM.YYYY"

    const columns: ColumnsType<ChangeListDataType> = [
        {
            title: <Text strong style={{ fontSize: '12pt' }}>№</Text>,
            dataIndex: 'index',
            render: (text, record) => <Text type={record.print === '1' ? 'secondary' : undefined}>{text}</Text>,
            align: 'center',
            width: '3%'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Версия</Text>,
            dataIndex: 'version',
            render: (text, record) => <Text editable={record.print === '1' || access > 1 ? false : { onChange: (text) => { handleUpdateChangeListData(record.id, text, 'version') } }} type={record.print === '1' ? 'secondary' : undefined}>{text}</Text>,
            align: 'center',
            width: '5%'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Дата введения</Text>,
            dataIndex: 'date2',
            render: (text, record) => <DatePicker disabled={access > 1 || record.print === '1'} size='small' allowClear format={'DD.MM.YYYY'} defaultValue={text ? dayjs(text, dateFormat) : undefined} bordered={false} onChange={(date) => handleUpdateChangeListData(record.id, date ? date.toString() : '', 'date2')} />,
            align: 'center',
            width: '10%'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Документ, регламентирующий изменение</Text>,
            dataIndex: 'doc',
            render: (text, record) => <Text editable={record.print === '1' || access > 1 ? false : { onChange: (text) => { handleUpdateChangeListData(record.id, text, 'doc') } }} type={record.print === '1' ? 'secondary' : undefined}>{text}</Text>,
            align: 'center'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Краткое содержание изменений версии</Text>,
            dataIndex: 'changes',
            render: (text, record) => <Text editable={record.print === '1' || access > 1 ? false : { onChange: (text) => { handleUpdateChangeListData(record.id, text, 'changes') } }} type={record.print === '1' ? 'secondary' : undefined}>{text}</Text>,
            width: '50%'
        },
        {
            dataIndex: 'print',
            align: 'center',
            render: (print, record) => <Button disabled={access > 1} onClick={() => handleUpdateChangeListData(record.id, print === '1' ? '0' : '1', 'print')} size="small" type={print === '1' ? 'primary' : 'default'}>{print === '1' ? 'Активировать' : 'Деактивировать'}</Button>
        }
    ]

    return <>
        <div className={themeType === 'light' ? 'vmpTable1' : 'vmpTable2'}>
            <Table
                dataSource={data.reverse()}
                columns={columns}
                bordered
                style={{marginBottom: '60px'}}
                pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
                title={() => <Text style={{ fontSize: '14pt' }}>Лист регистрации истории изменений графика ВМП {VMPName} на {params.year} г.</Text>}
                size="small"
            />
        </div>
    </>
}