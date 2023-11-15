import { Col, Menu, MenuProps, Row } from "antd"
import { AppstoreOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type Monplans = {

}

type MenuItem = Required<MenuProps>['items'][number]
interface MenuKeyToURL {
  [key: string]: string;
}
export const Monplans: React.FC<Monplans> = ({}) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  let date = month+'.'+year
  if (!params.year && !params.month) {
    const year = params.year
    const month = params.month?.toString().padStart(2, '0')
    date = month+'.'+year
  }
  const handleMenuClick = (key: string) => {
    const menuKeyToURL: MenuKeyToURL  = {
      g1: '/monplans/2023/01',
      g2: '/monplans/2023/02',
      g3: '/monplans/2023/03',
      g4: '/monplans/2023/04',
      g5: '/monplans/2023/05',
      g6: '/monplans/2023/06',
      g7: '/monplans/2023/07',
      g8: '/monplans/2023/08',
      g9: '/monplans/2023/09',
      g10: '/monplans/2023/10',
      g11: '/monplans/2023/11',
      g12: '/monplans/2023/12',
    }

    const url = menuKeyToURL[key]
    if (url) {
      navigate(url)
    }
  }
  // dispatch(getPlans(date))
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
    } as MenuItem;
  }
      
  const items: MenuProps['items'] = [      
    getItem('Печать плана', 'print', <PrinterOutlined />),
    { type: 'divider' },
    getItem('Планы на 2023 год', 'plans', null, [
      getItem('Январь 2023', 'g1'),
      getItem('Февраль 2023', 'g2'),
      getItem('Март 2023', 'g3'),
      getItem('Апрель 2023', 'g4'),
      getItem('Май 2023', 'g5'),
      getItem('Июнь 2023', 'g6'),
      getItem('Июль 2023', 'g7'),
      getItem('Август 2023', 'g8'),
      getItem('Сентябрь 2023', 'g9'),
      getItem('Октябрь 2023', 'g10'),
      getItem('Ноябрь 2023', 'g11'),
      getItem('Декабрь 2023', 'g12')
    ]),

    { type: 'divider' }
  ]
  return (
      <Row>
          <Col>
              <Menu
                  onClick={({ key }) => handleMenuClick(key)}
                  style={{ width: 256 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['plans']}
                  mode="inline"
                  items={items}
              />
          </Col>
      </Row>
  )
}