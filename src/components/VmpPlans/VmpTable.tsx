import { FileWordOutlined } from "@ant-design/icons"
import { Button, Table, Typography } from "antd"
import Column from "antd/es/table/Column"
import ColumnGroup from "antd/es/table/ColumnGroup"
import { NavLink } from "react-router-dom"
import { getServerSelector, getThemeType } from "../../redux/Selectors/appSelectors"
import { useSelector } from "react-redux"

const { Text } = Typography

type VmpTablePropsType = {
    data: any
    VMPName: any
    params: any
    tableType: number
}

type dataType = {
    index: number
    key: number
    id: string
    vo: string
    name: string
    tablename: string
    idfromtable: string
    typeval: string
    status: string
    codedoc: string
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
}

export const VmpTable: React.FC<VmpTablePropsType> = ({ data, VMPName, params, tableType }) => {
    
    const themeType = useSelector(getThemeType)
    const server = useSelector(getServerSelector)

    return <>
        <div className={themeType === 'light' ? 'vmpTable1' : 'vmpTable2'}>
            <Table
                dataSource={data}
                bordered
                pagination={false}
                title={tableType === 1 ? () => <Text style={{ fontSize: '14pt' }}>График проведения валидационных работ {VMPName} на {params.year} г.</Text> : undefined}
                size="small"
                style={tableType === 2 ? { marginBottom: '100px', borderRadius: '0px' } : {}}
                caption={<Text style={{ fontSize: '14pt' }}>{tableType === 1 ? 'Квалификация/валидация' : 'Оценка валидационного статуса'}</Text>}
            >
                <Column title={<Text>№</Text>} dataIndex='index' key="number" align="center" />
                <Column
                    title={<Text>Наименование объекта</Text>}
                    dataIndex='name'
                    key="name"
                    width='35%'
                    rowSpan={2}
                    render={(name, record: dataType) => <NavLink to={`/${record.tablename}/${record.idfromtable}`}>{name}</NavLink>}
                />
                <ColumnGroup title="Месяц проведения работ/затраты рабочих дней" align="center">
                    <Column
                        title={<Text>1</Text>}
                        dataIndex='0'
                        key="0"
                        align="center"
                        render={(text, record: dataType) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>2</Text>}
                        dataIndex='1'
                        key="1"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>3</Text>}
                        dataIndex='2'
                        key="2"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>4</Text>}
                        dataIndex='3'
                        key="3"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>5</Text>}
                        dataIndex='4'
                        key="4"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>6</Text>}
                        dataIndex='5'
                        key="5"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>7</Text>}
                        dataIndex='6'
                        key="6"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>8</Text>}
                        dataIndex='7'
                        key="7"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>9</Text>}
                        dataIndex='8'
                        key="8"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>10</Text>}
                        dataIndex='9'
                        key="9"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>11</Text>}
                        dataIndex='10'
                        key="10"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                    <Column
                        title={<Text>12</Text>}
                        dataIndex='11'
                        key="11"
                        align="center"
                        render={(text) => text !== '0' ? <Text>{text}</Text> : <Text></Text>}
                    />
                </ColumnGroup>
                <Column
                    title={<Text>Отметка о выполнении</Text>}
                    dataIndex='status'
                    key="status"
                    align="center"
                    width='8%'
                    render={(status) => <Text type={status === 'Выполнено' ? 'success' : 'warning'}>{status}</Text>}
                />
                <Column
                    title={<Text>Код документа</Text>}
                    dataIndex='codedoc'
                    key="codedoc"
                    align="right"
                    width='27%'
                    render={(codedoc: string, record: dataType) => record.vo ? record.vo !== '' && <><Text type={record.status === 'Выполнено' ? 'success' : undefined}>{codedoc}</Text><Button icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={server + record.vo} /></> : <Text type={record.status === 'Выполнено' ? 'success' : undefined}>{codedoc}</Text>}
                />
            </Table>
        </div>

    </>
}