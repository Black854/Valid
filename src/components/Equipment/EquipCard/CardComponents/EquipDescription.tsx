import { Table, Typography } from "antd"

type EquipDescriptionsPropsType = {
    columns: any
    data: any
}

const EquipDescriptions: React.FC<EquipDescriptionsPropsType> = ({columns, data}) => {
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

 export default EquipDescriptions