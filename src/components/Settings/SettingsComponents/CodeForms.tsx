import { Button, Table, Typography, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { CodeSettingsType, getCodeSettings, setCodeFormsData, uploadCodeForm } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getCodeFormsIsLoadingSelector, getCodeSettingsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"
import { UploadOutlined } from "@ant-design/icons"

const { Text } = Typography

export const CodeForms: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage()
    
    const error = (fileName: string) => {
        messageApi.open({
          type: 'error',
          content: `Расширение файла ${fileName} не соответствует разрешенным`,
        })
    }
    useEffect(() => {
        dispatch(getCodeSettings())
    }, [])

    const codeSettingsData = useSelector(getCodeSettingsSelector)
    const codeFormsIsLoading = useSelector(getCodeFormsIsLoadingSelector)

    const columns: ColumnsType<CodeSettingsType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
        },
        {
            title: <Text>Наименование печатной формы</Text>,
            dataIndex: 'formname',
        },
        {
            title: <Text>Кодировка печатной формы</Text>,
            dataIndex: 'codeform',
            render: (text, record) => <Text editable={{ onChange: (text) => { handleUpdateCodeForm(record.id, text) } }}>{text}</Text>,
        },
    ]

    const data: CodeSettingsType[] = codeSettingsData.map((item, index) => ({
        ...item,
        index: index + 1,
        key: item.id
    }))

    const uploadColumns: ColumnsType<any> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'id',
            align: 'center',
        },
        {
            title: <Text>Наименование печатной формы</Text>,
            dataIndex: 'formname',
        },
        {
            title: <Text>Действия</Text>,
            render: () => <><input id="uploadForm" accept=".pdf" type="file" style={{display: 'none'}} onChange={onSelectFile} ref={(input) => (fileInputRef = input)} />
            <Button htmlType="submit" icon={<UploadOutlined style={{fontSize: '12pt'}} />} size='small' type="primary" onClick={() => fileInputRef.click()}>Загрузить актуальную форму</Button></>,
        },
    ]
    
    let fileInputRef: any = null
    
    const uploadData = [{
        id: '1',
        codeform: '',
        formname: 'Бланк несоответствия',
        key: 'uploadTableElement'
    }]

    const handleUpdateCodeForm = (id: string, codeform: string) => {
        dispatch(setCodeFormsData(id, codeform))
    }

    const onSelectFile = (e: any) => {
        if (e.currentTarget.files.length > 0) {
            const fileName = e.currentTarget.files[0].name
            // Получите расширение файла, разделенное точкой
            const fileExtension = fileName.split('.').pop()

            // Список разрешенных расширений
            const allowedExtensions = ['pdf']

            if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                // Файл соответствует разрешенному расширению, вы можете отправить его на сервер
                dispatch(uploadCodeForm(e.currentTarget.files[0]))
            } else {
                // Файл имеет недопустимое расширение
                error(fileName)
            }
        }
    }

    return <>
        {contextHolder}
        <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    Настройки кодировок печатных форм
                </Text>
            </>}
            size="small"
            loading={codeFormsIsLoading}
        />

        <Table
            columns={uploadColumns}
            dataSource={uploadData}
            bordered={false}
            pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
            style={{ marginTop: '50px' }}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    Загрузка актуальных версий печатных форм
                </Text>
            </>}
            size="small"
            loading={codeFormsIsLoading}
        />
    </>
}