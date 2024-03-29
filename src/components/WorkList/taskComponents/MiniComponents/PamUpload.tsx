import { Button, Popconfirm, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { deleteEquipDocument, getCurrentEquipData, uploadEquipTaskDocument } from "../../../../redux/Reducers/equipmentReducer"
import { DeleteOutlined, FileWordOutlined, UploadOutlined } from "@ant-design/icons"
import { deletePremDocument, getCurrentPremData, uploadPremTaskDocument } from "../../../../redux/Reducers/premisesReducer"
import { deleteSysDocument, getCurrentSysData, uploadSysTaskDocument } from "../../../../redux/Reducers/systemsReducer"
import { deleteProcDocument, getCurrentProcData, uploadProcTaskDocument } from "../../../../redux/Reducers/processesReducer"
import { getServerSelector } from "../../../../redux/Selectors/appSelectors"
import { WorkChangesDataType } from "../../../../redux/Reducers/workReducer"
import { TaskChanges } from "./TaskChanges"

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
    changes: WorkChangesDataType | undefined
}

export const PamUpload: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, error, access, changes }) => {
    const dispatch: AppDispatch = useDispatch()

    const server = useSelector(getServerSelector)

    const widthScreen = window.innerWidth

    if (data.pam !== '') {
        const fileSegments = data.pam.split('/')
        const fileName = fileSegments[fileSegments.length - 1]

        const handleDeleteDocument = async () => {
            if (objectType === 'equipment') {
                await dispatch(deleteEquipDocument(rec.id, data.id, 'pam', data.pam))
                await dispatch(getCurrentEquipData(myEquipDataIdArray))
            } else if (objectType === 'premises') {
                await dispatch(deletePremDocument(rec.id, data.id, 'pam', data.pam))
                await dispatch(getCurrentPremData(myPremDataIdArray))
            } else if (objectType === 'systems') {
                await dispatch(deleteSysDocument(rec.id, data.id, 'pam', data.pam))
                await dispatch(getCurrentSysData(mySysDataIdArray))
            } else if (objectType === 'processes') {
                await dispatch(deleteProcDocument(rec.id, data.id, 'pam', data.pam))
                await dispatch(getCurrentProcData(myProcDataIdArray))
            }
        }
        return <>
            <Text style={widthScreen < 1370 ? { fontSize: '10pt', width: '95%' } : widthScreen < 1605 ? { width: '95%' } : { fontSize: '11pt', width: '95%' }} type="success">{fileName}</Text>
            <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={server + data.pam} />
            <Popconfirm
                title='Подтвердите удаление'
                description='Вы уверены, что хотите удалить документ?'
                okText='Да'
                cancelText='Нет'
                onConfirm={handleDeleteDocument}
            >
                <Button disabled={access > 4} size="small" danger icon={<DeleteOutlined style={{ fontSize: '12pt' }} />} type="link" />
            </Popconfirm>
            {changes && <TaskChanges changes={changes} key={changes.id} />}
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
                        await dispatch(uploadEquipTaskDocument(rec.id, data.id, 'pam', e.currentTarget.files[0]))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    } else if (objectType === 'premises') {
                        await dispatch(uploadPremTaskDocument(rec.id, data.id, 'pam', e.currentTarget.files[0]))
                        await dispatch(getCurrentPremData(myPremDataIdArray))
                    } else if (objectType === 'systems') {
                        await dispatch(uploadSysTaskDocument(rec.id, data.id, 'pam', e.currentTarget.files[0]))
                        await dispatch(getCurrentSysData(mySysDataIdArray))
                    } else if (objectType === 'processes') {
                        await dispatch(uploadProcTaskDocument(rec.id, data.id, 'pam', e.currentTarget.files[0]))
                        await dispatch(getCurrentProcData(myProcDataIdArray))
                    }
                } else {
                    error(fileName)
                }
            }
        }
        return <>
            <Text style={widthScreen < 1370 ? { fontSize: '10pt' } : widthScreen < 1605 ? {} : { fontSize: '12pt' }} type="warning">Не загружена</Text>
            <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
            <Button disabled={access > 4} size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
        </>
    }
}