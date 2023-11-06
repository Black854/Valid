import { ColumnsType } from "antd/es/table"
import { Button, Col, Flex, Modal, Radio, Row, Space, Table, Typography } from "antd"
import { CleanGroupLabelsType, DataType, ReestrType, getCleanGroupLabels } from "../../../../redux/premisesReducer"
import { useDispatch, useSelector } from "react-redux"
import { getCleanGroupLabelsSelector, getCleanTabSelector, getIsCleanPremGroupsLoading } from "../../../../redux/premisesSelectors"
import { useEffect, useState } from "react"
import { AppDispatch } from "../../../../redux/store"
import { format } from 'date-fns'
import { LabelDateHelper, labelEndDate } from "../../../helpers/labelDateHelper"
import { getDepartmentsSelector, getIntervals, getSopCodeFormSelector } from "../../../../redux/appSelectors"
import { PrinterOutlined } from '@ant-design/icons'
import { getSopCodeForm } from "../../../../redux/appReducer"
const {Text, Title} = Typography

type CleanPremGroupsPropsType = {
    id: string
    premObject: DataType
    reestrData: ReestrType[]
}

export const CleanPremGroups: React.FC<CleanPremGroupsPropsType> = ({id, premObject, reestrData}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    let numbersToPrint
    if (selectedRowKeys.length > 0) {
            numbersToPrint = '№ ' + selectedRowKeys.join(', ')
    } else {
        numbersToPrint = <Text type="danger" style={{fontSize: '9pt'}}>Помещения не выбраны</Text>
    }

    const dispatch: AppDispatch = useDispatch()
    useEffect(
        () => {
            dispatch(getCleanGroupLabels(id))
        }, []
    )
    useEffect (() => {
        dispatch(getSopCodeForm())
    }, [])
    const sopCodeForm = useSelector(getSopCodeFormSelector)
    const cleanGroupLabels = useSelector(getCleanGroupLabelsSelector)
    const cleanGroupLabelsWithIndex = cleanGroupLabels.map((item, index) => ({
        ...item,
        index: index + 1,
    }))
    const intervals = useSelector(getIntervals)
    const isCleanPremGroupsLoading = useSelector(getIsCleanPremGroupsLoading)

    const columns: ColumnsType<CleanGroupLabelsType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Кол-во</Text>,
            dataIndex: 'count',
            align: 'center',
            render: (count) => <Text>{`${count} шт`}</Text>
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Номера помещений</Text>,
            dataIndex: 'numbers',
            render: (numbers) => <Text>{`№ ${numbers}`}</Text>
        }
    ]

    const onRowClick = (record: CleanGroupLabelsType) => {
        return {
          onClick: () => {
            const newSelectedRowKeys = [record.numbers]; // Здесь вы должны использовать уникальный идентификатор вашей записи, например, record.numbers, чтобы определить, какую строку выбрать
            setSelectedRowKeys(newSelectedRowKeys)
            console.log(selectedRowKeys.length)
          },
        }
    }

    const maxDateObject = reestrData.reduce((max, obj) => {
        const currentDate = new Date(obj.dvo);
        const maxDate = new Date(max.dvo);
      
        return currentDate > maxDate ? obj : max;
    }, reestrData[0])
      
    const labelEndDateToPrint = labelEndDate(maxDateObject.dvo, premObject.ar, intervals)

    const premCurrentDate = new Date(maxDateObject.dvo)
    const formattedPremCurrentDate = format(premCurrentDate, 'dd.MM.yyyy')
    
    const departments = useSelector(getDepartmentsSelector)
    const ovFio = departments.find(e => e.name === 'ОВ')?.fio
    const ovPos = departments.find(e => e.name === 'ОВ')?.pos
    
    let selectedRowDepartment = cleanGroupLabels.find(e => e.numbers === selectedRowKeys.join(', '))?.department
    
    const departmentFio = departments.find(e => e.name === selectedRowDepartment)?.fio || <Text type="danger" style={{fontSize: '8pt'}}>Не выбрано</Text>
    const departmentPos = departments.find(e => e.name === selectedRowDepartment)?.pos || <Text type="danger" style={{fontSize: '8pt'}}>Не выбрано</Text>
    const [labelModalOpen, setLabelModalOpen] = useState(false)
    const [frameModalOpen, setFrameModalOpen] = useState(false)
    const handleCancel = (modalType: string) => {
        if (modalType === 'label') {
            setLabelModalOpen(false)
        } else if (modalType === 'frame') {
            setFrameModalOpen(false)
        }
    }
    return (
        <Row>
            <Col span={14}>
                <Table
                    columns={columns}
                    dataSource={cleanGroupLabelsWithIndex}
                    bordered
                    pagination={{position: ["topRight"]}} // Скрыть пагинацию, если есть
                    rowKey='numbers'
                    style={{marginBottom: '60px'}}
                    onRow={onRowClick}
                    rowSelection={{
                        type: "radio",
                        selectedRowKeys,
                        onChange: (selectedRowKeys: React.Key[], selectedRows: CleanGroupLabelsType[]) => {
                            setSelectedRowKeys(selectedRowKeys);
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                          }
                      }}
                    loading={isCleanPremGroupsLoading}
                    rowClassName={() => 'cursorPointer'}
                />
            </Col>
            <Col span={10} push={1}>
                <div style={{border: '1px solid black', margin: '0', padding: '0', backgroundColor: 'white', width: '120mm', marginBottom: '20px'}}>
                    <table border={1} style={{borderCollapse: 'collapse', margin: '2mm 2mm 0mm 2mm', color: 'black', fontSize: '9pt', fontFamily: 'TimesNewRoman', lineHeight: '3.5mm'}}>
                        <tr>
                            <td style={{backgroundColor: '#078f07', textAlign: 'center', height: '18mm', fontSize: '18pt'}} colSpan={4}>
                                ВАЛИДИРОВАНО
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '50mm', height: '7mm', padding: '0 2mm'}}>
                                Код валидационного отчета
                            </td>
                            <td style={{textAlign: 'center'}} colSpan={3}>
                                {maxDateObject.nvo}
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '9mm', padding: '0 2mm'}}>
                                Наименование объекта квалификации
                            </td>
                            <td style={{textAlign: 'center'}} colSpan={3}>
                                {premObject.name}
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '8mm', padding: '0 2mm'}}>
                                Заводской/учетный номер
                            </td>
                            <td style={{textAlign: 'center'}} colSpan={3}>
                                {numbersToPrint}
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '9mm', padding: '0 2mm'}}>
                                Дата присвоения статуса «Валидировано»
                            </td>
                            <td style={{textAlign: 'center'}} colSpan={3}>
                                {formattedPremCurrentDate}
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '9mm', padding: '0 2mm'}}>
                                Срок действия статуса «Валидировано»
                            </td>
                            <td style={{textAlign: 'center'}} colSpan={3}>
                                До <LabelDateHelper ar={premObject.ar}  date={maxDateObject.dvo} />
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2} style={{padding: '0 2mm'}}>
                                Ответственный за сохранение статуса «Валидировано»
                            </td>
                            <td style={{width: '21.5mm', height: '4.5mm', textAlign: 'center'}}>
                                Должность
                            </td>
                            <td style={{width: '25.5mm', textAlign: 'center'}}>
                                Ф.И.О.
                            </td>
                            <td style={{width: '19mm', textAlign: 'center'}}>
                                Подпись
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '5.5mm', textAlign: 'center'}}>
                                {departmentPos}
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {departmentFio}
                            </td>
                            <td style={{textAlign: 'center'}}>
                                
                            </td>
                        </tr>
                        <tr>
                            <td style={{height: '9mm', padding: '0 2mm'}}>
                                Ответственный за присвоение статуса «Валидировано»
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {ovPos}
                            </td>
                            <td style={{textAlign: 'center'}}>
                                {ovFio}
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </table>
                    <div style={{fontSize: '9pt', textAlign: 'right', height: '3mm', margin: '0mm 2mm 2mm 0', padding: '0', color: 'black'}}>{sopCodeForm}</div>
                </div>
                <Row>
                    <Title level={5}>Порядок действий:</Title>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                        <Text>1. Убедитесь в том, что бумага в принтере лежит ровно</Text>
                        <Text>2. Выберите группу помещений в таблице слева</Text>
                        <Text>3. Распечатайте рамку этикетки</Text>
                        <Text>4. Приклейте в рамку шаблон этикетки</Text>
                        <Text>5. Верните лист с приклеенным шаблоном обратно в принтер</Text>
                        <Text>6. Распечатайте этикетку</Text>
                        {selectedRowKeys.length === 0 ? <Button style={{marginTop: '20px'}} disabled icon={<PrinterOutlined />}>Печать рамки</Button> :
                                                        <Button style={{marginTop: '20px'}} type="default" icon={<PrinterOutlined />} onClick={() => setFrameModalOpen(true)}>Печать рамки</Button>}
                       
                        {selectedRowKeys.length === 0 ? <Button style={{marginTop: '10px'}} disabled icon={<PrinterOutlined />}>Печать этикетки</Button> :
                                                        <Button style={{marginTop: '10px'}} type="primary" icon={<PrinterOutlined />} onClick={() => setLabelModalOpen(true)}>Печать этикетки</Button>}
                         
                        <Modal title="Печать статусной этикетки" open={labelModalOpen} onCancel={() => handleCancel('label')} footer={[ <Button key="close" onClick={() => handleCancel('label')} type="primary">Закрыть</Button> ]} >
                            <iframe style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/et.php?code=${maxDateObject.nvo}&name=${premObject.name}&startDate=${formattedPremCurrentDate}
                            &endDate=${labelEndDateToPrint}&departmentPos=${departmentPos}&departmentFio=${departmentFio}&ovPos=${ovPos}&ovFio=${ovFio}&numbers=${numbersToPrint}&sopCodeForm=${sopCodeForm}`}>

                            </iframe>
                        </Modal>

                        <Modal title="Печать рамки для статусной этикетки" open={frameModalOpen} onCancel={() => handleCancel('frame')} footer={[ <Button key="close" onClick={() => handleCancel('frame')} type="primary">Закрыть</Button> ]} >
                            <iframe style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/etWithFrames.php?code=${maxDateObject.nvo}&name=${premObject.name}&startDate=${formattedPremCurrentDate}
                            &endDate=${labelEndDateToPrint}&departmentPos=${departmentPos}&departmentFio=${departmentFio}&ovPos=${ovPos}&ovFio=${ovFio}&numbers=${numbersToPrint}&sopCodeForm=${sopCodeForm}`}>

                            </iframe>
                        </Modal>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}