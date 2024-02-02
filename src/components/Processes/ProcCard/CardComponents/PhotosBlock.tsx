import { Button, Col, Image, Modal, Popconfirm, Row, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import pdf from './../../../../img/pdfi.png'
import video from './../../../../img/video.png'
import { AppDispatch } from "../../../../redux/store"
import { getPhotosSelector } from "../../../../redux/Selectors/processesSelectors"
import { deletePhoto, getPhotos, updatePdfDescription, uploadPhotos } from "../../../../redux/Reducers/processesReducer"
import { getUserDataAccessSelector } from "../../../../redux/Selectors/authSelectors"
import { getServerSelector } from "../../../../redux/Selectors/appSelectors"
const { Text } = Typography

type PhotosBlockPropsType = {
    id: string
}

export const PhotosBlock: React.FC<PhotosBlockPropsType> = ({ id }) => {
    const [modalStates, setModalStates] = useState(Array<string>)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [messageApi, contextHolder] = message.useMessage()

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }

    const dispatch: AppDispatch = useDispatch()
    const photos = useSelector(getPhotosSelector)
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)

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
        if (e.currentTarget.files.length > 0) {
            const fileName = e.currentTarget.files[0].name
            const fileExtension = fileName.split('.').pop()
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'mp4']

            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                dispatch(uploadPhotos(id, e.currentTarget.files[0]))
            } else {
                error(fileName)
            }
        }
    }

    const handleDeletePhoto = (id: string, photoId: string) => {
        dispatch(deletePhoto(id, photoId))
    }

    const setPdfDescription = (photoId: string, text: string) => {
        dispatch(updatePdfDescription(photoId, text, id))
    }

    const photosData = photosRenderArray.map((e: any) => {
        if (e.src.endsWith('.pdf') || e.src.endsWith('.PDF')) {
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
            return <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{ padding: '4px' }}>
                <Text editable={ access > 3 ? false : { onChange: (text) => { setPdfDescription(e.id, text) } }} style={{ color: 'black', position: 'absolute', top: '3%', left: '5%', width: '80%', zIndex: '1' }}>{e.name}</Text>
                <Image preview={false} src={pdf} height='100%' style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => showModal(e.id)} />
                <Modal title="Просмотр документа" open={isModalOpen} onCancel={() => handleCancel(e.id)} footer={[<Button key="close" onClick={() => handleCancel(e.id)} type="primary">Закрыть</Button>]} >
                    <object data={server + e.src} type="application/pdf" width="100%" height="600px">
                        <p>Ваш браузер не поддерживает отображение PDF. Вы можете <a href={server + e.src}>скачать его</a>.</p>
                    </object>
                </Modal>
                <Popconfirm
                    title='Подтвердите удаление'
                    description='Вы уверены, что хотите удалить документ?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={() => { handleDeletePhoto(id, e.id) }}
                >
                    <Button disabled={access > 3} size="small" danger icon={<DeleteOutlined />} shape="circle" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1', background: 'none' }} />
                </Popconfirm>
            </Col>
        } else if (e.src.endsWith('.mp4') || e.src.endsWith('.MP4')) {
            const handleCancel = (id: string) => {
                setModalStates(modalStates.filter(elem => elem !== id))
                if (videoRef.current) {
                    videoRef.current.pause();
                }
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
            return <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{ padding: '4px' }}>
                <Text editable={ access > 3 ? false : { onChange: (text) => { setPdfDescription(e.id, text) } }} style={{ color: 'black', position: 'absolute', top: '3%', left: '5%', width: '80%', zIndex: '1' }}>{e.name}</Text>
                <Image preview={false} src={video} height='100%' style={{ objectFit: 'cover', cursor: 'pointer' }} onClick={() => showModal(e.id)} />
                <Modal title="Просмотр видеозаписи" open={isModalOpen} onCancel={() => handleCancel(e.id)} footer={[<Button key="close" onClick={() => handleCancel(e.id)} type="primary">Закрыть</Button>]} >
                    <video controls width="100%" height="600" ref={videoRef}>
                        <source src={server + e.src} type="video/mp4" />
                        Ваш браузер не поддерживает отображение видео. Вы можете{" "}
                        <a href={server + e.src}>скачать его</a>.
                    </video>
                </Modal>
                <Popconfirm
                    title='Подтвердите удаление'
                    description='Вы уверены, что хотите удалить видеозапись?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={() => { handleDeletePhoto(id, e.id) }}
                >
                    <Button disabled={access > 3} size="small" danger icon={<DeleteOutlined />} shape="circle" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1', background: 'none' }} />
                </Popconfirm>
            </Col>
        } else if (e.id === '99999') {
            return <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{ padding: '4px' }}>
                {contextHolder}
                <Button
                    children={<>
                        <PlusOutlined />
                        <Text style={{ color: 'inherit', display: 'block' }}>Загрузить</Text>
                    </>
                    }
                    style={{
                        minHeight: '100px',
                        height: '100%',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    type="dashed"
                    onClick={() => fileInputRef.click()}
                    disabled={access > 3}
                />
                <input id="uploadPhoto" accept="image/jpeg, image/png, application/pdf, video/mp4" type="file" style={{ display: 'none' }} onChange={onSelectPhoto} ref={(input) => (fileInputRef = input)} />
            </Col>
        } else {
            return <Col key={e.id} xs={24} sm={12} md={8} lg={4} style={{ padding: '4px' }}>
                <Image
                    preview={{ mask: <><EyeOutlined style={{ fontSize: '12pt' }} /><Text style={{ color: 'white', marginLeft: '10px' }}>Просмотр</Text></> }}
                    src={server + e.src}
                    height='100%'
                    style={{ objectFit: 'cover' }}
                />
                <Popconfirm
                    title='Подтвердите удаление'
                    description='Вы уверены, что хотите удалить фотографию?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={() => { handleDeletePhoto(id, e.id) }}
                >
                    <Button disabled={access > 3} size="small" danger icon={<DeleteOutlined />} shape="circle" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1', background: 'none' }} />
                </Popconfirm>
            </Col>
        }
    })

    return (
        <Row gutter={4} style={{ marginBottom: '100px' }}>{photosData}</Row>
    )
}