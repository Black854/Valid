import { Table } from "antd"
import { useSelector } from "react-redux"
import { getIsDescriptionLoading } from "../../../../redux/Selectors/systemsSelectors"

type SysDescriptionsPropsType = {
    columns: any
    data: any
}

export const SysDescriptions: React.FC<SysDescriptionsPropsType> = ({columns, data}) => {
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