import { PremReestrType, getCurrentPremData, updatePremWorkData } from "../../../redux/Reducers/premisesReducer"
import { ExpandedDataType } from "../types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../redux/store"
import { PrinterOutlined } from '@ant-design/icons'
import { Typography, Table, TableColumnsType, Button, Modal, Space, Input, Row, Col } from "antd"
import { DatePickerForWork } from "../../common/DatePickerForWork"
import { ProtocolUpload } from "./MiniComponents/ProtocolUpload"
import { ProtocolCode } from "./MiniComponents/ProtocolCode"
import { ReportUpload } from "./MiniComponents/ReportUpload"
import { ReportCode } from "./MiniComponents/ReportCode"
import { LabelStatus } from "./MiniComponents/LabelStatus"
import { PamUpload } from "./MiniComponents/PamUpload"
import { PamStatus } from "./MiniComponents/PamStatus"
import { useState } from "react"
import { ProgressStatus } from "./MiniComponents/ProgressStatus"
import { SeasonSwitcher } from "./MiniComponents/SeasonSwitcher"
const { Text } = Typography

type PremTasks = {
    myPremDataIdArray: string[]
    myPremData: PremReestrType[]
    rec: any
    error: (fileName: string) => void
}

export const PremTasks: React.FC<PremTasks> = ({ myPremData, error, rec, myPremDataIdArray }) => {
    const dispatch: AppDispatch = useDispatch()

    const thisObject = myPremData.find(e => e.idfromtable === rec.id)

    const seasonColumn: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Сезон',
            dataIndex: 'season',
            key: 'season',
            align: 'center',
            render: (season, record) => {
                const handleLabelSwitch = async (pol: string) => {
                    await dispatch(updatePremWorkData(record.id, 'season', pol))
                    await dispatch(getCurrentPremData(myPremDataIdArray))
                }
                return season === '0' ?
                    <Button onClick={() => handleLabelSwitch('1')} type="default">
                        <Text type="warning">Не указан</Text>
                    </Button> :
                    season === '1' ?
                        <Button onClick={() => handleLabelSwitch('2')} type="default">
                            <Text type="success">Вне сезонов</Text>
                        </Button> :
                        season === '2' ?
                            <Button onClick={() => handleLabelSwitch('3')} type="default">
                                <Text type="success">Зима</Text>
                            </Button> :
                            <Button onClick={() => handleLabelSwitch('0')} type="default">
                                <Text type="success">Лето</Text>
                            </Button>
            }
        },
    ]

    let data: any = [{
        key: '1',
        progress: '',
        vp: '',
        nvp: '',
        dvp: '',
        vo: '',
        nvo: '',
        dvo: '',
        et: ''
    }]

    const data2 = myPremData.find(e => e.idfromtable === rec.id)

    if (data2 !== undefined) {
        data = [data2]
    }

    const columns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '60%'
        },
    ]

    const protoData = [
        {
            rowName: 'Статус загрузки протокола',
            value: <ProtocolUpload data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' />
        },
        {
            rowName: 'Код протокола',
            value: <ProtocolCode data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} objectType='premises' />
        },
        {
            rowName: 'Дата утверждения протокола',
            value: <DatePickerForWork date={data[0].dvp} objectId={data.id} dateType='dvp' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myPremDataIdArray} />
        },
    ]

    const reportData = [
        {
            rowName: 'Статус загрузки отчета',
            value: <ReportUpload data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' />
        },
        {
            rowName: 'Код отчета',
            value: <ReportCode data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} objectType='premises' />
        },
        {
            rowName: 'Дата утверждения отчета',
            value: <DatePickerForWork date={data[0].dvo} objectId={data[0].id} dateType='dvo' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myPremDataIdArray} />
        },
    ]

    const labelData = [
        {
            rowName: 'Статус этикетки',
            value: <LabelStatus data={data[0]} myPremDataIdArray={myPremDataIdArray} objectType='premises' />
        },
    ]

    const PamUploaderData = [
        {
            rowName: 'Статус загрузки памятки',
            value: <PamUpload data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' />
        }
    ]

    const PamData = [
        {
            rowName: 'Статус памятки',
            value: <PamStatus data={data[0]} myPremDataIdArray={myPremDataIdArray} objectType='premises' />
        }
    ]

    const seasonData = [
        {
            rowName: 'Сезонность',
            value: <SeasonSwitcher data={data[0]} myPremDataIdArray={myPremDataIdArray} />
        }
    ]

    const AddsColumns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '60%'
        },
    ]

    const [iframeKey, setIframeKey] = useState(0)
    const [BnModalOpen, setBnModalOpen] = useState(false)
    const [CDConvertModalOpen, setCDConvertModalOpen] = useState(false)
    const [TeachProtocolModalOpen, setTeachProtocolModalOpen] = useState(false)
    const [TitleListModalOpen, setTitleListModalOpen] = useState(false)
    const [TitlesCDListModalOpen, setTitlesCDListModalOpen] = useState(false)

    const [AddChar, setAddChar] = useState('')
    const [AddName, setAddName] = useState('')

    const [AddsChars, setAddsChars] = useState('')

    const handleCancel = (modalType: string) => {
        if (modalType === 'BN') {
            setBnModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'CDConvert') {
            setCDConvertModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'TeachProtocol') {
            setTeachProtocolModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'TitleList') {
            setTitleListModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'TitlesCDList') {
            setTitlesCDListModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        }
    }

    const AddsData = [
        {
            rowName: <Text style={{ fontSize: '12pt' }}>Бланк несоответствия</Text>,
            value: <>
                <Button onClick={() => { setBnModalOpen(true) }} style={{ borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal title="Бланк несоответствия" open={BnModalOpen} onCancel={() => handleCancel('BN')} footer={[<Button key="close" onClick={() => handleCancel('BN')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/bn.pdf`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <Text style={{ fontSize: '12pt' }}>Протокол обучения персонала</Text>,
            value: <>
                <Button onClick={() => { setTeachProtocolModalOpen(true) }} disabled={data[0].nvp === '' || data[0].dvp === ''} style={{ borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal afterOpenChange={() => handleCancel('TeachProtocol')} title="Протокол обучения персонала" open={TeachProtocolModalOpen} onCancel={() => handleCancel('TeachProtocol')} footer={[<Button key="close" onClick={() => handleCancel('TeachProtocol')} type="primary">Закрыть</Button>]} >
                    <iframe
                        key={iframeKey}
                        style={{ width: '100%', height: '40vh', marginLeft: '5%' }}
                        src={`http://10.85.10.212/ov/API/PrintForms/add_b.php?id=${data[0].id}&idfromtable=${data[0].idfromtable}&tp=equip.work&user&stroki=5&typeForm=2`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <Text style={{ fontSize: '12pt' }}>Титульные листы приложений</Text>,
            value: <>
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder="Буква" value={AddChar} onChange={(e) => { setAddChar(e.currentTarget.value) }} style={{ width: '140px' }} allowClear />
                    <Input placeholder="Наименование" value={AddName} onChange={(e) => { setAddName(e.currentTarget.value) }} allowClear />
                    <Button onClick={() => { setTitleListModalOpen(true) }} disabled={data[0].nvp === '' || AddName === '' || AddChar === ''} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                    <Modal afterOpenChange={() => handleCancel('TitleList')} title="Титульные листы приложений" open={TitleListModalOpen} onCancel={() => handleCancel('TitleList')} footer={[<Button key="close" onClick={() => handleCancel('TitleList')} type="primary">Закрыть</Button>]} >
                        <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/add_any.php?nvp=${data[0].nvp}&name=${AddName}&char=${AddChar}`}></iframe>
                    </Modal>
                </Space.Compact>
            </>
        },
        {
            rowName: <Text style={{ fontSize: '12pt' }}>Титульный лист (для диска)</Text>,
            value: <>
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder="Буквы через запятую" value={AddsChars} onChange={(e) => { setAddsChars(e.currentTarget.value) }} allowClear />
                    <Button onClick={() => { setTitlesCDListModalOpen(true) }} disabled={data[0].nvp === '' || AddsChars === ''} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                    <Modal afterOpenChange={() => handleCancel('TitlesCDList')} title="Титульные листы приложений на диске" open={TitlesCDListModalOpen} onCancel={() => handleCancel('TitlesCDList')} footer={[<Button key="close" onClick={() => handleCancel('TitlesCDList')} type="primary">Закрыть</Button>]} >
                        <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/add_cde.php?nvp=${data[0].nvp}&chars=${AddsChars}`}></iframe>
                    </Modal>
                </Space.Compact>
            </>
        },
        {
            rowName: <Text style={{ fontSize: '12pt' }}>Конверт для диска</Text>,
            value: <>
                <Button onClick={() => { setCDConvertModalOpen(true) }} style={{ borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal title="Конверт для диска" open={CDConvertModalOpen} onCancel={() => handleCancel('CDConvert')} footer={[<Button key="close" onClick={() => handleCancel('CDConvert')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/CD.pdf`}></iframe>
                </Modal>
            </>,
        },
    ]

    return <>
        <Row style={{ margin: '20px 0' }}>
            <Col span={3} push={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <ProgressStatus record={rec} myPremData={myPremData} />
            </Col>
            <Col span={9} push={2}>
                <Table
                    columns={columns}
                    dataSource={
                        thisObject?.typeval === '1' ?
                            (rec.class === 'Чистые' || rec.class === 'Контролируемые') ? [...protoData, ...reportData, ...labelData] :
                                rec.class === 'Складские' && (rec.mode === '2 - 8 ºC' || rec.mode === 'минус 30 - 35 ºC') ? [...protoData, ...reportData, ...seasonData, ...PamUploaderData, ...PamData, ...labelData] :
                                    [...protoData, ...reportData, ...seasonData, ...labelData] :
                            thisObject?.typeval === '3' ?
                                (rec.class === 'Чистые' || rec.class === 'Контролируемые') ? [...reportData, ...labelData] :
                                    rec.class === 'Складские' && (rec.mode === '2 - 8 ºC' || rec.mode === 'минус 30 - 35 ºC') ? [...reportData, ...labelData] :
                                        [...reportData, ...labelData] :
                                []
                    }
                    bordered
                    pagination={false}
                    showHeader={false}
                    rowKey='rowName'
                    size="small"
                />
            </Col>
            <Col span={9} push={2}>
                <Table
                    columns={AddsColumns}
                    dataSource={AddsData}
                    bordered
                    pagination={false}
                    showHeader={false}
                    rowKey='rowName'
                    size="small"
                />
            </Col>
        </Row>
    </>
}