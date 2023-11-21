import React, { useEffect } from "react"
import {Link, NavLink, useLocation} from 'react-router-dom'
import { Col, Image, Menu, MenuProps, Row, Switch, Typography } from 'antd'
import { Header } from "antd/es/layout/layout"
import logo from './../../img/logo192.png'
import { useDispatch, useSelector } from "react-redux"
import { getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { getVMPDepartments } from "../../redux/Reducers/appReducer"
import { AppDispatch } from "../../redux/store"

const { Text } = Typography

type HeaderPropsType = {
    swithTheme: (checked: boolean) => void
    typeTheme: string
}

export const Header1: React.FC<HeaderPropsType> = ({swithTheme, typeTheme}) => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const VMPDepartments = useSelector(getVMPDepartmentsSelector)
    useEffect(() => {
        VMPDepartments.length === 0 && dispatch(getVMPDepartments())
    }, [])
    const currentYear = new Date().getFullYear()
    const filteredVMPDepartments = VMPDepartments.filter(e => e.isactive === '').map(e => ({key: `/vmp/${e.id}`, label: <Link to={`/vmp/${e.id}/${currentYear}`}>{e.menuname}</Link>}))
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
        {key: '1', label: 'Квалификация', children: [
            {key: '/work', label: <Link to='/work'>Рабочий лист</Link>},
            {key: '/monitoring', label: <Link to='/monitoring'>Мониторинг</Link>},
            {key: '/signal', label: <Link to='/signal'>Сигнальный лист</Link>},
            {key: '/premises', label: <Link to='/premises'>Помещения</Link>},
            {key: '/equipment', label: <NavLink to='/equipment'>Оборудование</NavLink>},
            {key: '/systems', label: <Link to='/systems'>Системы</Link>},
            {key: '/processes', label: <Link to='/processes'>Процессы</Link>},
            {key: '/instruments', label: <Link to='/instruments'>Инструменты</Link>}]
        },
        {key: '2', label: `Планы`, children: [
            {key: '/monplans', label: <Link to='/monplans'>План на месяц</Link>},
            {key: '/reports', label: <Link to='/reports'>Отчет за месяц</Link>},
            ...filteredVMPDepartments,
            {key: '/vacations', label: <Link to='/vacations'>График отпусков</Link>}]
        },
        {key: '/paperplanes', label: <Link to='/paperplanes'>Схемы</Link>},
        {key: '/docs', label: <Link to='/docs'>Документация</Link>}
    ]

    return <>
        <Header style={{margin: '0px', padding: '0px'}} >
            <Row>
                <Col span={1} style={{textAlign: 'center'}}>
                    <Image src={logo} style={{width: '40px', height: '40px', display: 'inline'}} preview={false} />
                </Col>
                <Col span={21}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[getPathnameWithoutTrailingSlash(location.pathname)]}
                        items={items}
                        style={{backgroundColor: 'none'}}
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'right', paddingRight: '10px'}}>
                    <Text type="warning">Тема  </Text>
                    <Switch checked={typeTheme === 'light'} onChange={swithTheme} checkedChildren="Темная" unCheckedChildren="Светлая"  />
                </Col>
            </Row>
        </Header>
    </>
}