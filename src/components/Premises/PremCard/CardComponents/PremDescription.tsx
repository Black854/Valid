import { Table } from "antd"
import { useSelector } from "react-redux"
import { getIsDescriptionLoading } from "../../../../redux/Selectors/premisesSelectors"

type PremDescriptionsPropsType = {
    columns: any
    data: any
}

export const PremDescriptions: React.FC<PremDescriptionsPropsType> = ({columns, data}) => {
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