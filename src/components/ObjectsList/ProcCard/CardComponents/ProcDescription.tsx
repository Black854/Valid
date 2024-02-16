import { Table } from "antd"
import { useSelector } from "react-redux"
import { getIsDescriptionLoading } from "../../../../redux/Selectors/processesSelectors"

type ProcDescriptionsPropsType = {
    columns: any
    data: any
}

export const ProcDescriptions: React.FC<ProcDescriptionsPropsType> = ({columns, data}) => {
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