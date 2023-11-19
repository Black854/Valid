import { Button, Popconfirm } from "antd"
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux"
import { PlansType } from "../../../redux/Reducers/plansReducer"

type DeletePlansType = {
    month: string
    record: PlansType
}
export const DeletePlans: React.FC<DeletePlansType> = ({ record, month }) => {
    const dispatch = useDispatch()
    const handleDeletePlans = () => {
        // dispatch(deletePlans(record.id, record.idfromtable, record.tablename, month))
    }
    return (
        <Popconfirm
            title='Подтвердите удаление'
            description='Вы уверены, что хотите удалить объект из текущего плана работ?'
            okText='Да'
            cancelText='Нет'
            onConfirm={handleDeletePlans}
        >
            <Button danger type="link" icon={<DeleteOutlined style={{ fontSize: '14pt' }} />} disabled={record.status === 'Выполнено' || !record.name} />
        </Popconfirm>
    )
}