import { Button, Form, Modal } from "antd"
import { CustomController } from "./FormControls"
import { PlusOutlined } from "@ant-design/icons"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { addReestrData } from "../../redux/Reducers/appReducer"

interface PropsType {
    id: string
    objectType: 'equipment' | 'premises' | 'systems' | 'processes'
}

export const AddReestrData: React.FC<PropsType> = ({id, objectType }) => {
    const dispatch: AppDispatch = useDispatch()
    const { handleSubmit, control, formState: { errors }, reset } = useForm()
    const [showForm, setShowForm] = useState(false)
    const [formKey, setFormKey] = useState(1)
    const handleCancel = () => {
        setShowForm(false)
        reset()
        setFormKey(formKey + 1)
    }

    const submit: SubmitHandler<FieldValues> = async (dataArray) => {
        let nvp = ''
        let dvp = ''
        if (dataArray.nvp && dataArray.dvp) {
            const dvpYear = dataArray.dvp['$y']
            const dvpMonth = (dataArray.dvp['$M'] + 1).toString().length === 1 ? `0${(dataArray.dvp['$M'] + 1).toString()}` : `${(dataArray.dvp['$M'] + 1).toString()}`
            const dvpDay = dataArray.dvp['$D'].toString().length === 1 ? `0${dataArray.dvp['$D'].toString()}` : dataArray.dvp['$D'].toString()
            dvp = `${dvpYear}-${dvpMonth}-${dvpDay}`
            nvp = dataArray.nvp
        }        

        const dvoYear = dataArray.dvo['$y']
        const dvoMonth = (dataArray.dvo['$M'] + 1).toString().length === 1 ? `0${(dataArray.dvo['$M'] + 1).toString()}` : `${(dataArray.dvo['$M'] + 1).toString()}`
        const dvoDay = dataArray.dvo['$D'].toString().length === 1 ? `0${dataArray.dvo['$D'].toString()}` : dataArray.dvo['$D'].toString()
        const dvo = `${dvoYear}-${dvoMonth}-${dvoDay}`

        await dispatch(addReestrData(id, objectType, nvp, dvp, dataArray.nvo, dvo, dataArray.typeval))
        setShowForm(false)
        reset()
        setFormKey(formKey + 1)
    }

    const options = [
        {label: 'Отчет по валидации/квалификации', value: '1'},
        {label: 'Отчет о периодической оценке', value: '3'},
    ]

    return <>
        <Button type="primary" size="small" style={{ marginBottom: '10px' }} icon={<PlusOutlined />} onClick={() => setShowForm(true)}>Добавить данные</Button>
        <Modal width={550} destroyOnClose centered title='Добавление данных о валидационных работах' open={showForm} onCancel={() => handleCancel()} footer={[<Button key="close" onClick={() => handleCancel()} type="primary">Отмена</Button>]} >
            <Form key={formKey} style={{ marginTop: '30px' }} layout="horizontal" size="small" onFinish={handleSubmit(submit)}>
                <CustomController key='nvp' control={control} name='nvp' type='text' label='Код протокола' maxLength={100} />
                <CustomController key='dvp' control={control} name='dvp' type='date' label='Дата утверждения протокола' />
                <CustomController key='nvo' control={control} name='nvo' type='text' label='Код отчета' required={true} maxLength={100} />
                <CustomController key='dvo' control={control} name='dvo' type='date' label='Дата утверждения отчета' required={true} />
                <CustomController key='typeval' control={control} name='typeval' type='select' label='Тип проводимых работ' required={true} options={options} />
                <Button style={{ marginTop: '25px' }} size="small" type="primary" htmlType="submit">Добавить</Button>
            </Form>
        </Modal>
    </>
}