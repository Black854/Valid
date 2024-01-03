import { useDispatch } from "react-redux"
import { Col, Row, Tabs, TabsProps, Typography } from "antd"
import { AppDispatch } from "../../redux/store"
import { Departments } from "./SettingsComponents/Departments"
import { VMPDepartments } from "./SettingsComponents/VMPDepartments"
import { CodeForms } from "./SettingsComponents/CodeForms"
import { EquipGroups } from "./SettingsComponents/EquipGroups"
import { PremModes } from "./SettingsComponents/PremModes"

const { Text, Title } = Typography


export const Settings: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Подразделения',
            children: <Departments />,
        },
        {
            key: '2',
            label: 'Мастер-планы',
            children: <VMPDepartments />,
        },
        {
            key: '3',
            label: 'Печатные формы',
            children: <CodeForms />,
        },
        {
            key: '4',
            label: 'Группы оборудования',
            children: <EquipGroups />,
        },
        {
            key: '5',
            label: 'Режимы помещений',
            children: <PremModes />,
        },
    ]

    return <>
        <Row style={{margin: '0 0 40px 0'}}>
            <Col push={1} span={22}>
                <Title level={3}>Настройки системы</Title>
                <Tabs
                    defaultActiveKey="2"
                    items={items}
                    indicatorSize={(origin) => origin - 16}
                    style={{ flex: 1 }}
                    type="card"
                    size="small"
                />
            </Col>
        </Row>
    </>
}