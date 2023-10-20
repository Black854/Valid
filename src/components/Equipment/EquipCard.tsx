import { Col, Image, Row, Spin, Table, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getEquipById, getEquipData, getIsLoading } from "../../redux/equipmentSelectors";
import { AppStateType } from "../../redux/store";
import { getEquipment } from "../../redux/equipmentReducer";
import { ColumnsType } from "antd/es/table";
import { RenderDateHelper } from "../helpers/renderDateHelper";
const { Text } = Typography

export const EquipCard = () => {
    let { id } = useParams();
    let dispatch = useDispatch()
    let equipData = useSelector(getEquipData)
    let isLoading = useSelector(getIsLoading)
    const equipObject = useSelector((state: AppStateType) => getEquipById(state, id));
    if (equipData.length === 0) {
        //@ts-ignore
        dispatch(getEquipment())
    }
    if (isLoading) {
        return  <Spin size="large" style={{width: '60px', height: '60px', margin: '30px auto 10px auto'}} />
    } else if (equipObject) {
        interface DataType {
            ar: string
            date: string
            fio: string
            foto: string
            groupp: string
            id: string
            inv: string
            manual: string
            manufacturdate: string
            manufacturer: string
            name: string
            nomer: string
            sp: string
            sp2: string
            serial: string
        }
        console.log(equipObject) 
        const data: DataType = equipObject
        const columns: ColumnsType<DataType> = [
            {
                title: <Text strong style={{fontSize: '12pt'}}>Структурное подразделение (по ВМП)</Text>,
                dataIndex: 'sp',
                render: (text, record) => <NavLink  to={record.id} style={{fontSize: '12pt'}}>{text}</NavLink>,
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Структурное подразделение (по ответственности)</Text>,
                dataIndex: 'sp2',
                render: (sp) => <Text>{sp}</Text>,
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Структурное подразделение (по ответственности)</Text>,
                dataIndex: 'sp2',
                render: (sp) => <Text>{sp}</Text>,
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Местонахождение</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Группа</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Производитель</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Год изготовления</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Серийный номер</Text>,
                dataIndex: 'serial',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Учетный номер</Text>,
                dataIndex: 'inv',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Производитель</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>Периодичность квалификации (по АР)</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            },
            {
                title: <Text strong style={{fontSize: '12pt'}}>График ВМП 2023 г.</Text>,
                dataIndex: 'date',
                width: '10%',
                align: 'center'
            }
        ];

        return (
            <Row style={{padding: '10px 0'}}>
                <Col span={5} push={1}>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <Image
                            src={"http://10.85.10.212/ov/" + equipObject.foto}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '50vh',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        />
                    </div>
                </Col>
                <Col span={16} push={2}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => <Text style={{fontSize: '14pt'}}>Оборудование</Text>}
                    />
                </Col>
            </Row>
        )
    } else {
        return (
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Оборудования с данным идентификатором не существует!</Text>
        )
    }
    
}