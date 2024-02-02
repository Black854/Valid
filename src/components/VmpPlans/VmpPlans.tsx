import { Button, Col, Menu, Modal, Row, message } from "antd"
import { PrinterOutlined, CalendarOutlined, FileWordOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getServerSelector, getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { useEffect, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { getVMPData, vmpActions } from "../../redux/Reducers/vmpReducer"
import { getVMPDataSelector, getVMPErrorMessage } from "../../redux/Selectors/vmpSelectors"
import { plansDataBuilder } from "./plansDataBuilder"
import { VmpTable } from "./VmpTable"

const VmpPlans: React.FC = () => {

    const [messageApi, contextHolder] = message.useMessage()

    const errorMessage = useSelector(getVMPErrorMessage)
    const server = useSelector(getServerSelector)

    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: 'error',
                content: errorMessage,
                duration: 7
            })
            dispatch(vmpActions.setVMPErrorMessage(null))
        }
    }, [errorMessage])

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

    const data: dataType[] = [...data1, ...data2].map((e, index) => ({ ...e, index: index + 1, key: index + 1 }))

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

    return <>
        {contextHolder}
        <Row style={{ marginTop: '10px' }}>
            <Col span={4}>
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
                <VmpTable VMPName={VMPName} data={data.filter(e => e.typeval === '1')} params={params} key={VMPName} tableType={1} />
                <VmpTable VMPName={VMPName} data={data.filter(e => e.typeval === '2' || e.typeval === '3')} params={params} key={VMPName} tableType={2} />

                <Modal title="Печать графика ВМП" afterOpenChange={() => handleCancel('VMPPrint')} open={VMPPrintModalIsOpen} onCancel={() => handleCancel('VMPPrint')} footer={[<Button key="close" onClick={() => handleCancel('VMPPrint')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '100%', height: '360px' }} src={`${server}api/printForms/vmp_print.php?tb=${params.number}&y=${params.year}`}>
                    </iframe>
                </Modal>
                <Modal title="Импорт графика ВМП" afterOpenChange={() => handleCancel('VMPImport')} open={VMPImportModalIsOpen} onCancel={() => handleCancel('VMPImport')} footer={[<Button key="close" onClick={() => handleCancel('VMPImport')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '100%', height: '360px' }} src={`${server}api/printForms/vmp_print.php?tb=${params.number}&y=${params.year}&print`}>
                    </iframe>
                </Modal>
                <Modal title="Печать отчета о выполненных работах" afterOpenChange={() => handleCancel('VMPReportPrint')} open={vmpReportPrintModalIsOpen} onCancel={() => handleCancel('VMPReportPrint')} footer={[<Button key="close" onClick={() => handleCancel('VMPReportPrint')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '100%', height: '360px' }} src={`${server}api/printForms/vmp_report_print.php?tb=${params.number}&y=${params.year}`}>
                    </iframe>
                </Modal>
            </Col>
        </Row>
    </>
}

export default VmpPlans