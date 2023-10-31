import { Table } from "antd"

type PremDescriptionsPropsType = {
    columns: any
    data: any
}

export const PremDescriptions: React.FC<PremDescriptionsPropsType> = ({columns, data}) => {
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='rowName'
            />
        </>
    )
}