import { DeleteOutlined, UploadOutlined, FileWordOutlined } from '@ant-design/icons'
import { Typography, Table, TableColumnsType,Button, Popconfirm } from "antd"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { ExpandedDataType } from '../types'
import { EquipReestrType, deleteEquipDocument, getCurrentEquipData, updateEquipWorkData, updateReestrDocsCodeEquip, uploadEquipDocument } from '../../../redux/equipmentReducer'
import { DatePickerForWork } from '../../helpers/DatePickerForWork'

const { Text } = Typography

type EquipTasks = {
    myEquipDataIdArray: string[]
    myEquipData: EquipReestrType[]
    rec: any
    error: (fileName: string) => void
}

export const EquipTasks: React.FC<EquipTasks> = ({myEquipDataIdArray, myEquipData, rec, error}) => {
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
                    return  <>
                        <Text type="success" style={{width: '95%'}}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + vp} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                            >
                            <Button size="small" danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="link" />
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
                    return  <>
                        <Text type="warning">Не загружен</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} />
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
                return nvp === '' ? <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp'), text: ''}} type="warning">Нет данных</Text> :
                                    <Text   type="success"
                                            editable={{
                                                onChange: (text: string) => { handleUpdateDocsCode(record.id, text, 'nvp')}
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
                    return  <>
                        <Text type="success" style={{width: '95%'}}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + vo} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                            >
                            <Button size="small" danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="link" />
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
                    return  <>
                        <Text type="warning">Не загружен</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} />
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
                return nvo === '' ? <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo'), text: ''}} type="warning">Нет данных</Text> :
                                    <Text   type="success"
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
                    return  <>
                        <Text type="success" style={{width: '95%'}}>{fileName}</Text>
                        <Button size="small" icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + pam} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                            >
                            <Button size="small" danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="link" />
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
                    return  <>
                        <Text type="warning">Не загружена</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button size="small" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} />
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

    return thisObject?.typeval === '1' ? (
        rec.class === 'Термостаты' ? <Table columns={[...protocolColumns, ...reportColumns, ...pamColumn, ...pam2Column, ...labelColumn]} dataSource={data} pagination={false} bordered /> :
        rec.class === 'Термоконтейнеры' ? <Table columns={[...protocolColumns, ...reportColumns, ...pamColumn]} dataSource={data} pagination={false} bordered />:
        <Table columns={[...protocolColumns, ...reportColumns, ...labelColumn]} dataSource={data} pagination={false} bordered />
    ) : thisObject?.typeval === '3' ? (
        rec.class === 'Термоконтейнеры' ? <Table columns={[...reportColumns]} dataSource={data} pagination={false} bordered /> :
        <Table columns={[...reportColumns, ...labelColumn]} dataSource={data} pagination={false} bordered />
    ) : null
}