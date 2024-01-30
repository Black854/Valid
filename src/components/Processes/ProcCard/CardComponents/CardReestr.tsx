import { Button, Popconfirm, Table, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect } from "react"
import { ColumnsType } from "antd/es/table"
import { ConvertDate } from "../../../common/convertDate"
import { FileWordOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../../../redux/store"
import { deleteProcDocument, getProcReestrData, updateReestrDocsCodeProc, uploadProcDocument } from "../../../../redux/Reducers/processesReducer"
import { AddReestrData } from "../../../common/AddReestrData"
import { getUserDataAccessSelector } from "../../../../redux/Selectors/authSelectors"

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

export const CardReestr: React.FC<CardReestrPropsType> = ({ id, isReestrDataLoading, reestrData, group }) => {
    const reestrDataWithoutEmptyRows = reestrData.filter(e => e.dvo !== '')
    const access = parseInt(useSelector(getUserDataAccessSelector))

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getProcReestrData(id))
    }, [id])

    const [messageApi, contextHolder] = message.useMessage()

    const error = (fileName: string) => {
        messageApi.open({
            type: 'error',
            content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }
    const handleUpdateDocsCode = (recordId: string, text: string, dataType: 'nvp' | 'nvo') => {
        dispatch(updateReestrDocsCodeProc(id, recordId, text, dataType))
    }
    let columns: ColumnsType<reestrDataItemType> = [
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Код протокола</Text>,
            dataIndex: 'nvp',
            render: (nvp, record) => {
                if (record.vp) {
                    const handleDeleteDocument = () => {
                        dispatch(deleteProcDocument(id, record.id, 'vp', record.vp))
                    }
                    return <>
                        <Text style={{ width: '90%' }} editable={access > 2 ? false : { onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp') }}>
                            {nvp}
                        </Text>
                        <Button icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + record.vp} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                        >
                            <Button disabled={access > 2} danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
                        </Popconfirm>
                    </>
                } else if (record.nvp !== '') {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            const fileExtension = fileName.split('.').pop()
                            const allowedExtensions = ['doc', 'docx']

                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                dispatch(uploadProcDocument(id, record.id, 'vp', e.currentTarget.files[0]))
                            } else {
                                error(fileName)
                            }
                        }
                    }
                    return <><Text editable={access > 2 ? false : { onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvp') }}>{nvp}</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button disabled={access > 2} icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
                } else {
                    return <Text>{nvp}</Text>
                }
            },
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Дата</Text>,
            dataIndex: 'dvp',
            render: (dvp, record) => { return <ConvertDate date={dvp} objectId={id} dateType='dvp' id={record.id} key={record.id} group="processes" access={access} /> },
            width: '11%',
            align: 'center',
        },
        {
            title: <Text strong style={{ fontSize: '12pt', textAlign: 'center' }}>Код отчета</Text>,
            dataIndex: 'nvo',
            render: (nvo, record) => {
                if (record.vo) {
                    const handleDeleteDocument = () => {
                        dispatch(deleteProcDocument(id, record.id, 'vo', record.vo))
                    }
                    return <>
                        <Text style={{ width: '95%' }} editable={access > 2 ? false : { onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo') }}>{nvo}</Text>
                        <Button icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + record.vo} />
                        <Popconfirm
                            title='Подтвердите удаление'
                            description='Вы уверены, что хотите удалить документ?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={handleDeleteDocument}
                        >
                            <Button disabled={access > 2} danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
                        </Popconfirm>
                    </>
                } else if (record.nvo !== '') {
                    let uploadDocumentRef: any = null
                    const onSelectDocument = (e: any) => {
                        if (e.currentTarget.files.length > 0) {
                            const fileName = e.currentTarget.files[0].name
                            const fileExtension = fileName.split('.').pop()
                            const allowedExtensions = ['doc', 'docx']

                            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                                dispatch(uploadProcDocument(id, record.id, 'vo', e.currentTarget.files[0]))
                            } else {
                                error(fileName)
                            }
                        }
                    }
                    return <>
                        <Text editable={access > 2 ? false : { onChange: (text: string) => handleUpdateDocsCode(record.id, text, 'nvo') }}>{nvo}</Text>
                        <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
                        <Button disabled={access > 2} icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} /></>
                } else {
                    return <Text>{nvo}</Text>
                }
            },
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Дата</Text>,
            dataIndex: 'dvo',
            sorter: (a, b) => {
                const dateA: any = new Date(a.dvo);
                const dateB: any = new Date(b.dvo);
                return dateA - dateB;
            },
            render: (dvo, record) => { return <ConvertDate date={dvo} objectId={id} dateType='dvo' id={record.id} key={record.id} group="processes" access={access} /> },
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            width: '11%',
            align: 'center'
        },
    ]

    return <>
        {contextHolder}
        <AddReestrData id={id} objectType='processes' />
        <Table
            columns={columns}
            dataSource={reestrDataWithoutEmptyRows}
            bordered
            pagination={false}
            style={{ marginBottom: '60px' }}
            rowKey='id'
            loading={isReestrDataLoading}
            size="small"
        />
    </>
}