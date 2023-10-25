import { Avatar, Button, Col, Image, Popconfirm, Row, Space, Table, Typography, Upload, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getPhotosSelector } from "../../../../redux/equipmentSelectors"
import { useEffect, useState } from "react"
import { deletePhoto, getPhotos, updatePdfDescription, uploadPhotos } from "../../../../redux/equipmentReducer"
import Link from "antd/es/typography/Link"
import { DeleteFilled, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import pdf from './../../../../img/pdfi.png'
import { RcFile } from "antd/es/upload"
const {Text} = Typography

type PhotosBlockPropsType = {
    id: string
}

const PhotosBlock: React.FC<PhotosBlockPropsType> = ({ id }) => {
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      };
      const [loading, setLoading] = useState(false);
      const [imageUrl, setImageUrl] = useState<string>();
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );


    const dispatch = useDispatch()
    const photos = useSelector(getPhotosSelector)
    const addObjectToPhotos = {
        id: '99999',
        idfromtable: '',
        src: '',
        name: ''
    }
    useEffect(
        () => {
            //@ts-ignore
            dispatch(getPhotos(id))
        }, []
    )
    let photosRenderArray = []
    photosRenderArray.unshift(...photos);
    photosRenderArray.unshift(addObjectToPhotos);

    let fileInputRef: any = null

    const onSelectPhoto = (e: any) => {
        //@ts-ignore
        dispatch(uploadPhotos(id, e.currentTarget.files[0]))
    }

    const handleDeletePhoto = (id: string, photoId: string) => {
        //@ts-ignore
        dispatch(deletePhoto(id, photoId))
    }

    const setPdfDescription = (photoId: string, text: string) => {
        //@ts-ignore
        dispatch(updatePdfDescription(photoId, text, id))
    }

    const photosData = photosRenderArray.map ((e: any) => {
        if (e.src.endsWith('.pdf')) {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Text editable={{ onChange: (text) => {setPdfDescription(e.id, text)}}} style={{color: 'black', position: 'absolute', top: '3%', left: '5%', width: '80%', zIndex: '1'}}>{e.name}</Text>
                        <Link href={'http://10.85.10.212/ov/' + e.src}>
                            <Image preview={false} src={pdf} height='100%' style={{objectFit: 'cover'}} />
                        </Link>
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => {handleDeletePhoto(id, e.id)}}
                        >
                            <Button size="small" danger icon={<DeleteFilled />} shape="circle" style={{ position: 'relative', bottom: '98%', left: '87%'}} />
                        </Popconfirm>
                    </Col>
        } else if (e.id === '99999') {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Avatar 
                            shape='square'
                            icon={
                                <>
                                    <Text style={{fontSize: '20pt' }}>+</Text>
                                    <Text>Загрузить</Text>
                                </>
                                
                            }
                            children={<Text>Загрузить</Text>}
                            style={{objectFit: 'cover',
                                    minHeight: '100px',
                                    height: '100%',
                                    width: '100%',
                                    cursor: 'pointer',
                                    backgroundColor: 'rgb(0 0 0 / 2%)',
                                    border: '1px dashed #d9d9d9',
                                    borderRadius: '8px',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center',textAlign: 'center'
                                }} 
                            onClick={() => fileInputRef.click()}
                        />
                        <input id="uploadPhoto" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                    </Col>
        } else {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Image
                            preview = {{mask: <><EyeOutlined style={{fontSize: '12pt'}} /><Text style={{color: 'white', marginLeft: '10px'}}>Просмотр</Text></>}}
                            src={'http://10.85.10.212/ov/' + e.src}
                            height='100%'
                            style={{objectFit: 'cover'}}
                        />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить фотографию?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => {handleDeletePhoto(id, e.id)}}
                        >
                            <Button size="small" danger icon={<DeleteFilled />} shape="circle" style={{ position: 'relative', bottom: '98%', left: '87%'}} />
                        </Popconfirm>
                    </Col>
        }
        
    })
    
    return (
        <Row gutter={4} style={{marginBottom: '100px'}}>{photosData}</Row>
    )
}

export default PhotosBlock