import { Avatar, Button, Col, Image, Row, Space, Table, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getPhotosSelector } from "../../../../redux/equipmentSelectors"
import { useEffect } from "react"
import { deletePhoto, getPhotos, uploadPhotos } from "../../../../redux/equipmentReducer"
import Link from "antd/es/typography/Link"
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import pdf from './../../../../img/pdfi.png'
const {Text} = Typography

type PhotosBlockPropsType = {
    id: string
}

const PhotosBlock: React.FC<PhotosBlockPropsType> = ({ id }) => {
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
    const photosData = photosRenderArray.map ((e: any) => {
        if (e.src.endsWith('.pdf')) {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Text editable style={{position: 'absolute', top: '3%', left: '3%', width: '85%', zIndex: '1'}}>{e.name}</Text>
                        <Link href={'http://10.85.10.212/ov/' + e.src}>
                            <Image preview={false} src={pdf} height='100%' style={{objectFit: 'cover'}} />
                        </Link>
                        <Button size="small" danger icon={<DeleteOutlined />} shape="circle" style={{ position: 'relative', bottom: '98%', left: '85%'}} />
                    </Col>
        } else if (e.id === '99999') {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Avatar shape='square' 
                                icon={<FileAddOutlined style={{fontSize: '150pt', marginTop: '50%'}} />} 
                                style={{objectFit: 'cover', height: '100%', width: '100%', cursor: 'pointer'}} 
                                onClick={() => fileInputRef.click()}
                        />
                        <input id="uploadPhoto" type="file" style={{display: 'none'}} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
                    </Col>
        } else {
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Image src={'http://10.85.10.212/ov/' + e.src} height='100%' style={{objectFit: 'cover'}} />
                        <Button onClick={() => {handleDeletePhoto(id, e.id)}} size="small" danger icon={<DeleteOutlined />} shape="circle" style={{ position: 'relative', bottom: '98%', left: '85%'}} />
                    </Col>
        }
        
    })
    
    return (
        <Row gutter={4} style={{marginBottom: '100px'}}>{photosData}</Row>
    )
}

export default PhotosBlock