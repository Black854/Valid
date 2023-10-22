import { Table, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTechInfo } from "../../../../redux/equipmentSelectors"
import { getTechnicalInfo, updateTechnicalInfo } from "../../../../redux/equipmentReducer"
const {Text} = Typography
type TechnicalInfoPropsType = {
    id: string
}

const TechnicalInfo: React.FC<TechnicalInfoPropsType> = ({ id }) => {
    const dispatch = useDispatch()
    const techInfo = useSelector(getTechInfo)
    useEffect (() => {
        //@ts-ignore
        dispatch(getTechnicalInfo(id))
    }, [])

    const updateTechInfo = (text: string) => {
        //@ts-ignore
        dispatch(updateTechnicalInfo(id, text))
    }

    const data = [
        {
            value: techInfo
        }           
    ]

    const columns = [
        {
          dataIndex: 'value',
          render: (value: string) => value != '' ? <Text editable={{onChange: (text: string) => updateTechInfo(text)}} style={{fontSize: '12pt'}}>{value}</Text> :
                                                    <Text type='danger' editable={{onChange: (text: string) => updateTechInfo(text), text: ''}} style={{fontSize: '12pt'}} >Нет данных</Text>,
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => <Text style={{fontSize: '14pt', color: '#4096ff'}}>Техническая информация</Text>}
            pagination={false} // Скрыть пагинацию, если есть
            showHeader={false} // Скрыть заголовки, если есть
            rowKey='value'
        />
    )
}

export default TechnicalInfo