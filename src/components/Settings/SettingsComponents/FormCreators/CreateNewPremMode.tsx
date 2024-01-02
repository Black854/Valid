import { Button, Form, Modal } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { PlusOutlined } from "@ant-design/icons"
import { AppDispatch } from "../../../../redux/store"
import { CustomController } from "../../../common/FormControls"
import { EquipGroupsType, PremModesType, VMPDepartmentsType, createNewEquipGroup, createNewPremMode, createNewVMPDepartment } from "../../../../redux/Reducers/appReducer"



export const NewPremMode: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { handleSubmit, control, formState: { errors }, setError, reset, getFieldState } = useForm<PremModesType>()

    const [showForm, setShowForm] = useState(false)

    const modeTypeOptions = [
        { label: 'Температура', value: 't' },
        { label: 'Влажность', value: 'h' }
    ]

    const isActiveOptions = [
        { label: 'Активен', value: '0' },
        { label: 'Не активен', value: '1' }
    ]

    const handleCancel = () => {
        setShowForm(false)
        reset()
    }

    const submit: SubmitHandler<PremModesType> = async (data) => {
        if (data.low !== data.hight) {
            await dispatch(createNewPremMode(data.type, data.low, data.hight, data.isactive, setError))
            if (!getFieldState('low').error) {
                setShowForm(false)
                reset()
            }
        } else {
            setError('low', {'message': 'Минимальное и максимальное значение не могут быть равны'})
            setError('hight', {'message': 'Минимальное и максимальное значение не могут быть равны'})
        }

    }

    return <>
        <Button type="link" icon={<PlusOutlined />} onClick={() => setShowForm(true)} />
        <Modal width={550} destroyOnClose centered title='Добавление режима температуры/влажности в систему' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                <CustomController control={control} name='type' type='select' label='Тип режима' required={true} options={modeTypeOptions} />
                <CustomController control={control} name='low' type='text' label='Минимальное значение' required={true} maxLength={9} placeholder="например, 2" />
                <CustomController control={control} name='hight' type='text' label='Максимальное значение' required={true} maxLength={9} placeholder="например, 8" />
                <CustomController control={control} name='isactive' type='select' label='Видимость в системе' required={true} options={isActiveOptions} />
                <Button style={{ marginTop: '15px' }} size="small" type="primary" htmlType="submit">Создать группу</Button>
            </Form>
        </Modal>
    </>
}