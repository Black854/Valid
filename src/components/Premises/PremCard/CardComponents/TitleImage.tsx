import { Button, Image, Popconfirm, Typography } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import empty from './../../../../img/empty.png'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { EyeOutlined} from '@ant-design/icons';
import { AppDispatch } from "../../../../redux/store";
import { DataType, deleteMainPhoto, updateName, uploadMainPhoto } from "../../../../redux/premisesReducer";
const {Text} = Typography

type TitleImagePropsType = {
    premObject: DataType
    id: string
}

export const TitleImage: React.FC<TitleImagePropsType> = ({premObject, id}) => {
    const dispatch: AppDispatch = useDispatch()
    const onSelectPhoto = (e: any) => {
        dispatch(uploadMainPhoto(id, e.currentTarget.files[0]))
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
            <div style={{width: '100%', textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                <Text strong editable={{text: premObject.name, onChange: (text: string) => handleUpdateName(text)}} style={{color: '#167afe', fontSize: '12pt', display: 'block', marginBottom: '20px'}}>{ premObject.class==='Складские' ? `Помещение ${premObject.nomer} «${premObject.name}»` : premObject.name }</Text>
                <Image
                    src={premObject.foto ? "http://10.85.10.212/ov/" + premObject.foto : empty}
                    preview = { premObject.foto ? {mask: <><EyeOutlined style={{fontSize: '12pt'}} /><Text style={{color: 'white', marginLeft: '10px'}}>Просмотр</Text></>} : false  }
                    style={{
                        maxWidth: '100%',
                        maxHeight: '45vh',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                    }}
                    rootClassName="titleImage"
                />
            </div>
            { !premObject.foto && <>
                <input id="uploadPhoto" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button htmlType="submit" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
                </>
            }
            { premObject.foto && id && <>
                    <Popconfirm
                        title='Подтвердите удаление'
                        description='Вы уверены, что хотите удалить фотографию?'
                        okText='Да'
                        cancelText='Нет'
                        onConfirm={handleDeleteFoto}
                    >
                        <Button icon={<DeleteOutlined style={{fontSize: '12pt'}} />} danger>Удалить фото</Button>
                    </Popconfirm>
                </>  }
        </>
    )
}
