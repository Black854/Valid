import { Table, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTechInfo } from "../../../../redux/Selectors/equipmentSelectors"
import { getTechnicalInfo, updateTechnicalInfo } from "../../../../redux/Reducers/equipmentReducer"
import { AppDispatch } from "../../../../redux/store"
const {Text} = Typography
type TechnicalInfoPropsType = {
    id: string
}

export const TechnicalInfo: React.FC<TechnicalInfoPropsType> = ({ id }) => {
    const dispatch: AppDispatch= useDispatch()
    const techInfo = useSelector(getTechInfo)
    useEffect (() => {
        dispatch(getTechnicalInfo(id))
    }, [])

    const updateTechInfo = (text: string) => {
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
                                                    <Text type='warning' editable={{onChange: (text: string) => updateTechInfo(text), text: ''}} style={{fontSize: '12pt'}} >Нет данных</Text>,
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={false} // Скрыть пагинацию, если есть
            showHeader={false} // Скрыть заголовки, если есть
            rowKey='value'
        />
    )
}