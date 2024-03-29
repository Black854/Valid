import { Button, Image, Popconfirm, Typography, message } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import empty from './../../../../img/empty.png'
import { useDispatch, useSelector } from "react-redux"
import { EyeOutlined } from '@ant-design/icons'
import { AppDispatch } from "../../../../redux/store"
import { PremDataType, deleteMainPhoto, updateName, uploadMainPhoto } from "../../../../redux/Reducers/premisesReducer"
import Title from "antd/es/typography/Title"
import { getUserDataAccessSelector } from "../../../../redux/Selectors/authSelectors"
import { getServerSelector } from "../../../../redux/Selectors/appSelectors"

const { Text } = Typography

type TitleImagePropsType = {
    premObject: PremDataType
    id: string
}

export const TitleImage: React.FC<TitleImagePropsType> = ({ premObject, id }) => {
    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const widthScreen = window.innerWidth
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }
    const onSelectPhoto = (e: any) => {
        if (e.currentTarget.files.length > 0) {
            const fileName = e.currentTarget.files[0].name
            const fileExtension = fileName.split('.').pop()
            const allowedExtensions = ['jpg', 'jpeg', 'png']

            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                dispatch(uploadMainPhoto(id, e.currentTarget.files[0]))
            } else {
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
                <Title editable={ access > 3 ? false : { text: premObject.name, onChange: (text: string) => handleUpdateName(text) }} style={{ marginBottom: '20px' }} level={widthScreen < 1370 ? 5 : widthScreen < 1605 ? 4 : 4} >{premObject.class === 'Складские' ? `Помещение ${premObject.nomer} «${premObject.name}»` : premObject.name}</Title>
                <Image
                    src={premObject.foto ? server + premObject.foto : empty}
                    preview={premObject.foto ? { mask: <><EyeOutlined style={{ fontSize: '12pt' }} /><Text style={{ color: 'white', marginLeft: '10px' }}>Просмотр</Text></> } : false}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '45vh',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}
                    rootClassName="titleImage"
                />
            </div>
            {!premObject.foto && <>
                <input id="uploadPhoto" accept="image/jpeg, image/png" type="file" style={{ display: 'none' }} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button disabled={access > 3} htmlType="submit" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
            </>
            }
            {premObject.foto && id && <>
                <Popconfirm
                    title='Подтвердите удаление'
                    description='Вы уверены, что хотите удалить фотографию?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={handleDeleteFoto}
                >
                    <Button disabled={access > 3} icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} danger>Удалить фото</Button>
                </Popconfirm>
            </>}
        </>
    )
}
