import React, { useEffect } from "react"
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Image, Menu, MenuProps, Row, Space, Typography } from 'antd'
import { Header } from "antd/es/layout/layout"
import logo from './../../img/logo192.png'
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { getVMPDepartments } from "../../redux/Reducers/appReducer"
import { AppDispatch } from "../../redux/store"
import { getAuthUserNameSelector, getIsAuthSelector } from "../../redux/Selectors/authSelectors"
import { logout } from "../../redux/Reducers/authReducer"
import { LogoutOutlined } from "@ant-design/icons"
import darkIcon from './../../img/dark.png'

const { Text } = Typography

type HeaderPropsType = {
    swithTheme: (checked: boolean) => void
    typeTheme: string
}

export const Header1: React.FC<HeaderPropsType> = ({ swithTheme, typeTheme }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    const isAuth = useSelector(getIsAuthSelector)
    const userName = useSelector(getAuthUserNameSelector)
    useEffect(() => {
        VMPDepartments.length === 0 && dispatch(getVMPDepartments())
    }, [])
    const currentYear = new Date().getFullYear()
    const filteredVMPDepartments = VMPDepartments.filter(e => e.isactive === '').map(e => ({ key: `/vmp/${e.id}`, label: <Link to={`/vmp/${e.id}/${currentYear}`}>{e.menuname}</Link> }))
    const vmpTables = VMPDepartments.filter(e => e.isactive === '').map(e => "/vmp/" + e.id)

    const getPathnameWithoutTrailingSlash = (pathname: string) => {
        if (pathname.includes("/equipment")) {
            return "/equipment"
        } else if (pathname.includes("/premises")) {
            return "/premises"
        } else if (pathname.includes("/systems")) {
            return "/systems"
        } else if (pathname.includes("/processes")) {
            return "/processes"
        } else if (pathname.includes("/instruments")) {
            return "/instruments"
        } else if (pathname.includes("/monplans")) {
            return "/monplans"
        } else if (pathname.includes("/reports")) {
            return "/reports"
        }

        for (const table of vmpTables) {
            if (pathname.includes(table)) {
                return table
            }
        }
        return pathname
    }

    const items: MenuProps['items'] = [
        {
            key: '1', label: 'Квалификация', children: [
                { key: '/work', label: <Link to='/work'>Мои задачи</Link> },
                { key: '/monitoring', label: <Link to='/monitoring'>Все задачи</Link> },
                { key: '/signal', label: <Link to='/signal'>Сигнальный лист</Link> },
                { key: '/premises', label: <Link to='/premises'>Помещения</Link> },
                { key: '/equipment', label: <NavLink to='/equipment'>Оборудование</NavLink> },
                { key: '/systems', label: <Link to='/systems'>Системы</Link> },
                { key: '/processes', label: <Link to='/processes'>Процессы</Link> },
                { key: '/instruments', label: <Link to='/instruments'>Приборы</Link> }]
        },
        {
            key: '2', label: `Планы`, children: [
                { key: '/monplans', label: <Link to='/monplans'>План на месяц</Link> },
                { key: '/reports', label: <Link to='/reports'>Отчет за месяц</Link> },
                ...filteredVMPDepartments,
                { key: '/vacations', label: <Link to='/vacations'>График отпусков</Link> }]
        },
        { key: '/paperplanes', label: <Link to='/paperplanes'>Схемы</Link> },
        { key: '/docs', label: <Link to='/docs'>Документация</Link> }
    ]
    { !isAuth && location.pathname !== '/login' && navigate('/login') }
    const handleLogout = () => {
        dispatch(logout())
    }
    return isAuth ? <>
        <Header style={{ margin: '0px', padding: '0px' }} >
            <Row>
                <Col style={{ textAlign: 'center' }} xs={4} sm={3} md={2} lg={2} xl={1} xxl={1}>
                    <Link to="/work">
                        <Image src={logo} style={{ width: '40px', height: '40px', display: 'inline' }} preview={false} />
                    </Link>
                </Col>
                <Col xs={10} sm={15} md={15} lg={16} xl={18} xxl={18}>
                    {isAuth &&
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[getPathnameWithoutTrailingSlash(location.pathname)]}
                            items={items}
                            style={{ backgroundColor: 'none' }}
                        />
                    }
                </Col>
                <Col style={{ textAlign: 'right', paddingRight: '10px' }} xs={4} sm={3} md={6} lg={5} xl={4} xxl={4}>
                    <Text style={{ color: 'gold', fontSize: '12pt' }}>{userName}</Text>
                    <Button type="link" icon={<LogoutOutlined />} onClick={handleLogout}>Выход</Button>
                </Col>
                <Col style={{ textAlign: 'right', paddingRight: '10px' }} xs={10} sm={6} md={1} lg={1} xl={1} xxl={1}>
                    <Button shape="circle" onClick={() => swithTheme(typeTheme === 'dark' ? true : false)} type={typeTheme === 'dark' ? 'primary' : 'link'} icon={<Image width={20} preview={false} src={darkIcon} />} />
                </Col>
            </Row>
        </Header>
    </> : <></>
}