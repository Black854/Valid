import { DeleteOutlined, UploadOutlined, FileWordOutlined, PrinterOutlined } from '@ant-design/icons'
import { Typography, Table, TableColumnsType, Button, Popconfirm, Col, Row, Modal } from "antd"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { ExpandedDataType } from '../types'
import { EquipReestrType, deleteEquipDocument, getCurrentEquipData, updateEquipWorkData, updateReestrDocsCodeEquip, uploadEquipDocument } from '../../../redux/Reducers/equipmentReducer'
import { DatePickerForWork } from '../../common/DatePickerForWork'
import { ProtocolUpload } from './MiniComponents/ProtocolUpload'
import { ProtocolCode } from './MiniComponents/ProtocolCode'
import { ReportCode } from './MiniComponents/ReportCode'
import { LabelStatus } from './MiniComponents/LabelStatus'
import { ProgressHelper } from './ProgressHelper'
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
    const dispatch: AppDispatch = useDispatch()

    const thisObject = myEquipData.find(e => e.idfromtable === rec.id)

    const handleUpdateDocsCode = async (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        await dispatch(updateReestrDocsCodeEquip(rec.id, recordId, text, dataType))
        await dispatch(getCurrentEquipData(myEquipDataIdArray))
    }

    const protocolColumns: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Протокол',
            dataIndex: 'vp',
            key: 'vp',
            align: 'center',
            render: (vp, record) => {
                if (vp !== '') {
                    const fileSegments = vp.split('/')
                    const fileName = fileSegments[fileSegments.length - 1]
                    const handleDeleteDocument = async () => {
                        await dispatch(deleteEquipDocument(rec.id, record.id, 'vp', vp))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    }
                    return <>
                        <Text type="success" style={{ width: '95%' }}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + vp} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                        >
                            <Button size="small" danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
                        </Popconfirm>
                    </>
                } else {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = async (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            // Получите расширение файла, разделенное точкой
                            const fileExtension = fileName.split('.').pop()

                            // Список разрешенных расширений
                            const allowedExtensions = ['doc', 'docx']

                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                                await dispatch(uploadEquipDocument(rec.id, record.id, 'vp', e.currentTarget.files[0]))
                                await dispatch(getCurrentEquipData(myEquipDataIdArray))
                            } else {
                                // Файл имеет недопустимое расширение
                                error(fileName)
                            }
                        }
                    }
                    return <>
                        <Text type="warning">Не загружен</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
                    </>
                }
            },
        },
        {
            title: 'Код протокола',
            dataIndex: 'nvp',
            key: 'nvp',
            align: 'center',
            render: (nvp, record) => {
                return nvp === '' ? <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp'), text: '' }} type="warning">Нет данных</Text> :
                    <Text type="success"
                        editable={{
                            onChange: (text: string) => { handleUpdateDocsCode(record.id, text, 'nvp') }
                        }}>
                        {nvp}
                    </Text>
            }
        },
        {
            title: 'Дата протокола',
            dataIndex: 'dvp',
            key: 'dvp',
            align: 'center',
            render: (dvp, record) => {
                return <DatePickerForWork date={dvp} objectId={record.id} dateType='dvp' id={record.id} key={record.id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
            }
        }
    ]

    const reportColumns: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Отчет',
            dataIndex: 'vo',
            key: 'vo',
            align: 'center',
            render: (vo, record) => {
                if (vo !== '') {
                    const fileSegments = vo.split('/')
                    const fileName = fileSegments[fileSegments.length - 1]
                    const handleDeleteDocument = async () => {
                        await dispatch(deleteEquipDocument(rec.id, record.id, 'vo', vo))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    }
                    return <>
                        <Text type="success" style={{ width: '95%' }}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + vo} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                        >
                            <Button size="small" danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
                        </Popconfirm>
                    </>
                } else {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = async (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            // Получите расширение файла, разделенное точкой
                            const fileExtension = fileName.split('.').pop()

                            // Список разрешенных расширений
                            const allowedExtensions = ['doc', 'docx']

                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                                await dispatch(uploadEquipDocument(rec.id, record.id, 'vo', e.currentTarget.files[0]))
                                await dispatch(getCurrentEquipData(myEquipDataIdArray))
                            } else {
                                // Файл имеет недопустимое расширение
                                error(fileName)
                            }
                        }
                    }
                    return <>
                        <Text type="warning">Не загружен</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
                    </>
                }
            },
        },
        {
            title: 'Код отчета',
            dataIndex: 'nvo',
            key: 'nvo',
            align: 'center',
            render: (nvo, record) => {
                return nvo === '' ? <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo'), text: '' }} type="warning">Нет данных</Text> :
                    <Text type="success"
                        editable={{
                            onChange: (text: string) => { handleUpdateDocsCode(record.id, text, 'nvo') }
                        }}>
                        {nvo}
                    </Text>
            }
        },
        {
            title: 'Дата отчета',
            dataIndex: 'dvo',
            key: 'dvo',
            align: 'center',
            render: (dvo, record) => {
                return <DatePickerForWork date={dvo} objectId={record.id} dateType='dvo' id={record.id} key={record.id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
            }
        }
    ]

    const labelColumn: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Статус этикетки',
            dataIndex: 'et',
            key: 'et',
            align: 'center',
            render: (et, record) => {
                const handleLabelSwitch = async (pol: string) => {
                    await dispatch(updateEquipWorkData(record.id, 'et', pol))
                    await dispatch(getCurrentEquipData(myEquipDataIdArray))
                }
                return et === '' ?
                    <Button onClick={() => handleLabelSwitch('1')} type="default">
                        <Text type="warning">Не приклеена</Text>
                    </Button> :
                    <Button onClick={() => handleLabelSwitch('')} type="default">
                        <Text type="success">Приклеена</Text>
                    </Button>
            }
        },
    ]

    const pamColumn: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Загрузка памятки',
            dataIndex: 'pam',
            key: 'pam',
            align: 'center',
            render: (pam, record) => {
                if (pam !== '') {
                    const fileSegments = pam.split('/')
                    const fileName = fileSegments[fileSegments.length - 1]
                    const handleDeleteDocument = async () => {
                        await dispatch(deleteEquipDocument(rec.id, record.id, 'pam', pam))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    }
                    return <>
                        <Text type="success" style={{ width: '95%' }}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + pam} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                        >
                            <Button size="small" danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
                        </Popconfirm>
                    </>
                } else {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = async (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            // Получите расширение файла, разделенное точкой
                            const fileExtension = fileName.split('.').pop()

                            // Список разрешенных расширений
                            const allowedExtensions = ['doc', 'docx']

                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                                await dispatch(uploadEquipDocument(rec.id, record.id, 'pam', e.currentTarget.files[0]))
                                await dispatch(getCurrentEquipData(myEquipDataIdArray))
                            } else {
                                // Файл имеет недопустимое расширение
                                error(fileName)
                            }
                        }
                    }
                    return <>
                        <Text type="warning">Не загружена</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
                    </>
                }
            },
        },
    ]

    const pam2Column: TableColumnsType<ExpandedDataType> = [
        {
            title: 'Статус памятки',
            dataIndex: 'pam2',
            key: 'pam2',
            align: 'center',
            render: (pam2, record) => {
                const handleLabelSwitch = async (pol: string) => {
                    await dispatch(updateEquipWorkData(record.id, 'pam2', pol))
                    await dispatch(getCurrentEquipData(myEquipDataIdArray))
                }
                return pam2 === '' ?
                    <Button onClick={() => handleLabelSwitch('1')} type="default">
                        <Text type="warning">Не приклеена</Text>
                    </Button> :
                    <Button onClick={() => handleLabelSwitch('')} type="default">
                        <Text type="success">Приклеена</Text>
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

    const data2 = myEquipData.find(e => e.idfromtable === rec.id)

    if (data2 !== undefined) {
        data = [data2]
    }

    // console.log(data)

    // return thisObject?.typeval === '1' ? (
    //     rec.class === 'Термостаты' ? <Table columns={[...protocolColumns, ...reportColumns, ...pamColumn, ...pam2Column, ...labelColumn]} dataSource={data} pagination={false} bordered={false} /> :
    //     rec.class === 'Термоконтейнеры' ? <Table columns={[...protocolColumns, ...reportColumns, ...pamColumn]} dataSource={data} pagination={false} bordered={false} />:
    //     <Table columns={[...protocolColumns, ...reportColumns, ...labelColumn]} dataSource={data} pagination={false} bordered={false} />
    // ) : thisObject?.typeval === '3' ? (
    //     rec.class === 'Термоконтейнеры' ? <Table columns={[...reportColumns]} dataSource={data} pagination={false} bordered={false} /> :
    //     <Table columns={[...reportColumns, ...labelColumn]} dataSource={data} pagination={false} bordered={false} />
    // ) : null

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
            value: <ProtocolUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} />
        },
        {
            rowName: 'Код протокола',
            value: <ProtocolCode data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} />
        },
        {
            rowName: 'Дата утверждения протокола',
            value: <DatePickerForWork date={data[0].dvp} objectId={data.id} dateType='dvp' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
        },
    ]

    const reportData = [
        {
            rowName: 'Статус загрузки отчета',
            value: <ReportUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} />
        },
        {
            rowName: 'Код отчета',
            value: <ReportCode data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} />
        },
        {
            rowName: 'Дата утверждения отчета',
            value: <DatePickerForWork date={data[0].dvo} objectId={data[0].id} dateType='dvo' id={data[0].id} key={data[0].id} group={rec.objectType} myDataIdArray={myEquipDataIdArray} />
        },
    ]

    const labelData = [
        {
            rowName: 'Статус этикетки',
            value: <LabelStatus data={data[0]} myEquipDataIdArray={myEquipDataIdArray} />
        },
    ]

    const PamUploaderData = [
        {
            rowName: 'Статус загрузки памятки',
            value: <PamUpload data={data[0]} rec={rec} myEquipDataIdArray={myEquipDataIdArray} error={error} />
        }
    ]

    const PamData = [
        {
            rowName: 'Статус памятки',
            value: <PamStatus data={data[0]} myEquipDataIdArray={myEquipDataIdArray} />
        }
    ]

    const AddsColumns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
    ]

    const [iframeKey, setIframeKey] = useState(0)
    const [BnModalOpen, setBnModalOpen] = useState(false)
    const [CDConvertModalOpen, setCDConvertModalOpen] = useState(false)
    const [TeachProtocolModalOpen, setTeachProtocolModalOpen] = useState(false)

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
        }
    }

    const AddsData = [
        {
            rowName: <>
                Бланк несоответствия
                <Button onClick={() => { setBnModalOpen(true) }} style={{ marginLeft: '10px' }} type='link' icon={<PrinterOutlined />} />
                <Modal title="Бланк несоответствия" open={BnModalOpen} onCancel={() => handleCancel('BN')} footer={[<Button key="close" onClick={() => handleCancel('BN')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/bn.pdf`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <>
                Протокол обучения персонала
                <Button onClick={() => { setTeachProtocolModalOpen(true) }} disabled={data[0].nvp === '' || data[0].dvp === ''} style={{ marginLeft: '10px' }} type='link' icon={<PrinterOutlined />} />
                <Modal afterOpenChange={() => handleCancel('TeachProtocol')} title="Протокол обучения персонала" open={TeachProtocolModalOpen} onCancel={() => handleCancel('TeachProtocol')} footer={[<Button key="close" onClick={() => handleCancel('TeachProtocol')} type="primary">Закрыть</Button>]} >
                    <iframe
                    key={iframeKey}
                    style={{ width: '100%', height: '40vh', marginLeft: '5%' }}
                    src={`http://10.85.10.212/ov/API/PrintForms/add_b.php?id=${data[0].id}&idfromtable=${data[0].idfromtable}&tp=equip.work&user&stroki=5&typeForm=2`}></iframe>
                </Modal>
            </>
        },
        {
            rowName: <>
                Титульные листы приложений
                <Button disabled={data[0].nvp === ''} style={{ marginLeft: '10px' }} type='link' icon={<PrinterOutlined />} />
            </>
        },
        {
            rowName: <>
                Титульный лист для приложений на диске
                <Button disabled={data[0].nvp === ''} style={{ marginLeft: '10px' }} type='link' icon={<PrinterOutlined />} />
            </>
        },
        {
            rowName: <>
                Конверт для диска
                <Button onClick={() => { setCDConvertModalOpen(true) }} style={{ marginLeft: '10px' }} type='link' icon={<PrinterOutlined />} />
                <Modal title="Конверт для диска" open={CDConvertModalOpen} onCancel={() => handleCancel('CDConvert')} footer={[<Button key="close" onClick={() => handleCancel('CDConvert')} type="primary">Закрыть</Button>]} >
                    <iframe key={iframeKey} style={{ width: '90%', height: '70vh', marginLeft: '5%' }} src={`http://10.85.10.212/ov/API/PrintForms/CD.pdf`}></iframe>
                </Modal>
            </>
        },
    ]

    return <>
        <Row style={{ margin: '20px 0' }}>
            <Col span={3} push={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <ProgressStatus record={rec} myEquipData={myEquipData} />
            </Col>
            <Col span={12} push={2}>
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
            <Col span={6} push={2}>
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

