import { Button, Form, Modal, message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDepartmentsSelector, getIntervals, getPremModesSelector, getVMPDepartmentsSelector } from "../../../redux/Selectors/appSelectors"
import { getDepartments, getPremModes, getVMPDepartments } from "../../../redux/Reducers/appReducer"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../redux/store"
import { CustomController } from "../../common/FormControls"
import { NewPremObjectType, createNewObject, premActions } from "../../../redux/Reducers/premisesReducer"
import { getPremCreateNewObjectErrorMessage } from "../../../redux/Selectors/premisesSelectors"

type NewObjectFormtype = {
    access: number
}

export const NewPremObjectForm: React.FC<NewObjectFormtype> = ({ access }) => {

    const VMPDepartmentData = useSelector(getVMPDepartmentsSelector).filter(e => e.isactive !== '1').map(e => ({ label: e.vmpname1, value: e.vmpname1 }))
    const DepartmentData = useSelector(getDepartmentsSelector).filter(e => e.stat === '1').map(e => ({ label: e.name, value: e.name }))
    const IntervalsData = useSelector(getIntervals).map(e => ({ label: e.label, value: e.value }))
    const PremModesData = useSelector(getPremModesSelector).filter(e => e.type === 't' && e.isactive !== '1').map(e => ({ value: `${e.low} - ${e.hight} ºC`, label: `${e.low} - ${e.hight} ºC` }))
    const premCreateNewObjectErrorMessage = useSelector(getPremCreateNewObjectErrorMessage)

    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, reset } = useForm<NewPremObjectType>()

    const [showForm, setShowForm] = useState(false)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        dispatch(getVMPDepartments())
        dispatch(getDepartments())
        dispatch(getPremModes())
    }, [])

    useEffect(() => {
        if (premCreateNewObjectErrorMessage) {
            dispatch(premActions.setCreateNewObjectErrorMessage(null))
            messageApi.open({
                type: 'error',
                content: premCreateNewObjectErrorMessage,
                duration: 7
            })
        }
    }, [premCreateNewObjectErrorMessage])

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<NewPremObjectType> = data => {
        setShowForm(false)
        dispatch(createNewObject(data))
        reset()
    }

    const error: SubmitErrorHandler<NewPremObjectType> = data => {
        // data.email && setError(localError + data.email.message)
        // data.password && setError(localError + data.password.message)
        // data.rememberMe && setError(localError + data.rememberMe.message)
    }

    const classesData = [
        { label: 'Контролируемые', value: 'Контролируемые' },
        { label: 'Чистые', value: 'Чистые' },
        { label: 'Складские', value: 'Складские' }
    ]

    return <>
        {contextHolder}
        <Button disabled={access > 1} type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление объекта в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit, error)}>
                <CustomController control={control} name='name' type='text' label='Наименование' required={true} maxLength={100} />
                <CustomController control={control} name='nomer' type='text' label='Номер помещения' maxLength={100} />
                <CustomController control={control} name='spVMP' type='select' label='Подразделение (по ВМП)' required={true} options={VMPDepartmentData} />
                <CustomController control={control} name='sp' type='select' label='Подразделение (по ответственности)' required={true} options={DepartmentData} />
                <CustomController control={control} name='class' type='select' label='Группа помещений' required={true} options={classesData} />
                <CustomController control={control} name='mode' type='select' label='Температурный режим' required={true} options={PremModesData} />
                <CustomController control={control} name='ar' type='select' label='Интервал оценки/реквалификации' required={true} options={IntervalsData} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать объект</Button>
            </Form>
        </Modal>
    </>
}