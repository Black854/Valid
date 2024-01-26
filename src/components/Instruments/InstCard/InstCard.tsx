import { Col, Row, Spin, Tabs, TabsProps, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, AppStateType } from "../../../redux/store"
import { useEffect } from "react"
import { TitleImage } from "./CardComponents/TitleImage"
import { TechnicalInfo } from "./CardComponents/TechnicalInfo"
import { PhotosBlock } from "./CardComponents/PhotosBlock"
import { InstDescriptions } from "./CardComponents/InstDescription"
import { getInstById, getInstCardError, getInstData, getIsLoading } from "../../../redux/Selectors/instrumentsSelectors"
import { getInstruments, instActions, updateManufacturDate, updateManufacturer, updateName2, updateSerial } from "../../../redux/Reducers/instrumentsReducer"
import { ConvertDateInst } from "../../common/convertDateInst"
import { getUserDataAccessSelector } from "../../../redux/Selectors/authSelectors"
const { Text } = Typography

const InstCard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const params = useParams()
    let id: string
    if (params.id === undefined) {
        id = 'none'
    } else {
        id = params.id
    }
    
    const instData = useSelector(getInstData)
    const isLoading = useSelector(getIsLoading)
    const instObject = useSelector((state: AppStateType) => getInstById(state, id))

    const procCardError = useSelector(getInstCardError)
    const access = parseInt(useSelector(getUserDataAccessSelector))

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (procCardError) {
            messageApi.open({
                type: 'error',
                content: procCardError,
                duration: 7
            })
            dispatch(instActions.setInstCardError(null))
        }
    }, [procCardError])

    useEffect(() => {
        if (instData.length === 0) {
          dispatch(getInstruments())
        }
    }, [dispatch, instData])

    const handleUpdateName2 = (text: string) => {
        dispatch(updateName2(id, text))
    }

    const handleUpdateManufacturer = (text: string) => {
        dispatch(updateManufacturer(id, text))
    }

    const handleUpdateManufacturdate = (text: string) => {
        dispatch(updateManufacturDate(id, text))
    }

    const handleUpdateSerial = (text: string) => {
        dispatch(updateSerial(id, text))
    }
    
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    } else if (instObject) {
        const data = [
            {
                rowName: 'Назначение прибора',
                value: instObject.name2 === '' ?    <Text type="warning" editable={access > 3 ? false : {onChange: (text) => handleUpdateName2(text), text: ''}}>Не указано</Text>:
                                                    <Text editable={access > 3 ? false : {onChange: (text) => handleUpdateName2(text)}}>{instObject.name2}</Text>
            },
            {
                rowName: 'Количество',
                value: <Text>{instObject.quantity} шт.</Text>
            },
            {
                rowName: 'Дата поверки',
                value:  <ConvertDateInst id={id} date={instObject.date1} forbDate={instObject.date2} dateType="start" />
            },
            {
                rowName: 'Срок действия поверки',
                value:  <ConvertDateInst id={id} date={instObject.date2} forbDate={instObject.date1} dateType="end" />
            },
            {
                rowName: 'Производитель',
                value: instObject.manufacturer === '' ?   <Text type="warning" editable={access > 3 ? false : {onChange: (text) => handleUpdateManufacturer(text), text: ''}}>Не указано</Text>:
                                                            <Text editable={access > 3 ? false : {onChange: (text) => handleUpdateManufacturer(text)}}>{instObject.manufacturer}</Text>
            },
            {
                rowName: 'Год изготовления',
                value: instObject.manufacturdate === '' ?   <Text type="warning" editable={access > 3 ? false : {onChange: (text) => handleUpdateManufacturdate(text), text: ''}}>Не указано</Text>:
                                                            <Text editable={access > 3 ? false : {onChange: (text) => handleUpdateManufacturdate(text)}}>{instObject.manufacturdate}</Text>
            },
            {
                rowName: 'Серийный номер',
                value: instObject.serial === '' ?   <Text type="warning" editable={access > 3 ? false : {onChange: (text) => handleUpdateSerial(text), text: ''}}>Не указано</Text>:
                                                    <Text editable={access > 3 ? false : {onChange: (text) => handleUpdateSerial(text)}}>{instObject.serial}</Text>
            },
        ]
        
        const columns = [
            {
              dataIndex: 'rowName',
              render: (rowName: string) => <Text style={{fontSize: '12pt'}} >{rowName}</Text>,
            },
            {
              dataIndex: 'value',
              width: '60%'
            },
        ]

        const items: TabsProps['items'] = [
            {
              key: '1',
              label: 'Описание',
              children: <InstDescriptions columns={columns} data={data} />,
            },
            {
              key: '2',
              label: 'Техническая информация',
              children: <TechnicalInfo id={instObject.id} access={access} />,
            },
            {
              key: '3',
              label: 'Медиа файлы',
              children: <PhotosBlock id={instObject.id} access={access} />,
            },
          ]

        return (
            <>
            {contextHolder}
            <Row style={{padding: '10px 0'}} >
                <Col span={5} push={1} style={{textAlign: 'center'}} >
                    <TitleImage instObject={instObject} id={id} access={access} />
                </Col>
                <Col span={16} push={2} style={{minHeight: '89vh', display: "flex", flexDirection: 'column'}} >
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        indicatorSize={(origin) => origin - 16}
                        style={{flex: 1}}
                        type="card"
                    />
                </Col>
            </Row>
            </>
        )
    } else {
        return (
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Валидационных приборов с данным идентификатором не существует!</Text>
        )
    }
}

export default InstCard