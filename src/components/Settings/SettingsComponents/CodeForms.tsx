import { Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { CodeSettingsType, DepartmentsType, getCodeSettings, getDepartments } from "../../../redux/Reducers/appReducer"
import { useDispatch, useSelector } from "react-redux"
import { getCodeSettingsSelector } from "../../../redux/Selectors/appSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../redux/store"

const { Text } = Typography

export const CodeForms: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getCodeSettings())
    }, [])

    const codeSettingsData = useSelector(getCodeSettingsSelector)

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
            render: (text) => <Text editable>{text}</Text>,
        },
    ]

    const data: CodeSettingsType[] = codeSettingsData.map((item, index) => ({
        ...item,
        index: index + 1,
      }))

    return <>
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
        />
    </>
}