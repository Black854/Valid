import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { EquipGroupsType, createNewEquipGroup } from "../../../../redux/Reducers/appReducer"

type FormPropsType = {
    access: number
}

export const NewEquipGroup: React.FC<FormPropsType> = ({ access }) => {
    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm<EquipGroupsType>()

    const [showForm, setShowForm] = useState(false)

    const isActiveOptions = [
        { label: 'Активен', value: '0' },
        { label: 'Не активен', value: '1' }
    ]

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<EquipGroupsType> = async (data) => {
        await dispatch(createNewEquipGroup(data.name, data.isactive, setError))
        if (!getFieldState('name').error) {
            setShowForm(false)
            reset()
        }
    }

    return <>
        <Button disabled={access > 2} type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление группы оборудования в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                <CustomController control={control} name='name' type='text' label='Наименование группы' required={true} maxLength={20} placeholder="например, Термостаты" />
                <CustomController control={control} name='isactive' type='select' label='Видимость в системе' required={true} options={isActiveOptions} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать группу</Button>
            </Form>
        </Modal>
    </>
}