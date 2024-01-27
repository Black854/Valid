import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { DepartmentsType, createNewDepartment } from "../../../../redux/Reducers/appReducer"

type FormPropsType = {
    access: number
}

export const NewDepartmentForm: React.FC<FormPropsType> = ({ access }) => {
    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm<DepartmentsType>()

    const [showForm, setShowForm] = useState(false)

    const isActiveOptions = [
        { label: 'Активен', value: '1' },
        { label: 'Не активен', value: '0' }
    ]

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<DepartmentsType> = async (data) => {
        await dispatch(createNewDepartment(data.name, data.name2, data.pos, data.fio, data.stat, setError))
        if (!getFieldState('name').error) {
            setShowForm(false)
            reset()
        }
    }

    return <>
        <Button disabled={access > 2} type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление подразделения в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                <CustomController control={control} name='name' type='text' label='Аббревиатура отдела' required={true} maxLength={100} />
                <CustomController control={control} name='name2' type='text' label='Наименование штатной единицы' required={true} maxLength={100} />
                <CustomController control={control} name='pos' type='text' label='Должность сотрудника' required={true} maxLength={100} />
                <CustomController control={control} name='fio' type='text' label='Ф.И.О. сотрудника' required={true} maxLength={100} />
                <CustomController control={control} name='stat' type='select' label='Видимость в системе' required={true} maxLength={100} options={isActiveOptions} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать подразделение</Button>
            </Form>
        </Modal>
    </>
}