import { Button, Col, Image, Row, Spin, Table, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getEquipById, getEquipData, getIsLoading } from "../../../redux/equipmentSelectors";
import { AppStateType } from "../../../redux/store";
import { getEquipment } from "../../../redux/equipmentReducer";
import { ColumnsType } from "antd/es/table";
import { ArHelper } from "../../helpers/arHelper";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import TitleImage from "./CardComponents/TitleImage";
import EquipDescriptions from "./CardComponents/EquipDescription";
import CardReestr from "./CardComponents/CardReestr";
import React from "react";
const { Text } = Typography

const EquipCard = () => {
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
        
        const data = [
            {
                rowName: 'Структурное подразделение (по ВМП)',
                value: equipObject.sp
            },
            {
                rowName: 'Структурное подразделение (по ответственности)',
                value: equipObject.sp2
            },
            {
                rowName: 'Местонахождение',
                value: equipObject.nomer || <Text type="danger" onChange={(text) => {'вставить коллбек с диспатчем'}} editable>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: equipObject.groupp || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Производитель',
                value: equipObject.manufacturer || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Год изготовления',
                value: equipObject.manufacturdate || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Серийный номер',
                value: equipObject.serial || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Учетный номер',
                value: equipObject.inv || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Периодичность квалификации по анализу рисков',
                value: <ArHelper ar={equipObject.ar} /> 
            }            
        ]
        
        const columns = [
            {
              dataIndex: 'rowName',
              render: (rowName: string) => <Text style={{fontSize: '12pt'}}>{rowName}</Text>,
            },
            {
              dataIndex: 'value',
              width: '60%'
            },
        ]

        return (
            <>
            <Row style={{padding: '10px 0'}}>
                <Col span={5} push={1} style={{textAlign: 'center'}}>
                    <TitleImage equipObject={equipObject} />
                </Col>
                <Col span={16} push={2}>
                    <EquipDescriptions columns={columns} data={data} name={equipObject.name} />
                </Col>
            </Row>
            <Row>
                <Col span={22} push={1}>
                    <CardReestr id={equipObject.id} isLoading={isLoading} />
                </Col>
            </Row>
            </>
        )
    } else {
        return (
            <Text type="danger" style={{fontSize: '12pt', textAlign: 'center', padding: '20px'}}>Внимание! Оборудования с данным идентификатором не существует!</Text>
        )
    }
    
}

export default React.memo(EquipCard)