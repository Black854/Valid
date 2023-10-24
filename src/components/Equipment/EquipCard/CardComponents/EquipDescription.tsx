import { Table, Typography } from "antd"
const { Text } = Typography

type EquipDescriptionsPropsType = {
    columns: any
    data: any
    name: string
}

const EquipDescriptions: React.FC<EquipDescriptionsPropsType> = ({columns, data, name}) => {
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                // title={() => <Text style={{fontSize: '14pt', color: '#4096ff'}}>{name}</Text>}
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='rowName'
            />
        </>
    )
}

 export default EquipDescriptions