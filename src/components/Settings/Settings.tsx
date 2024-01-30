import { Col, Row, Tabs, TabsProps, Typography } from "antd"
import { Departments } from "./SettingsComponents/Departments"
import { VMPDepartments } from "./SettingsComponents/VMPDepartments"
import { CodeForms } from "./SettingsComponents/CodeForms"
import { EquipGroups } from "./SettingsComponents/EquipGroups"
import { PremModes } from "./SettingsComponents/PremModes"
import { useSelector } from "react-redux"
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"
import { OtherSettings } from "./SettingsComponents/OtherSettings"

const { Title } = Typography

const Settings: React.FC = () => {
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Подразделения и ответственные',
            children: <Departments access={access} />,
        },
        {
            key: '2',
            label: 'Графики ВМП',
            children: <VMPDepartments access={access} />,
        },
        {
            key: '3',
            label: 'Кодировки печатных форм',
            children: <CodeForms access={access} />,
        },
        {
            key: '4',
            label: 'Группы оборудования',
            children: <EquipGroups access={access} />,
        },
        {
            key: '5',
            label: 'Климатические режимы',
            children: <PremModes access={access} />,
        },
        {
            key: '6',
            label: 'Прочее',
            children: <OtherSettings access={access} />,
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