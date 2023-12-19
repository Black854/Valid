import { Button, Form, Input, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsSelector, getEquipGroupsSelector, getIntervals, getVMPDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { getDepartments, getEquipGroups, getVMPDepartments } from "../../redux/Reducers/appReducer"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../redux/store"
import { CustomController } from "../common/FormControls"
import { NewInstObjectType, createNewObject } from "../../redux/Reducers/instrumentsReducer"



export const NewObjectForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, formState: { errors }, reset, getValues } = useForm<NewInstObjectType>()

    const [showForm, setShowForm] = useState(false)

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<NewInstObjectType> = data => {
        setShowForm(false)
        dispatch(createNewObject(data))
        reset()
    }

    const error: SubmitErrorHandler<NewInstObjectType> = data => {
        // data.email && setError(localError + data.email.message)
        // data.password && setError(localError + data.password.message)
        // data.rememberMe && setError(localError + data.rememberMe.message)
    }

    return <>
        <Button type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление валидационного прибора в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit, error)}>
                <CustomController control={control} name='name' type='text' label='Наименование' required={true} maxLength={100} />
                <CustomController control={control} name='name2' type='text' label='Назначение прибора' required={true} maxLength={100} />
                <CustomController control={control} name='serial' type='text' label='Серийный номер' required={true} maxLength={50} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать объект</Button>
            </Form>
        </Modal>
    </>
}