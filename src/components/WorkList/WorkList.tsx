import { Typography, Col, Image, Row, Spin, Table, Badge, Space, Dropdown, TableColumnsType, Progress, Button, Popconfirm, message } from "antd"
import { Content } from "antd/es/layout/layout"
import type { ColumnsType } from 'antd/es/table'
import { useDispatch, useSelector } from "react-redux"
import { getPremData, getIsLoading, getCurrentPremDataSelector } from "../../redux/premisesSelectors"
import { EyeOutlined} from '@ant-design/icons'
import { RenderDateHelper } from "../helpers/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { ReestrType, deletePremDocument, getCurrentPremData, getPremises, getReestrData, updatePremWorkData, updateReestrDocsCodePrem, uploadPremDocument } from "../../redux/premisesReducer"
import { getCurrentEquipData, getEquipData } from "../../redux/equipmentSelectors"
import { getAuthUserNameSelector } from "../../redux/authSelectors"
import { DownOutlined, DeleteOutlined, UploadOutlined, FileWordOutlined } from '@ant-design/icons'
import { getEquipment } from "../../redux/equipmentReducer"
import { ConvertDate } from "../helpers/convertDate"
import { DatePickerForWork } from "../helpers/DatePickerForWork"

const { Text } = Typography
  
export const WorkList: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }

    const dispatch: AppDispatch = useDispatch()

    const premData = useSelector(getPremData)
    const equipData = useSelector(getEquipData)
    const isLoading = useSelector(getIsLoading)
    const AuthUserName = useSelector(getAuthUserNameSelector)

    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
    }, [])

    const premNewData = premData.map(e => ({
        objectType: 'premises' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.class,
        mode: e.mode,
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)
    
    const equipNewData = equipData.map(e => ({
        objectType: 'equipment' as 'equipment' | 'premises' | 'systems' | 'processes',
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        class: e.groupp,
        mode: 'none',
        date: e.date,
        ar: e.ar,
        foto: e.foto,
        fio: e.fio
    })).filter(e => e.fio === AuthUserName)

    const myPremDataIdArray = premNewData.map(e => e.id)
    const myEquipDataIdArray = equipNewData.map(e => e.id)
    
    const myPremData = useSelector(getCurrentPremDataSelector)
    const myEquipData = useSelector(getCurrentEquipData)

    if (myPremDataIdArray.length > 0 && myPremData.length === 0) {
        dispatch(getCurrentPremData(myPremDataIdArray))
    }


    type DataType = typeof premNewData[0]
    const data: DataType[] = [...premNewData, ...equipNewData]

    const columns: ColumnsType<DataType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
            dataIndex: 'index',
            render: (text, record, index) => index + 1,
            align: 'center'
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Наименование</Text>,
            dataIndex: 'name',
            render: (text, record) => (
            <Row>
                <Col span={1}>
                    <Image style={{
                        maxWidth: '30px',
                        maxHeight: '30px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden'}} 
                        src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
                        preview = {{mask: <EyeOutlined style={{fontSize: '12pt'}} />}}
                    />
                </Col>
                <Col span={23}>
                    <NavLink to={'/' + record.objectType + '/' + record.id} style={{fontSize: '12pt', marginLeft: '10px'}}>
                        {record.class==='Складские' ? `Помещение ${record.nomer} «${text}»` : text}
                    </NavLink>
                </Col>  
            </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Прогресс</Text>,
            render: (text, record, index) => {
                let a: number = 0
                let b: number = 1
                const thisObject = myPremData.find(e => e.idfromtable === record.id)
                if (record.objectType === 'premises') {
                    if (record.class === 'Чистые' || record.class === 'Контролируемые') {
                        b = 7
                        a += thisObject?.vp !== '' ? 1 : 0
                        a += thisObject?.nvp !== '' ? 1 : 0
                        a += thisObject?.dvp !== '' ? 1 : 0
                        a += thisObject?.vo !== '' ? 1 : 0
                        a += thisObject?.nvo !== '' ? 1 : 0
                        a += thisObject?.dvo !== '' ? 1 : 0
                        a += thisObject?.et !== '' ? 1 : 0
                    } else {
                        if (record.mode === '2 - 8 ºC' || record.mode === 'минус 30 - 35 ºC') {
                            b = 10
                            a += thisObject?.vp !== '' ? 1 : 0
                            a += thisObject?.nvp !== '' ? 1 : 0
                            a += thisObject?.dvp !== '' ? 1 : 0
                            a += thisObject?.vo !== '' ? 1 : 0
                            a += thisObject?.nvo !== '' ? 1 : 0
                            a += thisObject?.dvo !== '' ? 1 : 0
                            a += thisObject?.et !== '' ? 1 : 0
                            a += thisObject?.season !== '' ? 1 : 0
                            a += thisObject?.pam !== '' ? 1 : 0
                            a += thisObject?.pam2 !== '' ? 1 : 0
                        } else {
                            b = 8
                            a += thisObject?.vp !== '' ? 1 : 0
                            a += thisObject?.nvp !== '' ? 1 : 0
                            a += thisObject?.dvp !== '' ? 1 : 0
                            a += thisObject?.vo !== '' ? 1 : 0
                            a += thisObject?.nvo !== '' ? 1 : 0
                            a += thisObject?.dvo !== '' ? 1 : 0
                            a += thisObject?.et !== '' ? 1 : 0
                            a += thisObject?.season !== '' ? 1 : 0
                        }
                    }
                }
                
                let c = Math.round((a/b)*100)
                return <Progress percent={c} size="small" status={c === 100 ? 'success' : 'normal'} />
            },
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Подразделение</Text>,
            dataIndex: 'sp2',
            filters: [
                { text: 'МБЛ', value: 'МБЛ' },
                { text: 'БХЛ', value: 'БХЛ' },
                { text: 'ФХЛ', value: 'ФХЛ' },
                { text: 'ЛИП', value: 'ЛИП' },
                { text: 'ЦС', value: 'ЦС' },
                { text: 'ГК', value: 'ГК' },
            ],
            render: (sp) => <Text>{sp}</Text>,
            onFilter: (value: any, record) => record.sp2.indexOf(value) === 0,
            sorter: (a, b) => a.sp2.localeCompare(b.sp2),
            sortDirections: ['descend'],
            width: '12%',
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
    ]






    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    }
    return (
        <Content style={{padding: '20px 0',  marginBottom: '60px' }}>
            {contextHolder}
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        expandable={{
                            expandedRowRender: (rec) => {
                                type ExpandedDataType = {
                                    key: React.Key
                                    id: string,
                                    progress: string,
                                    vp: string,
                                    nvp: string,
                                    dvp: string,
                                    vo: string,
                                    nvo: string,
                                    dvo: string,
                                    et: string
                                }

                                const handleUpdateDocsCode = async (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
                                    if (rec.objectType === 'premises') {
                                        await dispatch(updateReestrDocsCodePrem(rec.id, recordId, text, dataType))
                                        await dispatch(getCurrentPremData(myPremDataIdArray))
                                    }
                                }

                                const columns: TableColumnsType<ExpandedDataType> = [
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
                                                    await dispatch(deletePremDocument(rec.id, record.id, 'vp', vp))
                                                    await dispatch(getCurrentPremData(myPremDataIdArray))
                                                }
                                                return  <>
                                                    <Text style={{width: '95%'}}>{fileName}</Text>
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
                                                            await dispatch(uploadPremDocument(rec.id, record.id, 'vp', e.currentTarget.files[0]))
                                                            await dispatch(getCurrentPremData(myPremDataIdArray))
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
                                            return <DatePickerForWork date={dvp} premId={record.id} dateType='dvp' id={record.id} key={record.id} group={rec.objectType} myDataIdArray={myPremDataIdArray} />
                                        }
                                    },
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
                                                    await dispatch(deletePremDocument(rec.id, record.id, 'vo', vo))
                                                    await dispatch(getCurrentPremData(myPremDataIdArray))
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
                                                            await dispatch(uploadPremDocument(rec.id, record.id, 'vo', e.currentTarget.files[0]))
                                                            await dispatch(getCurrentPremData(myPremDataIdArray))
                                                        } else {
                                                            // Файл имеет недопустимое расширение
                                                            error(fileName)
                                                        }
                                                    }
                                                }
                                                return  <>
                                                            <Text type="warning">Не загружен</Text>
                                                            <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                                                            <Button size="small" icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
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
                                            return <DatePickerForWork date={dvo} premId={record.id} dateType='dvo' id={record.id} key={record.id} group={rec.objectType} myDataIdArray={myPremDataIdArray} />
                                        }
                                    },
                                    {
                                        title: 'Этикетка',
                                        dataIndex: 'et',
                                        key: 'et',
                                        align: 'center',
                                        render: (et, record) => {
                                            const handleLabelSwitch = async (pol: string) => {
                                                await dispatch(updatePremWorkData(record.id, 'et', pol))
                                                await dispatch(getCurrentPremData(myPremDataIdArray))
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

                                if (rec.objectType === 'premises') {
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

                                    return (
                                        (rec.class === 'Чистые' ||  rec.class === 'Контролируемые') ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                        rec.class === 'Складские' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> : null
                                    )
                                } 
                                // else if (rec.objectType === 'equipment') {
                                //     let data: any = [{
                                //         key: '1',
                                //         progress: '',
                                //         vp: '',
                                //         nvp: '',
                                //         dvp: '',
                                //         vo: '',
                                //         nvo: '',
                                //         dvo: '',
                                //         et: ''
                                //     }]

                                //     const data2 = myEquipData.find(e => e.idfromtable === rec.id)

                                //     if (data2 !== undefined) {
                                //         data = [data2]
                                //     }

                                //     return (
                                //         rec.class === 'Термостаты' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                //         rec.class === 'Тех. оборудование' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                //         rec.class === 'Лаб. оборудование' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                //         rec.class === 'Термоконтейнеры' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                //         rec.class === 'Авторефрижераторы' ? <Table columns={columns} dataSource={data} pagination={false} bordered /> :
                                //         <Table columns={columns} dataSource={data} pagination={false} bordered /> 
                                //     )
                                // }
                            }
                        }}
                        dataSource={data}
                        bordered
                        pagination={false}
                        title={() => <Text style={{fontSize: '14pt'}}>Мои задачи (всего: {data.length})</Text>}
                        size="small"
                    /> 
                </Col>
            </Row>
        </Content>
    )
}