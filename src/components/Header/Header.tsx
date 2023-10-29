import React from "react"
import {Link, NavLink, useLocation} from 'react-router-dom'
import { Col, Menu, MenuProps, Row, Switch } from 'antd'
import { Header } from "antd/es/layout/layout"

type HeaderPropsType = {
    swithTheme: (checked: boolean) => void
    typeTheme: string
}

export const Header1: React.FC<HeaderPropsType> = ({swithTheme, typeTheme}) => {
    const location = useLocation()

    const getPathnameWithoutTrailingSlash = (pathname: string) => {
        if (pathname.includes("/equipment")) {
            return "/equipment"
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
            {key: '/vmpl', label: <Link to='/vmpl'>График ВМП ЦС</Link>},
            {key: '/vmp2', label: <Link to='/vmp2'>График ВМП ОКК</Link>},
            {key: '/vmp3', label: <Link to='/vmp3'>График ВМП ЛИП</Link>},
            {key: '/vacations', label: <Link to='/vacations'>График отпусков</Link>}]
        },
        {key: '/paperplanes', label: <Link to='/paperplanes'>Схемы</Link>},
        {key: '/docs', label: <Link to='/docs'>Документация</Link>}
    ]

    return <>
        <Header >
            <Row>
                <Col span={22}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[getPathnameWithoutTrailingSlash(location.pathname)]}
                        items={items}
                        style={{backgroundColor: 'none'}}
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'right'}}>
                    <Switch checked={typeTheme === 'dark'} onChange={swithTheme} />
                </Col>
            </Row>
        </Header>
    </>
}