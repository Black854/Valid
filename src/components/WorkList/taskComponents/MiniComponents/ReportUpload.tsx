import { Button, Popconfirm, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { deleteEquipDocument, getCurrentEquipData, uploadEquipDocument } from "../../../../redux/Reducers/equipmentReducer"
import { DeleteOutlined, FileWordOutlined, UploadOutlined } from "@ant-design/icons"
import { deleteProcDocument, getCurrentProcData, uploadProcDocument } from "../../../../redux/Reducers/processesReducer"
import { deleteSysDocument, getCurrentSysData, uploadSysDocument } from "../../../../redux/Reducers/systemsReducer"
import { deletePremDocument, getCurrentPremData, uploadPremDocument } from "../../../../redux/Reducers/premisesReducer"
import { getServerSelector } from "../../../../redux/Selectors/appSelectors"

const { Text } = Typography

type PropsType = {
    data: any,
    rec: any,
    myEquipDataIdArray?: any,
    myPremDataIdArray?: any,
    mySysDataIdArray?: any,
    myProcDataIdArray?: any,
    objectType: 'equipment' | 'premises' | 'systems' | 'processes'
    error: (fileName: string) => void
    access: number
}

export const ReportUpload: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, error, access }) => {
    const dispatch: AppDispatch = useDispatch()

    const server = useSelector(getServerSelector)

    const widthScreen = window.innerWidth

    if (data.vo !== '') {
        const fileSegments = data.vo.split('/')
        const fileName = fileSegments[fileSegments.length - 1]
        const handleDeleteDocument = async () => {
            if (objectType === 'equipment') {
                await dispatch(deleteEquipDocument(rec.id, data.id, 'vo', data.vo))
                await dispatch(getCurrentEquipData(myEquipDataIdArray))
            } else if (objectType === 'premises') {
                await dispatch(deletePremDocument(rec.id, data.id, 'vo', data.vo))
                await dispatch(getCurrentPremData(myPremDataIdArray))
            } else if (objectType === 'systems') {
                await dispatch(deleteSysDocument(rec.id, data.id, 'vo', data.vo))
                await dispatch(getCurrentSysData(mySysDataIdArray))
            } else if (objectType === 'processes') {
                await dispatch(deleteProcDocument(rec.id, data.id, 'vo', data.vo))
                await dispatch(getCurrentProcData(myProcDataIdArray))
            }
        }
        return <>
            <Text style={widthScreen < 1370 ? { fontSize: '10pt', width: '95%' } : widthScreen < 1605 ? { width: '95%' } : { fontSize: '12pt', width: '95%' }} type="success" >{fileName}</Text>
            <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={server + data.vo} />
            <Popconfirm
                title='Подтвердите удаление'
                description='Вы уверены, что хотите удалить документ?'
                okText='Да'
                cancelText='Нет'
                onConfirm={handleDeleteDocument}
            >
                <Button disabled={access > 4} size="small" danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
            </Popconfirm>
        </>
    } else {
        let uploadDocumentRef: any = null
        const onSelectDocument = async (e: any) => {
            if (e.currentTarget.files.length > 0) {
                const fileName = e.currentTarget.files[0].name
                const fileExtension = fileName.split('.').pop()
                const allowedExtensions = ['doc', 'docx']

                if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    if (objectType === 'equipment') {
                        await dispatch(uploadEquipDocument(rec.id, data.id, 'vo', e.currentTarget.files[0]))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    } else if (objectType === 'premises') {
                        await dispatch(uploadPremDocument(rec.id, data.id, 'vo', e.currentTarget.files[0]))
                        await dispatch(getCurrentPremData(myPremDataIdArray))
                    } else if (objectType === 'systems') {
                        await dispatch(uploadSysDocument(rec.id, data.id, 'vo', e.currentTarget.files[0]))
                        await dispatch(getCurrentSysData(mySysDataIdArray))
                    } else if (objectType === 'processes') {
                        await dispatch(uploadProcDocument(rec.id, data.id, 'vo', e.currentTarget.files[0]))
                        await dispatch(getCurrentProcData(myProcDataIdArray))
                    }
                } else {
                    error(fileName)
                }
            }
        }
        return <>
            <Text type="warning" style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? { } : { fontSize: '12pt' }}>Не загружен</Text>
            <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
            <Button disabled={access > 4} size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
        </>
    }
}