import { Button, Form, Modal, message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsSelector, getIntervals, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../redux/store"
import { CustomController } from "../../common/FormControls"
import { NewProcObjectType, createNewObject, procActions } from "../../../redux/Reducers/processesReducer"
import { getProcCreateNewObjectErrorMessage } from "../../../redux/Selectors/processesSelectors"

type NewObjectFormtype = {
    access: number
}

export const NewObjectForm: React.FC<NewObjectFormtype> = ({ access }) => {

    const VMPDepartmentData = useSelector(getVMPDepartmentsSelector).filter(e => e.isactive !== '1').map(e => ({ label: e.vmpname1, value: e.vmpname1 }))
    const DepartmentData = useSelector(getDepartmentsSelector).filter(e => e.stat === '1').map(e => ({ label: e.name, value: e.name }))
    const IntervalsData = useSelector(getIntervals).map(e => ({ label: e.label, value: e.value }))
    const procCreateNewObjectErrorMessage = useSelector(getProcCreateNewObjectErrorMessage)

    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, reset } = useForm<NewProcObjectType>()

    const [messageApi, contextHolder] = message.useMessage()

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getVMPDepartments())
        dispatch(getDepartments())
    }, [])

    useEffect(() => {
        if (procCreateNewObjectErrorMessage) {
            dispatch(procActions.setCreateNewObjectErrorMessage(null))
            messageApi.open({
                type: 'error',
                content: procCreateNewObjectErrorMessage,
                duration: 7
            })
        }
    }, [procCreateNewObjectErrorMessage])

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<NewProcObjectType> = data => {
        setShowForm(false)
        dispatch(createNewObject(data))
        reset()
    }

    const error: SubmitErrorHandler<NewProcObjectType> = data => {
        // data.email && setError(localError + data.email.message)
        // data.password && setError(localError + data.password.message)
        // data.rememberMe && setError(localError + data.rememberMe.message)
    }

    return <>
        {contextHolder}
        <Button disabled={access > 1} type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление объекта в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit, error)}>
                <CustomController control={control} name='name' type='text' label='Наименование' required={true} maxLength={100} />
                <CustomController control={control} name='spVMP' type='select' label='Подразделение (по ВМП)' required={true} options={VMPDepartmentData} />
                <CustomController control={control} name='sp' type='select' label='Подразделение (по ответственности)' required={true} options={DepartmentData} />
                <CustomController control={control} name='ar' type='select' label='Интервал оценки/реквалификации' required={true} options={IntervalsData} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать объект</Button>
            </Form>
        </Modal>
    </>
}