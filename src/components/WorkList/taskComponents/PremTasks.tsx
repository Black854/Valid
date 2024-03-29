import { PremReestrType } from "../../../redux/Reducers/premisesReducer"
import { useSelector } from "react-redux"
import { PrinterOutlined } from '@ant-design/icons'
import { Typography, Table, Button, Modal, Space, Input, Row, Col } from "antd"
import { DatePickerForWork } from "./MiniComponents/DatePickerForWork"
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
import { UpdateCardStatus } from "./MiniComponents/UpdateCardStatus"
import { getServerSelector } from "../../../redux/Selectors/appSelectors"
import { WorkChangesDataType } from "../../../redux/Reducers/workReducer"

const { Text } = Typography

type PremTasks = {
    myPremDataIdArray: string[]
    myPremData: PremReestrType[]
    rec: any
    error: (fileName: string) => void
    access: number
    tasksChanges: WorkChangesDataType[] | null
}

export const PremTasks: React.FC<PremTasks> = ({ myPremData, error, rec, myPremDataIdArray, access, tasksChanges }) => {

    const server = useSelector(getServerSelector)
    
    const widthScreen = window.innerWidth

    const thisObject = myPremData.find(e => e.idfromtable === rec.id)

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
            render: (rowName: string) => <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '60%'
        },
    ]

    const protoData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Статус загрузки протокола</Text>,
            value: <ProtocolUpload changes={tasksChanges?.find(e => e.taskChangeType === 'vp')} data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' access={access} />
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Код протокола</Text>,
            value: <ProtocolCode changes={tasksChanges?.find(e => e.taskChangeType === 'nvp')} data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} objectType='premises' access={access} />
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Дата утверждения протокола</Text>,
            value: <DatePickerForWork changes={tasksChanges?.find(e => e.taskChangeType === 'dvp')} date={data[0].dvp} objectId={data[0].idfromtable} dateType='dvp' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myPremDataIdArray} access={access} />
        },
    ]

    const reportData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Статус загрузки отчета</Text>,
            value: <ReportUpload changes={tasksChanges?.find(e => e.taskChangeType === 'vo')} data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' access={access} />
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Код отчета</Text>,
            value: <ReportCode changes={tasksChanges?.find(e => e.taskChangeType === 'nvo')} data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} objectType='premises' access={access} />
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Дата утверждения отчета</Text>,
            value: <DatePickerForWork changes={tasksChanges?.find(e => e.taskChangeType === 'dvo')} date={data[0].dvo} objectId={data[0].idfromtable} dateType='dvo' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myPremDataIdArray} access={access} />
        },
    ]

    const labelData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Статус этикетки</Text>,
            value: <LabelStatus changes={tasksChanges?.find(e => e.taskChangeType === 'et')} data={data[0]} myPremDataIdArray={myPremDataIdArray} objectType='premises' access={access} />
        },
    ]

    const PamUploaderData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Статус загрузки памятки</Text>,
            value: <PamUpload changes={tasksChanges?.find(e => e.taskChangeType === 'pam')} data={data[0]} rec={rec} myPremDataIdArray={myPremDataIdArray} error={error} objectType='premises' access={access} />
        }
    ]

    const PamData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Статус памятки</Text>,
            value: <PamStatus changes={tasksChanges?.find(e => e.taskChangeType === 'pam2')} data={data[0]} myPremDataIdArray={myPremDataIdArray} objectType='premises' access={access} />
        }
    ]

    const seasonData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Сезонность</Text>,
            value: <SeasonSwitcher changes={tasksChanges?.find(e => e.taskChangeType === 'season')} data={data[0]} myPremDataIdArray={myPremDataIdArray} access={access} />
        }
    ]

    const updateCardData = [
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Карточка актуализирована</Text>,
            value: <UpdateCardStatus changes={tasksChanges?.find(e => e.taskChangeType === 'isCardUpdated')} data={data[0]} myPremDataIdArray={myPremDataIdArray} objectType='premises' access={access} />
        }
    ]

    const AddsColumns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }} >{rowName}</Text>,
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
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Бланк несоответствия</Text>,
            value: <>
                <Button onClick={() => { setBnModalOpen(true) }} style={widthScreen < 1370 ? { fontSize: '9pt', borderRadius: '0', width: '100%' } : widthScreen < 1605 ? { borderRadius: '0', width: '100%' } : { borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal title="Бланк несоответствия" open={BnModalOpen} onCancel={() => handleCancel('BN')} footer={[<Button key="close" onClick={() => handleCancel('BN')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`${server}API/PrintForms/bn.pdf`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Протокол обучения персонала</Text>,
            value: <>
                <Button onClick={() => { setTeachProtocolModalOpen(true) }} disabled={data[0].nvp === '' || data[0].dvp === ''}  style={widthScreen < 1370 ? { fontSize: '9pt', borderRadius: '0', width: '100%' } : widthScreen < 1605 ? { borderRadius: '0', width: '100%' } : { borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal afterOpenChange={() => handleCancel('TeachProtocol')} title="Протокол обучения персонала" open={TeachProtocolModalOpen} onCancel={() => handleCancel('TeachProtocol')} footer={[<Button key="close" onClick={() => handleCancel('TeachProtocol')} type="primary">Закрыть</Button>]} >
                    <iframe
                        key={iframeKey}
                        style={{ width: '100%', height: '40vh', marginLeft: '5%' }}
                        src={`${server}API/PrintForms/add_b.php?id=${data[0].id}&idfromtable=${data[0].idfromtable}&tp=prem.work&user&stroki=5&typeForm=2`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Титульные листы приложений</Text>,
            value: <>
                <Space.Compact style={{ width: '100%' }}>
                    <Input style={widthScreen < 1370 ? { fontSize: '9pt', width: '120px' } : widthScreen < 1605 ? { width: '140px' } : { width: '140px' }} placeholder="Буква" value={AddChar} onChange={(e) => { setAddChar(e.currentTarget.value) }} allowClear={widthScreen > 1370} />
                    <Input style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? { } : { }} placeholder="Наименование" value={AddName} onChange={(e) => { setAddName(e.currentTarget.value) }} allowClear={widthScreen > 1370} onPressEnter={() => { data[0].nvp !== '' && AddName !== '' && AddChar !== '' && setTitleListModalOpen(true) }} />
                    <Button style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? { } : { }} onClick={() => { setTitleListModalOpen(true) }} disabled={data[0].nvp === '' || AddName === '' || AddChar === ''} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                    <Modal afterOpenChange={() => handleCancel('TitleList')} title="Титульные листы приложений" open={TitleListModalOpen} onCancel={() => handleCancel('TitleList')} footer={[<Button key="close" onClick={() => handleCancel('TitleList')} type="primary">Закрыть</Button>]} >
                        <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`${server}API/PrintForms/add_any.php?nvp=${data[0].nvp}&name=${AddName}&char=${AddChar}`}></iframe>
                    </Modal>
                </Space.Compact>
            </>
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Титульный лист (для диска)</Text>,
            value: <>
                <Space.Compact style={{ width: '100%' }}>
                    <Input style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? { } : { }} placeholder="Буквы через запятую" value={AddsChars} onChange={(e) => { setAddsChars(e.currentTarget.value) }} allowClear onPressEnter={() => { data[0].nvp !== '' && AddsChars !== '' && setTitlesCDListModalOpen(true) }} />
                    <Button style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? { } : { }} onClick={() => { setTitlesCDListModalOpen(true) }} disabled={data[0].nvp === '' || AddsChars === ''} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                    <Modal afterOpenChange={() => handleCancel('TitlesCDList')} title="Титульные листы приложений на диске" open={TitlesCDListModalOpen} onCancel={() => handleCancel('TitlesCDList')} footer={[<Button key="close" onClick={() => handleCancel('TitlesCDList')} type="primary">Закрыть</Button>]} >
                        <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`${server}API/PrintForms/add_cde.php?nvp=${data[0].nvp}&chars=${AddsChars}`}></iframe>
                    </Modal>
                </Space.Compact>
            </>
        },
        {
            rowName: <Text style={widthScreen < 1370 ? { fontSize: '9pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }}>Конверт для диска</Text>,
            value: <>
                <Button onClick={() => { setCDConvertModalOpen(true) }} style={widthScreen < 1370 ? { fontSize: '9pt', borderRadius: '0', width: '100%' } : widthScreen < 1605 ? { borderRadius: '0', width: '100%' } : { borderRadius: '0', width: '100%' }} type='primary' icon={<PrinterOutlined />} >Печать</Button>
                <Modal title="Конверт для диска" open={CDConvertModalOpen} onCancel={() => handleCancel('CDConvert')} footer={[<Button key="close" onClick={() => handleCancel('CDConvert')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`${server}API/PrintForms/CD.pdf`}></iframe>
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
                            (rec.class === 'Чистые' || rec.class === 'Контролируемые') ? [...protoData, ...reportData, ...updateCardData, ...labelData] :
                                rec.class === 'Складские' && (rec.mode === '2 - 8 ºC' || rec.mode === 'минус 30 - 35 ºC') ? [...protoData, ...reportData, ...seasonData, ...PamUploaderData, ...PamData, ...updateCardData, ...labelData] :
                                    [...protoData, ...reportData, ...seasonData, ...updateCardData, ...labelData] :
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
            <Col span={9} sm={10} push={2}>
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