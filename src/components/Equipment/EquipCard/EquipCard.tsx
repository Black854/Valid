import { Button, Col, Image, Row, Spin, Table, Tabs, TabsProps, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getEquipById, getEquipData, getIsLoading } from "../../../redux/equipmentSelectors";
import { AppStateType } from "../../../redux/store";
import { getEquipment, updateInv, updateManufacturDate, updateManufacturer, updateNomer, updateSerial } from "../../../redux/equipmentReducer";
import { ColumnsType } from "antd/es/table";
import { ArHelper } from "../../helpers/arHelper";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import TitleImage from "./CardComponents/TitleImage";
import EquipDescriptions from "./CardComponents/EquipDescription";
import CardReestr from "./CardComponents/CardReestr";
import React from "react";
import TechnicalInfo from "./CardComponents/TechnicalInfo";
import PhotosBlock from "./CardComponents/PhotosBlock";
const { Text, Paragraph } = Typography

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
        
        const updateDataNomer = (nomer: string) => {
            //@ts-ignore
            dispatch(updateNomer(equipObject.id, nomer))
        }

        const updateDataManufacturer = (manufacturer: string) => {
            //@ts-ignore
            dispatch(updateManufacturer(equipObject.id, manufacturer))
        }

        const updateDataManufacturdate = (manufacturDate: string) => {
            //@ts-ignore
            dispatch(updateManufacturDate(equipObject.id, manufacturDate))
        }

        const updateDataInv = (inv: string) => {
            //@ts-ignore
            dispatch(updateInv(equipObject.id, inv))
        }

        const updateDataSerial = (serial: string) => {
            //@ts-ignore
            dispatch(updateSerial(equipObject.id, serial))
        }

        const data = [
            {
                rowName: 'Подразделение (по ВМП)',
                value: equipObject.sp
            },
            {
                rowName: 'Подразделение (по ответственности)',
                value: equipObject.sp2
            },
            {
                rowName: 'Местонахождение',
                value:  equipObject.nomer ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}, text: equipObject.nomer}}>Помещение № { equipObject.nomer}</Text>:
                                            <Text type="danger" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Группа',
                value: equipObject.groupp || <Text type="danger">Не указано</Text>
            },
            {
                rowName: 'Производитель',
                value: equipObject.manufacturer ? <Text editable={{ onChange: (text) => {updateDataManufacturer(text)}}}>{equipObject.manufacturer}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataManufacturer(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Год изготовления',
                value: equipObject.manufacturdate ? <Text editable={{ onChange: (text) => {updateDataManufacturdate(text)}}}>{equipObject.manufacturdate}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataManufacturdate(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Серийный номер',
                value: equipObject.serial ? <Text editable={{ onChange: (text) => {updateDataSerial(text)}}}>{equipObject.serial}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataSerial(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Учетный номер',
                value: equipObject.inv ? <Text editable={{ onChange: (text) => {updateDataInv(text)}}}>{equipObject.inv}</Text> :
                <Text type="danger" editable={{ onChange: (text) => {updateDataInv(text)}, text: ''}}>Не указано</Text>
            },
            {
                rowName: 'Периодичность реквалификации',
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

        const items: TabsProps['items'] = [
            {
              key: '1',
              label: 'Описание',
              children: <EquipDescriptions columns={columns} data={data} />,
            },
            {
              key: '2',
              label: 'Перечень валидационных работ',
              children: <CardReestr id={equipObject.id} isLoading={isLoading} />,
            },
            {
              key: '3',
              label: 'Техническая информация',
              children: <TechnicalInfo id={equipObject.id} />,
            },
            {
              key: '4',
              label: 'Фотографии',
              children: <PhotosBlock id={equipObject.id} />,
            },
          ];

        return (
            <>
            <Row style={{padding: '10px 0'}}>
                <Col span={5} push={1} style={{textAlign: 'center'}}>
                    <TitleImage equipObject={equipObject}/>
                </Col>
                <Col span={16} push={2} style={{minHeight: '89vh', display: "flex", flexDirection: 'column'}}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        indicatorSize={(origin) => origin - 16}
                        style={{flex: 1}}
                        type="card"
                    />
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