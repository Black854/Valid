import { Button, Popconfirm, Table, Typography } from "antd"
import { useDispatch } from "react-redux"
import { deleteDocument, updateReestrDocsCode, uploadDocument } from "../../../../redux/equipmentReducer"
import React from "react"
import { ColumnsType } from "antd/es/table"
import { ConvertDate } from "../../../helpers/convertDate"
import { FileWordOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../../../redux/store"
const { Text } = Typography


type reestrDataItemType = {
    id: string
    nvo: string
    vo: string
    dvo: string
    nvp: string
    vp: string
    dvp: string
    pam: string
}

type DataType = Array<reestrDataItemType>

type CardReestrPropsType = {
    id: string
    isReestrDataLoading: boolean
    reestrData: DataType
    group: string
}

export const CardReestr: React.FC<CardReestrPropsType> = ({id, isReestrDataLoading, reestrData, group}) => {
    const reestrDataWithoutEmptyRows = reestrData.filter(e => e.dvo !== '')

    const dispatch: AppDispatch = useDispatch()
    const handleUpdateDocsCode = (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        dispatch(updateReestrDocsCode(id, recordId, text, dataType))
    }
    const columns: ColumnsType<reestrDataItemType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Код протокола</Text>,
            dataIndex: 'nvp',
            render: (nvp, record) => {
                if (record.vp) {
                    const handleDeleteDocument = () => {
                        dispatch(deleteDocument(id, record.id, 'vp', record.vp))
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
                        dispatch(uploadDocument(id, record.id, 'vp', e.currentTarget.files[0]))
                    }
                    return <><Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp')}}>{nvp}</Text>
                    <input id="uploadDocument" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                    <Button icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
                } else {
                    return <Text>{nvp}</Text>
                }
            },
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата</Text>,
            dataIndex: 'dvp',
            render: (dvp, record) => { return <ConvertDate date={dvp} equipId={id} dateType='dvp' id={record.id} key={record.id} /> },
            width: '10%',
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt', textAlign: 'center'}}>Код отчета</Text>,
            dataIndex: 'nvo',
            render: (nvo, record) => {
                if (record.vo) {
                    const handleDeleteDocument = () => {
                        dispatch(deleteDocument(id, record.id, 'vo', record.vo))
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
                        dispatch(uploadDocument(id, record.id, 'vo', e.currentTarget.files[0]))
                    }
                    return  <>
                                <Text editable={{ onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo')}}>{nvo}</Text>
                                <input id="uploadDocument" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
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
            render: (dvo, record) => { return <ConvertDate date={dvo} equipId={id} dateType='dvo' id={record.id} key={record.id} /> },
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            width: '10%',
            align: 'center'
        },
    ];


    
    const pamColumn: ColumnsType<reestrDataItemType> = [{
        title: <Text strong style={{fontSize: '12pt'}}>Памятка</Text>,
        dataIndex: 'pam',
        render: (pam, record) =>  {
            if (pam) {
                const handleDeleteDocument = () => {
                    dispatch(deleteDocument(id, record.id, 'pam', pam))
                }
                return  <>
                            <Button icon={<FileWordOutlined style={{fontSize: '12pt'}} />} type="link" href={'http://10.85.10.212/ov/' + pam}>Просмотр</Button>
                            <Popconfirm
                                title='Подтвердите удаление'
                                description='Вы уверены, что хотите удалить документ?'
                                okText='Да'
                                cancelText='Нет'
                                onConfirm={handleDeleteDocument}
                            >
                                <Button danger icon={<DeleteOutlined style={{fontSize: '12pt'}} />} type="text" />
                            </Popconfirm>
                        </>
            } else {
                let uploadDocumentRef: any = null
                const onSelectDocument = (e: any) => {
                    dispatch(uploadDocument(id, record.id, 'pam', e.currentTarget.files[0]))
                }
                return <>
                <input id="uploadDocument" type="file" style={{display: 'none'}} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                <Button icon={<UploadOutlined style={{fontSize: '12pt'}} />} type="link" onClick={() => uploadDocumentRef.click()} /><Text type="secondary">Загрузить</Text></>
            }
        },
        width: '12%',
        align: 'center'
    }]

    if (group === '') {
        
    }

    return (
        <Table
            columns={columns}
            dataSource={reestrDataWithoutEmptyRows}
            bordered
            pagination={false} // Скрыть пагинацию, если есть
            style={{marginBottom: '30px'}}
            rowKey='id'
            loading={isReestrDataLoading}
        />
    )
}