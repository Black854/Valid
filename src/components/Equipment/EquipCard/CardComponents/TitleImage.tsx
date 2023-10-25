import { Button, Image, Popconfirm, Typography } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import empty from './../../../../img/empty.png'
import { useDispatch } from "react-redux";
import { deleteMainPhoto, updateName, uploadMainPhoto } from "../../../../redux/equipmentReducer";
import { useParams } from "react-router-dom";
import { EyeOutlined} from '@ant-design/icons';
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
}

const TitleImage: React.FC<TitleImagePropsType> = ({equipObject}) => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const onSelectPhoto = (e: any) => {
        //@ts-ignore
        dispatch(uploadMainPhoto(id, e.currentTarget.files[0]))
    }
    const handleDeleteFoto = () => {
        //@ts-ignore
        dispatch(deleteMainPhoto(id))
    }

    const handleUpdateName = (text: string) => {
        //@ts-ignore
        dispatch(updateName(id, text))
    }

    let fileInputRef: any = null;

    return (
        <>
            <div style={{width: '100%', textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                <Text strong editable={{onChange: (text: string) => handleUpdateName(text)}} style={{color: '#167afe', fontSize: '12pt', display: 'block', marginBottom: '20px'}}>{equipObject.name}</Text>
                <Image
                    src={equipObject.foto ? "http://10.85.10.212/ov/" + equipObject.foto : empty}
                    preview = { equipObject.foto ? {mask: <><EyeOutlined style={{fontSize: '12pt'}} /><Text style={{color: 'white', marginLeft: '10px'}}>Просмотр</Text></>} : false  }
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
            { !equipObject.foto && <>
                <input id="uploadPhoto" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button htmlType="submit" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
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
                        <Button icon={<DeleteOutlined style={{fontSize: '12pt'}} />} danger>Удалить фото</Button>
                    </Popconfirm>
                </>  }
        </>
    )
}

export default TitleImage
