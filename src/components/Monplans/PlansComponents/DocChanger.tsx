import { Popconfirm, Select } from "antd"
import { useState } from "react"
import { AppDispatch } from "../../../redux/store"
import { useDispatch } from "react-redux"
import { updatePlansDoc } from "../../../redux/Reducers/plansReducer"

type FioChangerType = {
    doc: string
    record: any
    date: string
}

export const DocChanger: React.FC<FioChangerType> = ({doc, record, date}) => {
    const options = [{value: 'Отчет по квалификации', label: 'Отчет по квалификации'}, {value: 'Отчет о периодической оценке', label: 'Отчет о периодической оценке'}]
    const [visible, setVisible] = useState(false)
    const [handleDoc, setDoc] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const handleUpdateDoc = (doc: string, objectId: string, tableName: string, recordId: string, month: string) => {
        dispatch(updatePlansDoc(doc, objectId, tableName, recordId, month))
        setVisible(false)
    }

    const handleUpdateConfirmation = () => {
        handleUpdateDoc(handleDoc, record.idfromtable, record.tablename, record.id, date)
    }
    const handleSelectChange = (doc: string) => {
        setDoc(doc)
        setVisible(true)
    }
    return (<>
        <Select
          dropdownStyle={{width: 'auto'}}
          value={doc}
          size="small"
          onChange={handleSelectChange}
          bordered={true}
          options={options}
          disabled={record.status === 'Выполнено'}
        />
        <Popconfirm
          title='Подтвердите изменение'
          description='Вы уверены, что хотите изменить тип проводимых работ?'
          okText='Да'
          cancelText='Нет'
          onConfirm={handleUpdateConfirmation}
          open={visible}
          onCancel={() => setVisible(false)}
        />
    </>)
}