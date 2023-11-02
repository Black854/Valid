import { Select, Table, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../redux/store"
import { getCleanPremListSelector, getIsCleanPremDataLoading } from "../../../../redux/premisesSelectors"
import { CleanPremListType, getCleanPremList, updateCleanPremItemData } from "../../../../redux/premisesReducer"
import { getDepartmentsSelector } from "../../../../redux/appSelectors"
import { ColumnsType } from "antd/es/table"
const {Text} = Typography

type TechnicalInfoPropsType = {
    id: string
}

export const CleanPremList: React.FC<TechnicalInfoPropsType> = ({ id }) => {
    const dispatch: AppDispatch = useDispatch()
    const cleanPremList = useSelector(getCleanPremListSelector)
    const departments = useSelector(getDepartmentsSelector)
    const isCleanPremDataLoading = useSelector(getIsCleanPremDataLoading)
    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))
    useEffect(() => {
        dispatch(getCleanPremList(id))
    }, [])

    const handleUpdateCleanPrem = (recordId: string, text: string, dataType: 'nomer' | 'sp' | 'name') => {
        dispatch(updateCleanPremItemData(id, recordId, text, dataType))
    }

    const columns: ColumnsType<CleanPremListType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Номер помещения</Text>,
            dataIndex: 'nomer',
            render: (nomer, record) => <Text editable={{onChange: (text: string) => {handleUpdateCleanPrem(record.id, text, 'nomer')}, text: nomer}} >{`№ ${nomer}`}</Text>
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Ответственное подразделение</Text>,
            dataIndex: 'sp',
            align: 'center',
            render: (sp, record) => <Select
                                        defaultValue={sp}
                                        onChange={(text) => handleUpdateCleanPrem(record.id, text, 'sp')}
                                        size="small"
                                        dropdownStyle={{width: '120px'}}
                                        style={{paddingRight: '20px', marginLeft: '-7px'}}
                                        bordered={false}
                                        options={departmentData}
                                    />
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Наименование</Text>,
            dataIndex: 'name',
            render: (name, record) => <Text editable={{onChange: (text: string) => {handleUpdateCleanPrem(record.id, text, 'name')}, text: name}} >{name}</Text>
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={cleanPremList}
            bordered
            pagination={false} // Скрыть пагинацию, если есть
            rowKey='id'
            style={{marginBottom: '60px'}}
            loading={isCleanPremDataLoading}
        />
    )
    
}