import { Col, Menu, Row, Typography } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { EquipPlacement } from "./EquipPlacement"
import { UserActions } from "./UserActions"
import { UserAccountsActions } from "./UserAccountsActions"
import { ObjectsWithoutAvatars } from "./ObjectsWithoutAvatar"

const { Text, Title } = Typography

const Prints: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()

    const handleMenuClick = (param: string) => {
        navigate(`/prints/${param}/`)
    }

    const [key, setKey] = useState(['r1'] as string[])

    useEffect(() => {
        if (params) {
            setKey(params.report ? [params.report] : ['r1'])
        } else {
            setKey(['r1'])
        }
    }, [params])

    return <Row style={{ margin: '0px 0 40px 0' }}>
        <Col style={{ marginTop: '10px' }}>
            <Menu
                mode="inline"
                onClick={({ key }) => handleMenuClick(key)}
                style={{ width: 320 }}
                selectedKeys={[`${params.report ? params.report : 'r1'}`]}
            >
                <Menu.Item key='r1'>Отчет о местонахождении оборудования</Menu.Item>
                <Menu.Item key='r4'>Отчет по объектам без аватара</Menu.Item>
                <Menu.Item key='r2'>Аудит пользовательских операций</Menu.Item>
                <Menu.Item key='r3'>Аудит учетных записей</Menu.Item>
            </Menu>
        </Col>
        <Col span={18} push={1}>
            {params.report ? (params.report === null || params.report === 'r1') && <EquipPlacement /> : <EquipPlacement />}
            {params.report && params.report === 'r2' && <UserActions /> }
            {params.report && params.report === 'r3' && <UserAccountsActions /> }
            {params.report && params.report === 'r4' && <ObjectsWithoutAvatars /> }
        </Col>
    </Row>
}

export default Prints