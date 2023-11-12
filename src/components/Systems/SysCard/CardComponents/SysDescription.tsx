import { Table } from "antd"

type SysDescriptionsPropsType = {
    columns: any
    data: any
}

export const SysDescriptions: React.FC<SysDescriptionsPropsType> = ({columns, data}) => {
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='rowName'
                size="small"
            />
        </>
    )
}