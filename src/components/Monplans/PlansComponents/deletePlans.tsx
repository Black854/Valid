import { Button, Popconfirm } from "antd"
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux"
import { PlansType, deletePlans } from "../../../redux/Reducers/plansReducer"
import { AppDispatch } from "../../../redux/store"

type DeletePlansType = {
    month: string
    record: PlansType
    access: number
}
export const DeletePlans: React.FC<DeletePlansType> = ({ record, month, access }) => {
    const dispatch: AppDispatch = useDispatch()
    const handleDeletePlans = () => {
        dispatch(deletePlans(record.id, record.idfromtable, record.tablename, month))
    }
    return (
        <Popconfirm
            title='Подтвердите удаление'
            description='Вы уверены, что хотите удалить объект из текущего плана работ?'
            okText='Да'
            cancelText='Нет'
            onConfirm={handleDeletePlans}
        >
            <Button danger type="link" icon={<DeleteOutlined style={{ fontSize: '14pt' }} />} disabled={record.status === 'Выполнено' || !record.name || access > 1} />
        </Popconfirm>
    )
}