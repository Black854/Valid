import { Table } from "antd"

type InstDescriptionsPropsType = {
    columns: any
    data: any
}

export const InstDescriptions: React.FC<InstDescriptionsPropsType> = ({ columns, data }) => {
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