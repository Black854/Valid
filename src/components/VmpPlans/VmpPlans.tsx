import { Col, Menu, MenuProps, Modal, Row, Table, Typography, message } from "antd"
import { PrinterOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { getVMPData } from "../../redux/Reducers/vmpReducer"
const { Text } = Typography

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
    console.log(tableName)
    useEffect(() => {
        if (tableName && params.year) {
            dispatch(getVMPData(tableName, params.year))
        }
    }, [tableName,  params.year])

    const handleMenuClick = (key: string) => {
        const year = key.slice(7, 11)
        const monthNumber = key.slice(11, 13).padStart(2, '0')
        if (key === 'vmpPlanPrint') {
            // const url = `/reports/${year}/${monthNumber}`
            // navigate(url)
            // setModalOpen(true)
            // setIframeKey(prevKey => prevKey + 1)
        } else if (key === 'vmpReportPrint') {

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
                    <Menu.Item key='vmpPlanPrint' icon={<PrinterOutlined />}>Печать плана</Menu.Item>
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
                    //   columns={columns}
                    //   dataSource={data}
                    bordered
                    pagination={false}
                    title={() => <Text style={{ fontSize: '14pt' }}>График проведения валидационных работ {VMPName} на {params.year} г.</Text>}
                    size="small"
                    style={{ marginBottom: '100px' }}
                />
                {/* <Modal open={modalOpen} centered onCancel={() => setModalOpen(false)} afterOpenChange={() => setModalOpen(false)}>
              <iframe width={450} height={700} key={iframeKey} src={`http://10.85.10.212/ov/api/printForms/report_print.php?y_old=${year}&m_old=${month}`}></iframe>
            </Modal> */}
            </Col>
        </Row>
    )
}