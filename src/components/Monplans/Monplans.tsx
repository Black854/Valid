import { Col, DatePicker, Image, Menu, MenuProps, Popconfirm, Row, Select, Table, Typography } from "antd"
import { PrinterOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { useEffect } from "react"
import { PlansType, getMonthList, getPlans, MonthListItem, updatePlansDates } from "../../redux/Reducers/plansReducer"
import { getMonthListSelector, getPlansSelector } from "../../redux/Selectors/plansSelectors"
import { ColumnsType } from "antd/es/table"
import empty from './../../img/empty.png'
import { getAllValidatorsSelector } from "../../redux/Selectors/appSelectors"
import { getAllValidators } from "../../redux/Reducers/appReducer"
import { FioChanger } from "./PlansComponents/FioChanger"
import { DocChanger } from "./PlansComponents/DocChanger"
import 'dayjs/locale/ru'
import { datePickerLocale } from './../common/datePickerLocale'
import dayjs from 'dayjs'
import { DateChanger } from "./PlansComponents/Datechanger"

const { Text } = Typography

type MenuItem = Required<MenuProps>['items'][number]

export const Monplans: React.FC = ({}) => {
  const dispatch: AppDispatch = useDispatch()
  const monthList = useSelector(getMonthListSelector)
  const allValidators = useSelector(getAllValidatorsSelector)
  const emptyFioObject = [{ value: '', label: <Text type="warning">Не указано</Text>}]
  const allValidatorsFio = [...emptyFioObject, ...allValidators.map(e => ({ value: e.fio, label: e.fio }))]
  const params = useParams()
  const navigate = useNavigate()
  let year: string 
  let month: string 
  let date: string

  if (params.year && params.month) {
    year = params.year
    month = params.month?.toString().padStart(2, '0')
  } else {
    const currentDate = new Date()
    year = currentDate.getFullYear().toString()
    month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  }
  date = month+'.'+year
  useEffect(() => {
    dispatch(getMonthList())
    dispatch(getPlans(date))
  }, [params.year, params.month])

  useEffect(() => {
    dispatch(getAllValidators())
  }, [])
  const handleMenuClick = (key: string) => {
    const year = key.slice(7, 11)
    const monthNumber = key.slice(11, 13).padStart(2, '0')
    const url = `/monplans/${year}/${monthNumber}`
    navigate(url)
  }

  let data = useSelector(getPlansSelector)
  data = [...data].sort((a, b) => a.name?.localeCompare(b.name))
  data = [...data].sort((a, b) => a.sp?.localeCompare(b.sp))
  data = data.map((item, index) => ({
    ...item,
    index: index + 1,
    key: index + 1
  }))

  const columns: ColumnsType<PlansType> = [
    {
      title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
      align: 'center',
      dataIndex: 'index'
    },
    {
      title: <Text strong style={{fontSize: '12pt'}}>СП ВМП</Text>,
      dataIndex: 'sp',
      sorter: (a, b) => a.sp.localeCompare(b.sp),
      sortDirections: ['ascend', 'descend'],
      width: '7%',
      align: 'center',
    },
    {
      title: <Text strong style={{fontSize: '12pt'}}>Планируемый объем работ</Text>,
      dataIndex: 'name',
      render: (text, record) => (
        <Row>
          <Col span={1}>
            <Image style={{
              maxWidth: '30px',
              maxHeight: '30px',
              borderRadius: '3px',
              overflow: 'hidden'}}
              src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
              preview = {{mask: <EyeOutlined style={{fontSize: '12pt'}} />}}
            />
          </Col>
          <Col span={23}>
            <NavLink
              to={`/${record.tablename}/${record.idfromtable}`}
              style={{fontSize: '12pt', marginLeft: '10px'}}
              >
                {text ? record.tablename === 'premises' ? record.class === 'Складские' ? `Помещение ${record.nomer} «${record.name}»` : text : text : <Text type="danger">Объект больше не существует, т.к. был удалён</Text>}
            </NavLink>
          </Col>  
        </Row>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: <Text strong style={{fontSize: '12pt'}}>Сроки</Text>,
      dataIndex: 'date',
      render: (startObjectDate, record) => {

        return <DateChanger record={record} startDate={startObjectDate} date={date} />
      },
      align: 'center'
    },
    {
      title: <Text strong style={{fontSize: '12pt'}}>Ответственный</Text>,
      dataIndex: 'fio',
      render: (fio, record) => <FioChanger allValidatorsFio={allValidatorsFio} date={date} fio={fio} record={record} key={record.id} />,
      width: '10%',
      align: 'center'
    },
    {
      title: <Text strong style={{fontSize: '12pt'}}>Результат</Text>,
      dataIndex: 'doc',
      render: (doc, record) => <DocChanger date={date} doc={doc} record={record} key={record.id} />,
      sorter: (a, b) => a.doc.localeCompare(b.doc),
      sortDirections: ['ascend', 'descend'],
      width: '12%',
      align: 'center',
    },
  ]

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem
  }

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  if (monthList.length > 0) {
    const getMonthName = (monthNumber: number) => {
    return months[monthNumber - 1] // -1 потому что массивы начинаются с индекса 0
    }
    const generateMenuItems = (monthsByYear: Record<string, MonthListItem[]>) => {
      return Object.entries(monthsByYear).map(([year, months]) => {
        const yearSubMenu: MenuItem = {
          key: `group-${year}`,
          label: `Планы за ${year} год`,
          type: 'group',
          children: months.map((month, index) => {
            const { month: monthStr } = month
            const monthYear = monthStr.split('.')
            return getItem(
              `${getMonthName(Number(monthYear[0]))} ${monthYear[1]}`,
              `g${index + 1}`
            )
          }),
        }
        return yearSubMenu
      })
    }
    const monthsByYear: Record<string, MonthListItem[]> = {}
    monthList.forEach((item) => {
      const { month } = item;
      const monthYear = month.split('.');
      const year = monthYear[1];

      if (!monthsByYear[year]) {
        monthsByYear[year] = [];
      }
      monthsByYear[year].push(item);
    })

    const dynamicItems = generateMenuItems(monthsByYear);

    const items: MenuProps['items'] = [
      getItem('Печать плана', 'print', <PrinterOutlined />),
      { type: 'divider' },
      ...dynamicItems,
      { type: 'divider' }
    ]

    return (
      <Row style={{marginTop: '10px'}}>
        <Col span={4}>
        <Menu
            mode="inline"
            onClick={({ key }) => handleMenuClick(key)}
            style={{ width: 256 }}
            selectedKeys={[`ggroup-${year}${month}`]}
            defaultOpenKeys={[`group-${year}`]}
          >
            {items.map((menuItem, index) => {
              if (!menuItem) {
                return null
              }
              if ('type' in menuItem) {
                if (menuItem.type === 'group' && menuItem.children) {
                  return (
                    <Menu.SubMenu key={menuItem.key} title={menuItem.label} icon={<CalendarOutlined />}>
                      {menuItem.children.map((child) => {
                        let matchedMonthIndex: number = 0
                        if (child && 'label' in child) {
                          matchedMonthIndex = months.findIndex(month => child.label?.toString().includes(month))
                        }
                        return child && 'label' in child && (
                          <Menu.Item key={`g${menuItem.key}${(matchedMonthIndex + 1).toString().padStart(2, '0')}`} icon={<EyeOutlined />}>{child.label}</Menu.Item>
                        )
                        })}
                    </Menu.SubMenu>
                  );
                } else if (menuItem.type === 'divider') {
                  return <Menu.Divider key={`divider-${index}`}/>
                } else if ('label' in menuItem) {
                  return <Menu.Item key={`item-${menuItem.key}`} icon={<PrinterOutlined />}>{menuItem.label}</Menu.Item>
                }
              }
              return null
            })}
          </Menu>
        </Col>
        <Col span={19}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={{defaultPageSize: 50}}
            title={() => <Text style={{fontSize: '14pt'}}>План работ на {date} (всего: {data.length})</Text>}
            size="small"
            style={{marginBottom: '60px'}}
          /> 
        </Col>
      </Row>
    )
  } else {
    return <>Здесь пусто, потому что мы не нашли никаких планов. Наверное вы видите свежеустановленную программу</>
  }
}