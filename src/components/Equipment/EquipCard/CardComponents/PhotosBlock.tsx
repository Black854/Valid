import { Col, Image, Row, Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getPhotosSelector } from "../../../../redux/equipmentSelectors"
import { useEffect } from "react"
import { getPhotos } from "../../../../redux/equipmentReducer"
import Link from "antd/es/typography/Link"
import pdf from './../../../../img/pdfi.png'
import s from './PhotosBlock.module.css'

type PhotosBlockPropsType = {
    id: string
}

const PhotosBlock: React.FC<PhotosBlockPropsType> = ({ id }) => {
    const dispatch = useDispatch()
    const photos = useSelector(getPhotosSelector)
    console.log(photos)
    useEffect(
        () => {
            //@ts-ignore
            dispatch(getPhotos(id))
        }, []
    )
    const photosData = photos.map ((e: any) => {
        
        if (e.src.endsWith('.pdf')) {
            return <Image src={pdf} preview={false} style={{width: '33.3%', padding: '3px', boxSizing: 'border-box', objectFit: 'cover', objectPosition: 'center', maxHeight: '100%'}} />
                {/* </Link> */}
        } else {
            return  <Image src={'http://10.85.10.212/ov/' + e.src} style={{width: '33.3%', padding: '3px', boxSizing: 'border-box', objectFit: 'cover', objectPosition: 'center', maxHeight: '100%'}} />
        }
    })
    
    
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}} >
            {photosData}
        </div>
    )
}

export default PhotosBlock