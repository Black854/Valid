import { Button, Popconfirm, Table, Typography, message } from "antd"
import { useDispatch } from "react-redux"
import React from "react"
import { ColumnsType } from "antd/es/table"
import { ConvertDate } from "../../../common/convertDate"
import { FileWordOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { AppDispatch } from "../../../../redux/store"
import { PremReestrType, deletePremDocument, updateReestrDocsCodePrem, uploadPremDocument } from "../../../../redux/Reducers/premisesReducer"
const { Text } = Typography

type DataType = Array<PremReestrType>

type CardReestrPropsType = {
    id: string
    isReestrDataLoading: boolean
    reestrData: DataType
    group: string
    mode: string
}

export const CardReestr: React.FC<CardReestrPropsType> = ({id, isReestrDataLoading, reestrData, group, mode}) => {
    const reestrDataWithoutEmptyRows = reestrData.filter(e => e.dvo !== '')

    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    const error = (fileName: string) => {
        messageApi.open({
          type: 'error',
          content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }
    const handleUpdateDocsCode = (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        dispatch(updateReestrDocsCodePrem(id, recordId, text, dataType))
    }
    let columns: ColumnsType<PremReestrType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Код протокола</Text>,
            dataIndex: 'nvp',
            render: (nvp, record) => {
                if (record.vp) {
                    const handleDeleteDocument = () => {
                        dispatch(deletePremDocument(id, record.id, 'vp', record.vp))
                    }
                    return  <>
                                <Text style={{width: '90%'}} editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp')}}>
                                    {nvp}
                                </Text>
                                <Button icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + record.vp} />
                                <Popconfirm
                                    title='Подтвердите удаление'
                                    description='Вы уверены, что хотите удалить документ?'
                                    okText='Да'
                                    cancelText='Нет'
                                    onConfirm={handleDeleteDocument}
                                >
                                    <Button danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="link" />
                                </Popconfirm>
                            </>
                } else if (record.nvp !== '') {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            // Получите расширение файла, разделенное точкой
                            const fileExtension = fileName.split('.').pop()
                
                            // Список разрешенных расширений
                            const allowedExtensions = ['doc', 'docx']
                
                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                                dispatch(uploadPremDocument(id, record.id, 'vp', e.currentTarget.files[0]))
                            } else {
                                // Файл имеет недопустимое расширение
                                error(fileName)
                            }
                        }
                    }
                    return <><Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp')}}>{nvp}</Text>
                    <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                    <Button icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
                } else {
                    return <Text>{nvp}</Text>
                }
            },
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата</Text>,
            dataIndex: 'dvp',
            render: (dvp, record) => { return <ConvertDate date={dvp} objectId={id} dateType='dvp' id={record.id} key={record.id} group="premises" /> },
            width: '11%',
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt', textAlign: 'center'}}>Код отчета</Text>,
            dataIndex: 'nvo',
            render: (nvo, record) => {
                if (record.vo) {
                    const handleDeleteDocument = () => {
                        dispatch(deletePremDocument(id, record.id, 'vo', record.vo))
                    }
                    return  <>
                                <Text style={{width: '95%'}} editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo')}}>{nvo}</Text>
                                <Button icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + record.vo} />
                                <Popconfirm
                                    title='Подтвердите удаление'
                                    description='Вы уверены, что хотите удалить документ?'
                                    okText='Да'
                                    cancelText='Нет'
                                    onConfirm={handleDeleteDocument}
                                >
                                    <Button danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="link" />
                                </Popconfirm>
                            </>
                } else if (record.nvo !== '') {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            // Получите расширение файла, разделенное точкой
                            const fileExtension = fileName.split('.').pop()
                
                            // Список разрешенных расширений
                            const allowedExtensions = ['doc', 'docx']
                
                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                                dispatch(uploadPremDocument(id, record.id, 'vo', e.currentTarget.files[0]))
                            } else {
                                // Файл имеет недопустимое расширение
                                error(fileName)
                            }
                        }
                    }
                    return  <>
                                <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo')}}>{nvo}</Text>
                                <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                                <Button icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
                } else {
                    return <Text>{nvo}</Text>
                }
            },
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата</Text>,
            dataIndex: 'dvo',
            sorter: (a, b) => {
                // Используйте функцию сравнения дат для сортировки
                const dateA: any = new Date(a.dvo);
                const dateB: any = new Date(b.dvo);
                return dateA - dateB;
            },
            render: (dvo, record) => { return <ConvertDate date={dvo} objectId={id} dateType='dvo' id={record.id} key={record.id} group="premises" /> },
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            width: '11%',
            align: 'center'
        },
    ];

    const pamColumn: ColumnsType<PremReestrType> = [{
        title: <Text strong style={{fontSize: '12pt'}}>Памятка</Text>,
        dataIndex: 'pam',
        render: (pam, record) =>  {
            if (pam) {
                const handleDeleteDocument = () => {
                    dispatch(deletePremDocument(id, record.id, 'pam', pam))
                }
                return  <>
                            <Button icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + pam}>Открыть</Button>
                            <Popconfirm
                                title='Подтвердите удаление'
                                description='Вы уверены, что хотите удалить документ?'
                                okText='Да'
                                cancelText='Нет'
                                onConfirm={handleDeleteDocument}
                            >
                                <Button danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="text" >Удалить</Button>
                            </Popconfirm>
                        </>
            } else {
                let uploadDocumentRef: any = null
                const onSelectDocument = (e: any) => {
                    if (e.currentTarget.files.length > 0) {
                        const fileName = e.currentTarget.files[0].name
                        // Получите расширение файла, разделенное точкой
                        const fileExtension = fileName.split('.').pop()
            
                        // Список разрешенных расширений
                        const allowedExtensions = ['doc', 'docx']
            
                        if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                            // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                            dispatch(uploadPremDocument(id, record.id, 'pam', e.currentTarget.files[0]))
                        } else {
                            // Файл имеет недопустимое расширение
                            error(fileName)
                        }
                    }
                }
                return <>
                <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                <Button icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /><Text type="secondary">Загрузить</Text></>
            }
        },
        width: '12%',
        align: 'center'
    }]

    if (group === 'Складские' && (mode === '2 - 8 ºC' || mode === 'минус 30 - 35 ºC')) {
        columns=columns.concat(pamColumn)
    }

    return (
        <>
            {contextHolder}
            <Table
                columns={columns}
                dataSource={reestrDataWithoutEmptyRows}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                style={{marginBottom: '60px'}}
                rowKey='id'
                loading={isReestrDataLoading}
                size="small"
            />
        </>
    )
}