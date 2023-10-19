import React from "react"
import {Link, useLocation} from 'react-router-dom'
import { Layout, Menu, MenuProps, theme } from 'antd'
const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Header1: React.FC = () => {
    let location = useLocation()

    const getPathnameWithoutTrailingSlash = (pathname: string) => {
        if (pathname.includes("/profile")) {
            return "/profile"
        }
        if (pathname.includes("/dialogs")) {
            return "/dialogs"
        } 
        return pathname
    }


    const items: MenuProps['items'] = [
    {key: '1', label: 'Квалификация', children: [
        {key: '/work', label: <Link to='/work'>Рабочий лист</Link>},
        {key: '/monitoring', label: <Link to='/monitoring'>Мониторинг</Link>},
        {key: '/signal', label: <Link to='/signal'>Сигнальный лист</Link>},
        {key: '/premises', label: <Link to='/premises'>Помещения</Link>},
        {key: '/equipment', label: <Link to='/equipment'>Оборудование</Link>},
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
        <Header style={{ alignItems: 'center' }}>
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[getPathnameWithoutTrailingSlash(location.pathname)]}
                items={items}
            />
        </Header>
    </>
}

export default Header1