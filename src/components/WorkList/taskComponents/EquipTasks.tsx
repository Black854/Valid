import { PrinterOutlined } from '@ant-design/icons'
import { Typography, Table, Button, Col, Row, Modal, Input, Space } from "antd"
import { EquipReestrType } from '../../../redux/Reducers/equipmentReducer'
import { DatePickerForWork } from '../../common/DatePickerForWork'
import { ProtocolUpload } from './MiniComponents/ProtocolUpload'
import { ProtocolCode } from './MiniComponents/ProtocolCode'
import { ReportCode } from './MiniComponents/ReportCode'
import { LabelStatus } from './MiniComponents/LabelStatus'
import { PamUpload } from './MiniComponents/PamUpload'
import { PamStatus } from './MiniComponents/PamStatus'
import { ReportUpload } from './MiniComponents/ReportUpload'
import { ProgressStatus } from './MiniComponents/ProgressStatus'
import { useState } from 'react'

const { Text } = Typography

type EquipTasks = {
    myEquipDataIdArray: string[]
    myEquipData: EquipReestrType[]
    rec: any
    error: (fileName: string) => void
}

export const EquipTasks: React.FC<EquipTasks> = ({ myEquipDataIdArray, myEquipData, rec, error }) => {
    const thisObject = myEquipData.find(e => e.idfromtable === rec.id)

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

    const data2 = myEquipData.find(e => e.idfromtable === rec.id)

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
            value: <ProtocolUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} objectType='equipment' />
        },
        {
            rowName: 'Код протокола',
            value: <ProtocolCode data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} objectType='equipment' />
        },
        {
            rowName: 'Дата утверждения протокола',
            value: <DatePickerForWork date={data[0].dvp} objectId={data.id} dateType='dvp' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
        },
    ]

    const reportData = [
        {
            rowName: 'Статус загрузки отчета',
            value: <ReportUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} objectType='equipment' />
        },
        {
            rowName: 'Код отчета',
            value: <ReportCode data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} objectType='equipment' />
        },
        {
            rowName: 'Дата утверждения отчета',
            value: <DatePickerForWork date={data[0].dvo} objectId={data[0].id} dateType='dvo' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
        },
    ]

    const labelData = [
        {
            rowName: 'Статус этикетки',
            value: <LabelStatus data={data[0]} myEquipDataIdArray={myEquipDataIdArray} objectType='equipment' />
        },
    ]

    const PamUploaderData = [
        {
            rowName: 'Статус загрузки памятки',
            value: <PamUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} objectType='equipment' />
        }
    ]

    const PamData = [
        {
            rowName: 'Статус памятки',
            value: <PamStatus data={data[0]} myEquipDataIdArray={myEquipDataIdArray} objectType='equipment' />
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
                    <Input placeholder="Наименование" value={AddName} onChange={(e) => { setAddName(e.currentTarget.value) }} allowClear onPressEnter={() => { data[0].nvp !== '' && AddName !== '' && AddChar !== '' && setTitleListModalOpen(true) }} />
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
                <Input placeholder="Буквы через запятую" value={AddsChars} onChange={(e) => { setAddsChars(e.currentTarget.value) }} allowClear onPressEnter={() => { data[0].nvp !== '' && AddsChars !== '' && setTitlesCDListModalOpen(true) }} />
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
                <ProgressStatus record={rec} myEquipData={myEquipData} />
            </Col>
            <Col span={9} push={2}>
                <Table
                    columns={columns}
                    dataSource={
                        thisObject?.typeval === '1' ?
                            rec.class === 'Термостаты' ? [...protoData, ...reportData, ...PamUploaderData, ...PamData, ...labelData] :
                                rec.class === 'Термоконтейнеры' ? [...protoData, ...reportData, ...PamData] :
                                    [...protoData, ...reportData, ...labelData] :
                            thisObject?.typeval === '3' ?
                                rec.class === 'Термоконтейнеры' ? [...reportData] :
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