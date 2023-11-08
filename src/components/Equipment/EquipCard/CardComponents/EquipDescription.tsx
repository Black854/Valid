import { Table } from "antd"

type EquipDescriptionsPropsType = {
    columns: any
    data: any
}

export const EquipDescriptions: React.FC<EquipDescriptionsPropsType> = ({columns, data}) => {
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