import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { OrderedListOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { DepartmentsType, setVMPConsumers } from "../../../../redux/Reducers/appReducer"

interface VMPConsumers {
    VMPname: string,
    departments: DepartmentsType[],
    VMPId: string
    consumers: string
    access: number
}

type consumersArray<T> = {
    [key: number]: T
}

export const VMPConsumers: React.FC<VMPConsumers> = ({ VMPname, departments, consumers, VMPId, access }) => {
    const dispatch: AppDispatch = useDispatch()
    const defaultValues = JSON.parse(consumers).reduce((acc: any, currentValue: any) => {
        acc[currentValue] = true
        return acc
    }, {})
    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm({ defaultValues })
    const data = departments.sort((a, b) => {
        const nameA = a.fio.toUpperCase()
        const nameB = b.fio.toUpperCase()
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    }).map(e => <CustomController key={e.id} checked={JSON.parse(consumers).includes(e.id)} control={control} name={e.id} type='checkboxes' label={`${e.fio} - ${e.pos}`} />)
    const [showForm, setShowForm] = useState(false)
    const [formKey, setFormKey] = useState(1)
    const handleCancel = () => {
        setShowForm(false)
        reset()
        setFormKey(formKey + 1)
    }

    const submit: SubmitHandler<consumersArray<boolean>> = async (dataArray) => {
        const trueKeys = Object.entries(dataArray).filter(([key, value]) => value === true).map(([key]) => key.toString())
        await dispatch(setVMPConsumers(VMPId, trueKeys))
        if (!getFieldState('name').error) {
            setShowForm(false)
            reset()
            setFormKey(formKey + 1)
        }
    }

    return <>
        <Button size="small" type="link" icon={<OrderedListOutlined />} onClick={() => setShowForm(true)}>Согласователи</Button>
        <Modal width={550} destroyOnClose centered title={`Согласователи графика ВМП ${VMPname}`} open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form key={formKey} style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                {data}
                <Button disabled={access > 1} style={{ marginTop: '25px' }} size="small" type="primary" htmlType="submit">Изменить список</Button>
            </Form>
        </Modal>
    </>
}