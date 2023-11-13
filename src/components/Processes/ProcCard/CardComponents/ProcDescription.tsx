import { Table } from "antd"

type ProcDescriptionsPropsType = {
    columns: any
    data: any
}

export const ProcDescriptions: React.FC<ProcDescriptionsPropsType> = ({columns, data}) => {
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