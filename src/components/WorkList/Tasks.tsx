import { PremTasks } from "./taskComponents/PremTasks"
import { EquipTasks } from "./taskComponents/EquipTasks"
import { SysTasks } from "./taskComponents/SysTasks"
import { ProcTasks } from "./taskComponents/ProcTasks"
import { ColumnsType } from "antd/es/table"
import { Typography, Table, Row, Col } from "antd"
import { PremReestrType } from "../../redux/Reducers/premisesReducer"
import { EquipReestrType } from "../../redux/Reducers/equipmentReducer"
import { SysReestrType } from "../../redux/Reducers/systemsReducer"
import { ProcReestrType } from "../../redux/Reducers/processesReducer"
import { Content } from "antd/es/layout/layout"
import { JSXElementConstructor, ReactElement } from "react"
import { WorkChangesDataType } from "../../redux/Reducers/workReducer"

const { Text } = Typography

type DataType = {
    objectType: "equipment" | "premises" | "systems" | "processes";
    id: string;
    key: string;
    sp2: string;
    name: string;
    nomer: string;
    class: string;
    mode: string;
    date: string;
    ar: string;
    foto: string;
    fio: string;
}

interface TasksPropsType {
    columns: ColumnsType<DataType>
    myPremData: PremReestrType[]
    myEquipData: EquipReestrType[]
    mySysData: SysReestrType[]
    myProcData: ProcReestrType[]
    error: (fileName: string) => void
    myPremDataIdArray: string[]
    myEquipDataIdArray: string[]
    mySysDataIdArray: string[]
    myProcDataIdArray: string[]
    access: number
    data: DataType[]
    isLoading: boolean
    contextHolder: ReactElement<any, string | JSXElementConstructor<any>>
    tasksType: string
    tasksChanges:  WorkChangesDataType[]
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    return <>
        <Content style={{ padding: '20px 0', marginBottom: '60px' }}>
            {props.contextHolder}
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={props.columns}
                        expandable={{
                            expandedRowRender: (rec) => {
                                return rec.objectType === 'premises' ? <PremTasks tasksChanges={props.tasksChanges.filter(e => e.objectType === 'premises' && e.objectId === rec.id)} myPremData={props.myPremData} error={props.error} rec={rec} myPremDataIdArray={props.myPremDataIdArray} access={props.access} /> :
                                    rec.objectType === 'equipment' ? <EquipTasks tasksChanges={props.tasksChanges.filter(e => e.objectType === 'equipment' && e.objectId === rec.id)} myEquipData={props.myEquipData} error={props.error} rec={rec} myEquipDataIdArray={props.myEquipDataIdArray} access={props.access} /> :
                                        rec.objectType === 'systems' ? <SysTasks tasksChanges={props.tasksChanges.filter(e => e.objectType === 'systems' && e.objectId === rec.id)} mySysData={props.mySysData} error={props.error} rec={rec} mySysDataIdArray={props.mySysDataIdArray} access={props.access} /> :
                                            rec.objectType === 'processes' ? <ProcTasks tasksChanges={props.tasksChanges.filter(e => e.objectType === 'processes' && e.objectId === rec.id)} myProcData={props.myProcData} error={props.error} rec={rec} myProcDataIdArray={props.myProcDataIdArray} access={props.access} /> :
                                                null
                            }
                        }}
                        dataSource={props.data}
                        bordered={false}
                        pagination={false}
                        title={() => <Text style={{ fontSize: '14pt' }}>{props.tasksType} (всего: {props.data.length})</Text>}
                        size="small"
                        loading={props.isLoading}
                    />
                </Col>
            </Row>
        </Content>
    </>
}