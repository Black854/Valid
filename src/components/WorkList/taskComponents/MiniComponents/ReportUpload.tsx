import { Button, Popconfirm, Typography } from "antd"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch } from "react-redux"
import { deleteEquipDocument, getCurrentEquipData, uploadEquipDocument } from "../../../../redux/Reducers/equipmentReducer"
import { DeleteOutlined, FileWordOutlined, UploadOutlined } from "@ant-design/icons"

const { Text } = Typography

type PropsType = {
    data: any,
    rec: any,
    myEquipDataIdArray: any
    error: (fileName: string) => void
}

export const ReportUpload: React.FC<PropsType> = ({ data, rec, myEquipDataIdArray, error }) => {
    const dispatch: AppDispatch = useDispatch()

    if (data.vo !== '') {
        const fileSegments = data.vo.split('/')
        const fileName = fileSegments[fileSegments.length - 1]
        const handleDeleteDocument = async () => {
            await dispatch(deleteEquipDocument(rec.id, data.id, 'vo', data.vo))
            await dispatch(getCurrentEquipData(myEquipDataIdArray))
        }
        return <>
            <Text type="success" style={{ width: '95%' }}>{fileName}</Text>
            <Button size="small" icon={<FileWordOutlined style={{ fontSize: '12pt' }} />} type="link" href={'http://10.85.10.212/ov/' + data.vo} />
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
                    await dispatch(uploadEquipDocument(rec.id, data.id, 'vo', e.currentTarget.files[0]))
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
}