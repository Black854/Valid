import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { VMPDepartmentsType, createNewVMPDepartment } from "../../../../redux/Reducers/appReducer"



export const NewVMPDepartmentForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm<VMPDepartmentsType>()

    const [showForm, setShowForm] = useState(false)

    const isActiveOptions = [
        {label: 'Активен', value: '0'},
        {label: 'Не активен', value: '1'}
    ]

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<VMPDepartmentsType> = async (data) => {
        await dispatch(createNewVMPDepartment(data.vmpname1, data.vmpname2, data.menuname, data.code, data.code2, data.datevmp, data.isactive, setError))
        if (!getFieldState('vmpname1').error) {
            setShowForm(false)
            reset()
        }
    }

    return <>
        <Button type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление мастер-плана в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                <CustomController control={control} name='vmpname1' type='text' label='Подразделение мастер-плана' required={true} maxLength={100} placeholder="например, ЛИП" />
                <CustomController control={control} name='vmpname2' type='text' label='Наименование в р.п.' required={true} maxLength={100} placeholder="например, цеха ЛИП" />
                <CustomController control={control} name='menuname' type='text' label='Название в меню' required={true} maxLength={100} placeholder="например, График ВМП ЛИП" />
                <CustomController control={control} name='code' type='text' label='Кодировка мастер-плана' required={true} maxLength={100}  placeholder="например, ВМП-2-0060-04"/>
                <CustomController control={control} name='code2' type='text' label='Кодировка формы' required={true} maxLength={100}  placeholder="например, А.6"/>
                <CustomController control={control} name='isactive' type='select' label='Видимость в системе' required={true} options={isActiveOptions} />
                <CustomController control={control} name='datevmp' type='date' label='Дата утверждения графика' />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать мастер-план</Button>
            </Form>
        </Modal>
    </>
}