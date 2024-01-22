import { Col, Row, Tabs, TabsProps, Typography } from "antd"
import { Departments } from "./SettingsComponents/Departments"
import { VMPDepartments } from "./SettingsComponents/VMPDepartments"
import { CodeForms } from "./SettingsComponents/CodeForms"
import { EquipGroups } from "./SettingsComponents/EquipGroups"
import { PremModes } from "./SettingsComponents/PremModes"

const { Title } = Typography


const Settings: React.FC = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Подразделения и ответственные',
            children: <Departments />,
        },
        {
            key: '2',
            label: 'Графики ВМП',
            children: <VMPDepartments />,
        },
        {
            key: '3',
            label: 'Кодировки печатных форм',
            children: <CodeForms />,
        },
        {
            key: '4',
            label: 'Группы оборудования',
            children: <EquipGroups />,
        },
        {
            key: '5',
            label: 'Климатические режимы',
            children: <PremModes />,
        },
    ]

    return <>
        <Row style={{margin: '0 0 40px 0'}}>
            <Col push={1} span={22}>
                <Title level={3}>Настройки системы</Title>
                <Tabs
                    defaultActiveKey="1"
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

export default Settings