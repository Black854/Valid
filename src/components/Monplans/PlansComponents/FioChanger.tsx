import { Popconfirm, Select } from "antd"
import { useState } from "react"
import { AppDispatch } from "../../../redux/store"
import { useDispatch } from "react-redux"
import { updatePlansFio } from "../../../redux/Reducers/plansReducer"

type FioChangerType = {
    fio: string
    record: any
    date: string
    allValidatorsFio: any
    access: number
}

export const FioChanger: React.FC<FioChangerType> = ({ fio, record, date, allValidatorsFio, access }) => {

    const [visible, setVisible] = useState(false)
    const [handleFio, setFio] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const handleUpdateFio = (fio: string, objectId: string, tableName: string, recordId: string, month: string) => {
        dispatch(updatePlansFio(fio, objectId, tableName, recordId, month))
        setVisible(false)
    }

    const handleUpdateConfirmation = () => {
        handleUpdateFio(handleFio, record.idfromtable, record.tablename, record.id, date)
    }
    const handleSelectChange = (fio: string) => {
        setFio(fio)
        setVisible(true)
    }
    return (<>
        <Select
            dropdownStyle={{ width: 'auto' }}
            value={fio}
            size="small"
            onChange={handleSelectChange}
            bordered={true}
            options={allValidatorsFio}
            disabled={record.status === 'Выполнено' || !record.name || access > 1}
        // loading={isVMPDepartmentLoading}
        />
        <Popconfirm
            title='Подтвердите изменение'
            description='Вы уверены, что хотите изменить ответственного?'
            okText='Да'
            cancelText='Нет'
            onConfirm={handleUpdateConfirmation}
            open={visible}
            onCancel={() => setVisible(false)}
        />
    </>)
}