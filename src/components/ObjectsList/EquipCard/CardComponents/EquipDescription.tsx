import { Table } from "antd"
import { useSelector } from "react-redux"
import { getIsDescriptionLoading } from "../../../../redux/Selectors/equipmentSelectors"

type EquipDescriptionsPropsType = {
    columns: any
    data: any
}

export const EquipDescriptions: React.FC<EquipDescriptionsPropsType> = ({columns, data}) => {
    const isDescriptionLoading = useSelector(getIsDescriptionLoading)
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
                showHeader={false}
                rowKey='rowName'
                size="small"
                loading={isDescriptionLoading}
            />
        </>
    )
}