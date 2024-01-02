import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { OrderedListOutlined, PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { DepartmentsType, createNewDepartment, setVMPConsumers } from "../../../../redux/Reducers/appReducer"

interface VMPConsumers {
    VMPname: string,
    departments: DepartmentsType[],
    VMPId: string
    consumers: string[]
}

type consumersArray<T> = {
    [key: number]: T
}

export const VMPConsumers: React.FC<VMPConsumers> = ({VMPname, departments, consumers, VMPId}) => {
    const dispatch: AppDispatch = useDispatch()
    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm<DepartmentsType>()
    const data = departments.map(e => <CustomController key={e.id} checked={consumers?.includes(e.id.toString())} control={control} name={e.id} type='checkboxes' label={`${e.pos} - ${e.fio}`} />)
    console.log(typeof(consumers))
    // console.log(typeof(a))
    const [showForm, setShowForm] = useState(false)

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<consumersArray<boolean | undefined>> = async (dataArray) => {
        const trueKeys = Object.entries(dataArray).filter(([key, value]) => value === true).map(([key]) => key.toString())
        await dispatch(setVMPConsumers(VMPId, trueKeys))
        if (!getFieldState('name').error) {
            setShowForm(false)
            reset()
        }
    }

    return <>
        <Button size="small" type="link" icon={<OrderedListOutlined />} onClick={() => setShowForm(true)}>Согласователи</Button>
        <Modal width={550} destroyOnClose centered title={`Согласователи графика ВМП ${VMPname}`} open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                {data}
                <Button style={{ marginTop: '25px' }} size="small" type="primary" htmlType="submit">Изменить список</Button>
            </Form>
        </Modal>
    </>
}