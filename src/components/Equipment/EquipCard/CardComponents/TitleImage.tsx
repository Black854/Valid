import { Button, Image, Typography } from "antd"
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import empty from './../../../../img/empty.png'
import { useDispatch, useSelector } from "react-redux";
import { deleteMainPhoto, uploadMainPhoto } from "../../../../redux/equipmentReducer";
import { useParams } from "react-router-dom";
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
    const deleteFoto = () => {
        //@ts-ignore
        dispatch(deleteMainPhoto(id))
    }

    let fileInputRef: any = null;

    return (
        <>
            <div style={{width: '100%', textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                <Text strong style={{color: '#167afe', fontSize: '12pt'}}>{equipObject.name}</Text>
                <Image
                    src={equipObject.foto ? "http://10.85.10.212/ov/" + equipObject.foto : empty}
                    preview = { equipObject.foto ? true : false }
                    style={{
                        maxWidth: '100%',
                        maxHeight: '45vh',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginTop: '20px'
                    }}
                />
            </div>
            { !equipObject.foto && <>
                <input id="uploadPhoto" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                <Button htmlType="submit" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="primary" onClick={() => fileInputRef.click()}>Загрузить фото</Button>
                </>
            }
            { equipObject.foto && id && <Button icon={<DeleteOutlined style={{fontSize: '12pt'}} />} danger onClick={deleteFoto} >Удалить фото</Button> }
        </>
    )
}

export default TitleImage
