import { Button, Col, Menu, MenuProps, Modal, Row, Table, Typography, message } from "antd"
import { PrinterOutlined, EyeOutlined, CalendarOutlined, FileWordOutlined } from '@ant-design/icons'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { useEffect, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { VMPDataType, getVMPData } from "../../redux/Reducers/vmpReducer"
import { ColumnsType } from "antd/es/table"
import ColumnGroup from "antd/es/table/ColumnGroup"
import Column from "antd/es/table/Column"
import { getVMPDataSelector } from "../../redux/Selectors/vmpSelectors"
import { plansDataBuilder } from "./plansDataBuilder"
const { Text, Link } = Typography

export const VmpPlans: React.FC = () => {

    type MenuItem = Required<MenuProps>['items'][number]
    const [messageApi, contextHolder] = message.useMessage()
    const params = useParams()
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate()
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const VMPName = VMPDepartments.find(e => e.id === params.number)?.vmpname2
    const tableName = VMPDepartments.find(e => e.id === params.number)?.vmptablename
    const VMPData = useSelector(getVMPDataSelector)

    const data1 = plansDataBuilder(VMPData, ['1'])
    const data2 = plansDataBuilder(VMPData, ['2', '3'])
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

    const data: dataType[] = [...data1, ...data2].map((e, index) => ({ ...e, index: index + 1, key: index + 1}))

    useEffect(() => {
        if (tableName && params.year) {
            dispatch(getVMPData(tableName, params.year))
        }
    }, [tableName, params.year])

    const [VMPPrintModalIsOpen, setVMPPrintModalIsOpen] = useState(false)
    const [vmpReportPrintModalIsOpen, setVMPReportPrintModalIsOpen] = useState(false)
    const [VMPImportModalIsOpen, setVMPImportModalIsOpen] = useState(false)
    const [iframeKey, setIframeKey] = useState(0)

    const handleCancel = (modalType: string) => {
        if (modalType === 'VMPPrint') {
            setVMPPrintModalIsOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'VMPImport') {
            setVMPImportModalIsOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'VMPReportPrint') {
            setVMPReportPrintModalIsOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        }
    }

    const handleMenuClick = (key: string) => {
        const year = key.slice(7, 11)
        const monthNumber = key.slice(11, 13).padStart(2, '0')
        if (key === 'vmpPlanPrint') {
            setVMPPrintModalIsOpen(true)
            setIframeKey(prevKey => prevKey + 1)
        } else if (key === 'vmpReportPrint') {
            setVMPReportPrintModalIsOpen(true)
            setIframeKey(prevKey => prevKey + 1)
        } else if (key === 'vmpPlanImport') {
            setVMPImportModalIsOpen(true)
            setIframeKey(prevKey => prevKey + 1)
        } else {
            const url = `/vmp/${params.number}/${key}`
            navigate(url)
        }
    }

    return (
        <Row style={{ marginTop: '10px' }}>
            <Col span={4}>
                {contextHolder}
                <Menu
                    mode="inline"
                    onClick={({ key }) => handleMenuClick(key)}
                    style={{ width: 256 }}
                    defaultOpenKeys={[`yearGroup`]}
                    selectedKeys={[`${params.year}`]}
                >
                    <Menu.Item key='vmpPlanImport' icon={<FileWordOutlined />}>Импорт графика</Menu.Item>
                    <Menu.Item key='vmpPlanPrint' icon={<PrinterOutlined />}>Печать графика</Menu.Item>
                    <Menu.Item key='vmpReportPrint' icon={<PrinterOutlined />}>Печать отчёта</Menu.Item>
                    <Menu.SubMenu key='yearGroup' title='Год графика' icon={<CalendarOutlined />}>
                        <Menu.Item key={currentYear - 1}>График на {currentYear - 1} год</Menu.Item>
                        <Menu.Item key={currentYear}>График на {currentYear} год</Menu.Item>
                        {currentDay > 15 && currentMonth === 12 && <Menu.Item key={currentYear + 1}>График на {currentYear + 1} год</Menu.Item>}
                    </Menu.SubMenu>
                </Menu>
            </Col>
            <Col span={19}>
                <Table
                    dataSource={data}
                    bordered
                    pagination={false}
                    title={() => <Text style={{ fontSize: '14pt' }}>График проведения валидационных работ {VMPName} на {params.year} г.</Text>}
                    size="small"
                    style={{ marginBottom: '100px' }}
                    
                >
                    <Column title={<Text>№</Text>} dataIndex='index' key="number" align="center" />
                    <Column
                        title={<Text>Наименование объекта</Text>}
                        dataIndex='name'
                        key="name"
                        width='35%'
                        render={(name, record: dataType) => <NavLink to={`/${record.tablename}/${record.idfromtable}`}>{name}</NavLink>}
                    />
                    <ColumnGroup title="Период проведения работ/трудозатраты чел/рабочих дней" align="center">
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
                        render={(codedoc: string, record: dataType) => record.vo ? record.vo !== '' && <><Text type={record.status === 'Выполнено' ? 'success' : undefined}>{codedoc}</Text><Button icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + record.vo} /></> : <Text type={record.status === 'Выполнено' ? 'success' : undefined}>{codedoc}</Text> }
                    />
                </Table>

                <Modal title="Печать графика ВМП" afterOpenChange={() => handleCancel('VMPPrint')} open={VMPPrintModalIsOpen} onCancel={() => handleCancel('VMPPrint')} footer={[ <Button key="close" onClick={() => handleCancel('VMPPrint')} type="primary">Закрыть</Button> ]} >
                    <iframe key={iframeKey} style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/vmp_print.php?tb=${params.number}&y=${params.year}`}>
                    </iframe>
                </Modal>
                <Modal title="Импорт графика ВМП" afterOpenChange={() => handleCancel('VMPImport')} open={VMPImportModalIsOpen} onCancel={() => handleCancel('VMPImport')} footer={[ <Button key="close" onClick={() => handleCancel('VMPImport')} type="primary">Закрыть</Button> ]} >
                    <iframe key={iframeKey} style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/vmp_print.php?tb=${params.number}&y=${params.year}&print`}>
                    </iframe>
                </Modal>
                <Modal title="Печать отчета о выполненных работах" afterOpenChange={() => handleCancel('VMPReportPrint')} open={vmpReportPrintModalIsOpen} onCancel={() => handleCancel('VMPReportPrint')} footer={[ <Button key="close" onClick={() => handleCancel('VMPReportPrint')} type="primary">Закрыть</Button> ]} >
                    <iframe key={iframeKey} style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/vmp_report_print.php?tb=${params.number}&y=${params.year}`}>
                    </iframe>
                </Modal>
            </Col>
        </Row>
    )
}