import { Button, Popconfirm, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { deleteEquipDocument, getCurrentEquipData, uploadEquipDocument } from "../../../../redux/Reducers/equipmentReducer"
import { DeleteOutlined, FileWordOutlined, UploadOutlined } from "@ant-design/icons"
import { deletePremDocument, getCurrentPremData, uploadPremDocument } from "../../../../redux/Reducers/premisesReducer"
import { deleteSysDocument, getCurrentSysData, uploadSysDocument } from "../../../../redux/Reducers/systemsReducer"
import { deleteProcDocument, getCurrentProcData, uploadProcDocument } from "../../../../redux/Reducers/processesReducer"
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

export const ProtocolUpload: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, myPremDataIdArray, mySysDataIdArray, myProcDataIdArray, objectType, error, access }) => {
    const dispatch: AppDispatch = useDispatch()

    const server = useSelector(getServerSelector)

    if (data.vp !== '') {
        const fileSegments = data.vp.split('/')
        const fileName = fileSegments[fileSegments.length - 1]
        const handleDeleteDocument = async () => {
            if (objectType === 'equipment') {
                await dispatch(deleteEquipDocument(rec.id, data.id, 'vp', data.vp))
                await dispatch(getCurrentEquipData(myEquipDataIdArray))
            } else if (objectType === 'premises') {
                await dispatch(deletePremDocument(rec.id, data.id, 'vp', data.vp))
                await dispatch(getCurrentPremData(myPremDataIdArray))
            } else if (objectType === 'systems') {
                await dispatch(deleteSysDocument(rec.id, data.id, 'vp', data.vp))
                await dispatch(getCurrentSysData(mySysDataIdArray))
            } else if (objectType === 'processes') {
                await dispatch(deleteProcDocument(rec.id, data.id, 'vp', data.vp))
                await dispatch(getCurrentProcData(myProcDataIdArray))
            }
        }
        return <>
            <Text type="success" style={{ width: '95%' }}>{fileName}</Text>
            <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={server + data.vp} />
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
                        await dispatch(uploadEquipDocument(rec.id, data.id, 'vp', e.currentTarget.files[0]))
                        await dispatch(getCurrentEquipData(myEquipDataIdArray))
                    } else if (objectType === 'premises') {
                        await dispatch(uploadPremDocument(rec.id, data.id, 'vp', e.currentTarget.files[0]))
                        await dispatch(getCurrentPremData(myPremDataIdArray))
                    } else if (objectType === 'systems') {
                        await dispatch(uploadSysDocument(rec.id, data.id, 'vp', e.currentTarget.files[0]))
                        await dispatch(getCurrentSysData(mySysDataIdArray))
                    } else if (objectType === 'processes') {
                        await dispatch(uploadProcDocument(rec.id, data.id, 'vp', e.currentTarget.files[0]))
                        await dispatch(getCurrentProcData(myProcDataIdArray))
                    }
                } else {
                    error(fileName)
                }
            }
        }
        return <>
            <Text type="warning">Не загружен</Text>
            <input id="uploadDocument" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" type="file" style={{ display: 'none' }} onChange={onSelectDocument} ref={(input) => (uploadDocumentRef = input)} />
            <Button disabled={access > 4} size="small" icon={<UploadOutlined style={{ fontSize: '12pt' }} />} type="link" onClick={() => uploadDocumentRef.click()} />
        </>
    }
}