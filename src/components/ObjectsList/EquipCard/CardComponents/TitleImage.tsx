import { Button, Image, Popconfirm, Typography, message } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import empty from './../../../../img/empty.png'
import { useDispatch, useSelector } from "react-redux"
import { deleteMainPhoto, updateName, uploadMainPhoto } from "../../../../redux/Reducers/equipmentReducer"
import { EyeOutlined} from '@ant-design/icons'
import { AppDispatch } from "../../../../redux/store"
import Title from "antd/es/typography/Title"
import { getUserDataAccessSelector } from "../../../../redux/Selectors/authSelectors"
import { getServerSelector } from "../../../../redux/Selectors/appSelectors"
const {Text} = Typography

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
    equipObject: DataType
    id: string
}

export const TitleImage: React.FC<TitleImagePropsType> = ({equipObject, id}) => {
    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)
    const widthScreen = window.innerWidth
    
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
            <div style={{width: '100%', textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                <Title editable={access > 3 ? false : {onChange: (text: string) => handleUpdateName(text)}} style={{marginBottom: '20px'}} level={widthScreen < 1370 ? 5 : widthScreen < 1605 ? 4 : 4} >{equipObject.name}</Title>
                <Image
                    src={equipObject.foto ? server + equipObject.foto : empty}
                    preview = { equipObject.foto ? {mask: <><EyeOutlined style={{fontSize: '12pt'}} /><Text style={{color: 'white', marginLeft: '10px'}}>Просмотр</Text></>} : false  }
                    style={{
                        maxWidth: '100%',
                        maxHeight: '45vh',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}
                    rootClassName="titleImage"
                />
            </div>
            { !equipObject.foto && <>
                <input id="uploadPhoto" accept="image/jpeg, image/png" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button disabled={access > 3} htmlType="submit" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
                </>
            }
            { equipObject.foto && id && <>
                    <Popconfirm
                        title='Подтвердите удаление'
                        description='Вы уверены, что хотите удалить фотографию?'
                        okText='Да'
                        cancelText='Нет'
                        onConfirm={handleDeleteFoto}
                    >
                        <Button disabled={access > 3} icon={<DeleteOutlined style={{fontSize: '12pt'}} />} danger>Удалить фото</Button>
                    </Popconfirm>
                </>  }
        </>
    )
}
