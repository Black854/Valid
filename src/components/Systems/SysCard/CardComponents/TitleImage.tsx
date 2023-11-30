import { Button, Image, Popconfirm, Typography, message } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import empty from './../../../../img/empty.png'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../../../redux/store";
import { deleteMainPhoto, updateName, uploadMainPhoto } from "../../../../redux/Reducers/systemsReducer";
import Title from "antd/es/typography/Title";
const { Text } = Typography

interface DataType {
    ar: string
    date: string
    fio: string
    foto: string
    groupp: string
    id: string
    inv: string
    manual: string
    manufacturdate: string
    manufacturer: string
    name: string
    nomer: string
    sp: string
    sp2: string
    serial: string
}

type TitleImagePropsType = {
    sysObject: DataType
    id: string
}

export const TitleImage: React.FC<TitleImagePropsType> = ({ sysObject, id }) => {
    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }

    const onSelectPhoto = (e: any) => {
        if (e.currentTarget.files.length > 0) {
            const fileName = e.currentTarget.files[0].name
            // Получите расширение файла, разделенное точкой
            const fileExtension = fileName.split('.').pop()

            // Список разрешенных расширений
            const allowedExtensions = ['jpg', 'jpeg', 'png']

            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                dispatch(uploadMainPhoto(id, e.currentTarget.files[0]))
            } else {
                // Файл имеет недопустимое расширение
                error(fileName)
            }
        }
    }
    const handleDeleteFoto = () => {
        dispatch(deleteMainPhoto(id))
    }

    const handleUpdateName = (text: string) => {
        dispatch(updateName(id, text))
    }

    let fileInputRef: any = null

    return (
        <>
            {contextHolder}
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
                <Title editable={{ onChange: (text: string) => handleUpdateName(text) }} style={{ marginBottom: '20px' }} level={4}>{sysObject.name}</Title>
                <Image
                    src={sysObject.foto ? "http://10.85.10.212/ov/" + sysObject.foto : empty}
                    preview={sysObject.foto ? { mask: <><EyeOutlined style={{ fontSize: '12pt' }} /><Text style={{ color: 'white', marginLeft: '10px' }}>Просмотр</Text></> } : false}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '45vh',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}
                    rootClassName="titleImage"
                />
            </div>
            {!sysObject.foto && <>
                <input id="uploadPhoto" accept="image/jpeg, image/png" type="file" style={{ display: 'none' }} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button htmlType="submit" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
            </>
            }
            {sysObject.foto && id && <>
                <Popconfirm
                    title='Подтвердите удаление'
                    description='Вы уверены, что хотите удалить фотографию?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={handleDeleteFoto}
                >
                    <Button icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} danger>Удалить фото</Button>
                </Popconfirm>
            </>}
        </>
    )
}
