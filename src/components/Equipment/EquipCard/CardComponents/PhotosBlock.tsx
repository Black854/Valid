import { Avatar, Button, Col, Image, Modal, Popconfirm, Row, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getPhotosSelector } from "../../../../redux/equipmentSelectors"
import { useEffect, useState } from "react"
import { deletePhoto, getPhotos, updatePdfDescription, uploadPhotos } from "../../../../redux/equipmentReducer"
import Link from "antd/es/typography/Link"
import { DeleteFilled, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import pdf from './../../../../img/pdfi.png'
import { RcFile } from "antd/es/upload"
import { AppDispatch } from "../../../../redux/store"
const {Text} = Typography

type PhotosBlockPropsType = {
    id: string
}

export const PhotosBlock: React.FC<PhotosBlockPropsType> = ({ id }) => {
    const [modalStates, setModalStates] = useState(Array<string>)
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


    const dispatch: AppDispatch = useDispatch()
    const photos = useSelector(getPhotosSelector)
    const addObjectToPhotos = {
        id: '99999',
        idfromtable: '',
        src: '',
        name: ''
    }
    useEffect(
        () => {
            dispatch(getPhotos(id))
        }, []
    )
    let photosRenderArray = []
    photosRenderArray.unshift(...photos);
    photosRenderArray.unshift(addObjectToPhotos);

    let fileInputRef: any = null

    const onSelectPhoto = (e: any) => {
        dispatch(uploadPhotos(id, e.currentTarget.files[0]))
    }

    const handleDeletePhoto = (id: string, photoId: string) => {
        dispatch(deletePhoto(id, photoId))
    }

    const setPdfDescription = (photoId: string, text: string) => {
        dispatch(updatePdfDescription(photoId, text, id))
    }

    const photosData = photosRenderArray.map ((e: any) => {
        if (e.src.endsWith('.pdf')) {
            const handleCancel = (id: string) => {
                setModalStates(modalStates.filter(elem => elem !== id))
            }
            
            const showModal = (id: string) => {
                setModalStates([...modalStates, id])
            }
            let isModalOpen: boolean
            if (modalStates.find(elem => elem === e.id)) {
                isModalOpen = true
            } else {
                isModalOpen = false
            }
            return  <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{padding: '4px'}}>
                        <Text editable={{ onChange: (text) => {setPdfDescription(e.id, text)}}} style={{color: 'black', position: 'absolute', top: '3%', left: '5%', width: '80%', zIndex: '1'}}>{e.name}</Text>
                        <Image preview={false} src={pdf} height='100%' style={{objectFit: 'cover', cursor: 'pointer'}} onClick={() => showModal(e.id)} />
                        <Modal title="Просмотр документа" open={isModalOpen} onCancel={() => handleCancel(e.id)} footer={[ <Button key="close" onClick={() => handleCancel(e.id)} type="primary">Закрыть</Button> ]} >
                            <object data={'http://10.85.10.212/ov/' + e.src} type="application/pdf" width="100%" height="600px">
                                <p>Ваш браузер не поддерживает отображение PDF. Вы можете <a href={'http://10.85.10.212/ov/' + e.src}>скачать его</a>.</p>
                            </object>
                        </Modal>
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