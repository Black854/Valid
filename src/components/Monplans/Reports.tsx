import { Col, Image, Menu, MenuProps, Modal, Row, Table, Typography, message } from "antd"
import { PrinterOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { useEffect, useState } from "react"
import { PlansType, getMonthList, getPlans, MonthListItem, updateReportStatus, plansActions } from "../../redux/Reducers/plansReducer"
import { getMonthListSelector, getPlansError, getPlansSelector } from "../../redux/Selectors/plansSelectors"
import { ColumnsType } from "antd/es/table"
import empty from './../../img/empty.png'
import { getAllValidators } from "../../redux/Reducers/appReducer"
import 'dayjs/locale/ru'

const { Text } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const Reports: React.FC = ({ }) => {
  const dispatch: AppDispatch = useDispatch()
  const monthList = useSelector(getMonthListSelector)
  const [modalOpen, setModalOpen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
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
  date = month + '.' + year
  useEffect(() => {
    dispatch(getMonthList())
    dispatch(getPlans(date))
  }, [params.year, params.month])

  useEffect(() => {
    dispatch(getAllValidators())
  }, [])

  const errorMessage = useSelector(getPlansError)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (errorMessage) {
      messageApi.open({
          type: 'error',
          content: errorMessage,
          duration: 7
      })
      dispatch(plansActions.setPlansErrorMessage(null))
    }
  }, [errorMessage])

  const error = (errorText: string) => {
    messageApi.open({
      type: 'warning',
      content: errorText,
      duration: 7
    })
  }

  const handleMenuClick = (key: string) => {
    const year = key.slice(7, 11)
    const monthNumber = key.slice(11, 13).padStart(2, '0')
    if (key !== 'item-print') {
      const url = `/reports/${year}/${monthNumber}`
      navigate(url)
    } else {
      setModalOpen(true)
      setIframeKey(prevKey => prevKey + 1)
    }
  }

  const handleUpdateReportStatus = (text: string, record: PlansType) => {
    if (text === '') {
      error('Текст статуса не может быть пустым')
    } else if (text.includes('Выполнено') || text.includes('выполнено')) {
      error('Нельзя установить статус «Выполнено» таким образом. Статус «Выполнено» устанавливается при завершении задачи.')
    } else if (text !== record.status) {
      dispatch(updateReportStatus(text, record.idfromtable, record.tablename, record.id, `${month}.${year}`))
    }
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
      title: <Text strong style={{ fontSize: '12pt' }}>№</Text>,
      align: 'center',
      dataIndex: 'index'
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>ВМП</Text>,
      dataIndex: 'sp',
      sorter: (a, b) => a.sp.localeCompare(b.sp),
      sortDirections: ['ascend', 'descend'],
      width: '5%',
      align: 'center',
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Планируемый объем работ</Text>,
      dataIndex: 'name',
      render: (text, record) => (
        <Row>
          <Col span={1}>
            <Image style={{
              maxWidth: '30px',
              maxHeight: '30px',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
              src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
              preview={{ mask: <EyeOutlined style={{ fontSize: '12pt' }} /> }}
            />
          </Col>
          <Col span={23}>
            <NavLink
              to={`/${record.tablename}/${record.idfromtable}`}
              style={{ fontSize: '12pt', marginLeft: '10px' }}
            >
              {text ? record.tablename === 'premises' ? record.class === 'Складские' ? `Помещение ${record.nomer} «${record.name}»` : text : text : <Text type="warning">Объект больше не существует, т.к. был удалён</Text>}
            </NavLink>
          </Col>
        </Row>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Сроки</Text>,
      dataIndex: 'date',
      render: (startObjectDate, record) => startObjectDate ? record.date2 ? <Text type={record.status === 'Выполнено' ? "success" : "warning"}>{startObjectDate} - {record.date2}</Text> :
        <Text type={record.status === 'Выполнено' ? "success" : "warning"}>{startObjectDate}</Text> : <Text type="warning">Не указаны</Text>,
      align: 'center'
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Ответственный</Text>,
      dataIndex: 'fio',
      render: (fio, record) => fio ? <Text type={record.status === 'Выполнено' ? "success" : "warning"}>{fio}</Text> : <Text type="warning">Не указано</Text>,
      width: '10%',
      align: 'center'
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Результат</Text>,
      dataIndex: 'doc',
      render: (doc, record) => doc ? <Text type={record.status === 'Выполнено' ? "success" : "warning"}>{doc}</Text> : <Text type="warning">Не указано</Text>,
      sorter: (a, b) => a.doc.localeCompare(b.doc),
      sortDirections: ['ascend', 'descend'],
      width: '12%',
      align: 'center',
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Статус</Text>,
      dataIndex: 'status',
      render: (status, record) => status === 'Выполнено' ? <Text type='success'>{status}</Text> :
        <Text type='warning' editable={{ onChange: (text) => handleUpdateReportStatus(text, record) }}>{status}</Text>,
      width: '10%',
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
          label: `Отчёты за ${year} год`,
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
      const { month } = item
      const monthYear = month.split('.')
      const year = monthYear[1]

      if (!monthsByYear[year]) {
        monthsByYear[year] = []
      }
      monthsByYear[year].push(item)
    })

    const dynamicItems = generateMenuItems(monthsByYear)

    const items: MenuProps['items'] = [
      getItem('Печать отчёта', 'print', <PrinterOutlined />),
      { type: 'divider' },
      ...dynamicItems,
      { type: 'divider' }
    ]

    return (
      <Row style={{ marginTop: '10px', marginBottom: '80px' }}>
        <Col span={4}>
          {contextHolder}
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
                          <Menu.Item key={`g${menuItem.key}${(matchedMonthIndex + 1).toString().padStart(2, '0')}`}>{child.label}</Menu.Item>
                        )
                      })}
                    </Menu.SubMenu>
                  )
                } else if (menuItem.type === 'divider') {
                  return <Menu.Divider key={`divider-${index}`} />
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
            pagination={false}
            title={() => <Text style={{ fontSize: '14pt' }}>Отчёт о проведенных работах за {date} (всего: {data.length})</Text>}
            size="small"
            style={{ marginBottom: '100px' }}
          />
          <Modal open={modalOpen} centered onCancel={() => setModalOpen(false)} afterOpenChange={() => setModalOpen(false)}>
            <iframe width={450} height={700} key={iframeKey} src={`http://10.85.10.212/ov/api/printForms/report_print.php?y_old=${year}&m_old=${month}`}></iframe>
          </Modal>
        </Col>
      </Row>
    )
  } else {
    return <>Здесь пусто, потому что мы не нашли никаких отчётов. Наверное, вы используете свежеустановленную программу</>
  }
}

export default Reports