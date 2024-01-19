import { ColumnsType } from "antd/es/table"
import { Button, Checkbox, Col, Form, Input, Modal, Popconfirm, Row, Table, Typography } from "antd"
import { CleanGroupLabelsType, DataType, PremReestrType, createCleanPremGroup, deleteCleanPremGroup, editCleanPremGroup, getCleanGroupLabels, getCleanPremList } from "../../../../redux/Reducers/premisesReducer"
import { useDispatch, useSelector } from "react-redux"
import { getCleanGroupLabelsSelector, getCleanPremListSelector, getCleanTabSelector, getIsCleanPremGroupsLoading } from "../../../../redux/Selectors/premisesSelectors"
import { useEffect, useState } from "react"
import { AppDispatch } from "../../../../redux/store"
import { format } from 'date-fns'
import { LabelDateHelper, labelEndDate } from "../../../common/labelDateHelper"
import { getDepartmentsSelector, getIntervals, getSopCodeFormSelector } from "../../../../redux/Selectors/appSelectors"
import { PrinterOutlined } from '@ant-design/icons'
import { getSopCodeForm } from "../../../../redux/Reducers/appReducer"
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
const {Text, Title} = Typography

type CleanPremGroupsPropsType = {
    id: string
    premObject: DataType
    reestrData: PremReestrType[]
}

export const CleanPremGroups: React.FC<CleanPremGroupsPropsType> = ({id, premObject, reestrData}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    let numbersToPrint
    if (selectedRowKeys.length > 0) {
        if (selectedRowKeys.toString().includes(',')) {
            numbersToPrint = 'Помещения № ' + selectedRowKeys.join(', ')
        } else {
            numbersToPrint = 'Помещение № ' + selectedRowKeys.join(', ')
        }
    } else {
        numbersToPrint = <Text type="danger" style={{fontSize: '9pt'}}>Помещения не выбраны</Text>
    }
    const dispatch: AppDispatch = useDispatch()
    useEffect(
        () => {
            dispatch(getCleanPremList(id))
            dispatch(getCleanGroupLabels(id))
            dispatch(getSopCodeForm())
        }, []
    )
    const sopCodeForm = useSelector(getSopCodeFormSelector)
    const cleanGroupLabels = useSelector(getCleanGroupLabelsSelector)
    const cleanPremList = useSelector(getCleanPremListSelector)
    const cleanGroupLabelsWithIndex = cleanGroupLabels.map((item, index) => ({
        ...item,
        index: index + 1,
    }))
    const intervals = useSelector(getIntervals)
    const isCleanPremGroupsLoading = useSelector(getIsCleanPremGroupsLoading)
    const cleanTab = useSelector(getCleanTabSelector)
    const handleDeleteCleanPremGroup = (groupId: string) => {
        dispatch(deleteCleanPremGroup(cleanTab, groupId))
    }

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
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Действия</Text>,
            render: (text, record, index) =>    <Row>
                                                    <Col span={22} push={1} style={{display: 'flex', flexDirection: 'column'}}>
                                                        <Button
                                                            style={{display: 'block', marginTop: '5px', textAlign: 'left'}}
                                                            size="small"
                                                            type="link"
                                                            icon={<EditOutlined />}
                                                            onClick={() => {
                                                                setShowModalLabelEdit(true)
                                                                setCount(record.count)
                                                                const numbersData = record.numbers.split(', ')
                                                                const idData = cleanPremList
                                                                    .filter(elem => numbersData.includes(elem.nomer))
                                                                    .map(elem => elem.id)
                                                                setDataItems(idData)
                                                                setGroupId(record.groupId)
                                                            }}
                                                            >
                                                            Редактировать
                                                            </Button>
                                                        <Popconfirm
                                                            title='Подтвердите удаление'
                                                            description='Вы уверены, что хотите удалить этикетку?'
                                                            okText='Да'
                                                            cancelText='Нет'
                                                            onConfirm={() => handleDeleteCleanPremGroup(record.groupId)}
                                                        >
                                                            <Button
                                                                style={{display: 'block', marginTop: '5px', textAlign: 'left'}}
                                                                size="small"
                                                                danger
                                                                type="link"
                                                                icon={<DeleteOutlined />}
                                                                >
                                                                Удалить
                                                            </Button>
                                                        </Popconfirm>
                                                    </Col>
                                                </Row>,
            align: 'center',
            width: '20%'
        }
    ]

    const onRowClick = (record: CleanGroupLabelsType) => {
        return {
          onClick: () => {
            const newSelectedRowKeys = [record.numbers]; // Здесь вы должны использовать уникальный идентификатор вашей записи, например, record.numbers, чтобы определить, какую строку выбрать
            setSelectedRowKeys(newSelectedRowKeys)
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
    const [iframeKey, setIframeKey] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showModalLabelEdit, setShowModalLabelEdit] = useState(false)
    const [dataItems, setDataItems] = useState([] as string[])
    const [count, setCount] = useState('1')
    const [groupId, setGroupId] = useState('')
    const handleCancel = (modalType: string) => {
        if (modalType === 'label') {
            setLabelModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'frame') {
            setFrameModalOpen(false)
            setIframeKey(prevKey => prevKey + 1)
        } else if (modalType === 'addForm') {
            setShowModal(false)
            setCount('1')
        } else if (modalType === 'editForm') {
            setShowModalLabelEdit(false)
            setDataItems([])
            setGroupId('')
            setCount('1')
        }
    }

    const submitForm = () => {
        if (dataItems.length > 0) {
            dispatch(createCleanPremGroup(cleanTab, dataItems, count))
            setDataItems([])
            setShowModal(false)
            setCount('1')
        }
    }

    const submitEditForm = () => {
        if (dataItems.length > 0) {
            dispatch(editCleanPremGroup(cleanTab, dataItems, count, groupId))
            setDataItems([])
            setShowModalLabelEdit(false)
            setCount('1')
        }
    }

    const checkItem = (id: string) => {
        dataItems.find(e => e === id) ?
        setDataItems(dataItems.filter (e => e !== id)) :
        setDataItems([...dataItems, id])
    }
    const formItems = cleanPremList.map(e => <Form.Item key={e.id} style={{margin: 0}}><Checkbox name={e.id} checked={dataItems.find(elem => elem === e.id) ? true : false} onChange={() => checkItem(e.id)}/><Text style={{marginLeft: '10px'}}>{`Помещение № ${e.nomer} «${e.name}»`}</Text></Form.Item>)
    
    return (
        <Row>
            <Col span={14}>           
                <Button size="small" type="primary" icon={<PlusOutlined />} style={cleanGroupLabelsWithIndex.length > 0 ? {position: 'absolute', top: '10px', zIndex: '1'} : {marginBottom: '10px'}} onClick={() => setShowModal(true)}>Добавить этикетку</Button>
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
                        }
                    }}
                    loading={isCleanPremGroupsLoading}
                    rowClassName={() => 'cursorPointer'}
                    size="small"
                />
                <Modal centered title="Добавление этикетки" open={showModal} onCancel={() => handleCancel('addForm')} footer={[ <Button key="close" onClick={() => handleCancel('addForm')} type="primary">Отмена</Button>]} >
                    <Text style={{display: 'inline-block', marginRight: '10px', marginTop: '10px'}}>Количество: </Text>
                    <Input type="number"
                        size="small"
                        name='labelCount'
                        style={{display: 'inline-block', width: '50px', marginRight: '10px'}}
                        minLength={1}
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    />
                    <Text style={{display: 'inline-block', marginBottom: '20px'}}> шт.</Text>
                    {formItems}
                    <Button disabled={dataItems.length <= 0 || count === '' || parseInt(count) < 1} style={{marginTop: '15px'}} size="small" type="primary" onClick={submitForm}>Создать этикетку</Button>
                </Modal>
                <Modal centered title="Редактирование этикетки" open={showModalLabelEdit} onCancel={() => handleCancel('editForm')} footer={[ <Button key="close" onClick={() => handleCancel('editForm')} type="primary">Отмена</Button>]} >
                    <Text style={{display: 'inline-block', marginRight: '10px', marginTop: '10px'}}>Количество: </Text>
                    <Input type="number"
                        size="small"
                        name='labelCount'
                        style={{display: 'inline-block', width: '50px', marginRight: '10px'}}
                        minLength={1}
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    />
                    <Text style={{display: 'inline-block', marginBottom: '20px'}}> шт.</Text>
                    {formItems}
                    <Button disabled={dataItems.length <= 0 || count === '' || parseInt(count) < 1} style={{marginTop: '15px'}} size="small" type="primary" onClick={submitEditForm}>Сохранить изменения</Button>
                </Modal>
            </Col>
            <Col span={10} push={1}>
                <div style={{border: '1px solid black', margin: '0', padding: '0', backgroundColor: 'white', width: '120mm', marginBottom: '20px'}}>
                    <table border={1} style={{borderCollapse: 'collapse', margin: '2mm 2mm 0mm 2mm', color: 'black', fontSize: '9pt', fontFamily: 'TimesNewRoman', lineHeight: '3.5mm'}}>
                        <tbody>
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
                                <td style={{textAlign: 'center', lineHeight: '3mm'}} colSpan={3}>
                                    {premObject.name}
                                </td>
                            </tr>
                            <tr>
                                <td style={{height: '8.5mm', padding: '0 2mm'}}>
                                    Заводской/учетный номер
                                </td>
                                <td style={{textAlign: 'center', lineHeight: '2.8mm'}} colSpan={3}>
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
                        </tbody>
                    </table>
                    <div style={{fontSize: '9pt', textAlign: 'right', height: '3mm', margin: '0mm 2mm 2mm 0', padding: '0', color: 'black'}}>{sopCodeForm}</div>
                </div>
                <Row>
                    <Title level={5}>Порядок действий:</Title>
                    <Col style={{display: 'flex', flexDirection: 'column'}}>
                        <Text>1. Выберите группу помещений в таблице слева</Text>
                        <Text>2. Убедитесь в том, что бумага в принтере лежит ровно</Text>
                        <Text>3. Распечатайте рамку этикетки</Text>
                        <Text>4. Приклейте в рамку шаблон этикетки</Text>
                        <Text>5. Верните лист с приклеенным шаблоном обратно в принтер</Text>
                        <Text>6. Распечатайте этикетку</Text>
                        <Text>7. Повторите пункты 4, 5, 6 столько раз, сколько нужно этикеток (см. в таблице)</Text>
                        {selectedRowKeys.length === 0 ? <Button style={{marginTop: '20px'}} disabled icon={<PrinterOutlined />}>Печать рамки</Button> :
                                                        <Button style={{marginTop: '20px'}} type="default" icon={<PrinterOutlined />} onClick={() => {setFrameModalOpen(true)}}>Печать рамки</Button>}
                        {selectedRowKeys.length === 0 ? <Button style={{marginTop: '10px'}} disabled icon={<PrinterOutlined />}>Печать этикетки</Button> :
                                                        <Button style={{marginTop: '10px'}} type="primary" icon={<PrinterOutlined />} onClick={() => setLabelModalOpen(true)}>Печать этикетки</Button>}
                        <Modal title="Печать статусной этикетки" open={labelModalOpen} afterOpenChange={() => handleCancel('label')} onCancel={() => handleCancel('label')} footer={[ <Button key="close" onClick={() => handleCancel('label')} type="primary">Закрыть</Button> ]} >
                            <iframe key={iframeKey} style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/et.php?code=${maxDateObject.nvo}&name=${premObject.name}&startDate=${formattedPremCurrentDate}
                                &endDate=${labelEndDateToPrint}&departmentPos=${departmentPos}&departmentFio=${departmentFio}&ovPos=${ovPos}&ovFio=${ovFio}&numbers=${numbersToPrint}&sopCodeForm=${sopCodeForm}`}>
                            </iframe>
                        </Modal>
                        <Modal title="Печать рамки для статусной этикетки" afterOpenChange={() => handleCancel('frame')} open={frameModalOpen} onCancel={() => handleCancel('frame')} footer={[ <Button key="close" onClick={() => handleCancel('frame')} type="primary">Закрыть</Button> ]} >
                            <iframe key={iframeKey} style={{width: '100%', height: '360px'}} src={`http://10.85.10.212/ov/api/printForms/etWithFrames.php?code=${maxDateObject.nvo}&name=${premObject.name}&startDate=${formattedPremCurrentDate}
                                &endDate=${labelEndDateToPrint}&departmentPos=${departmentPos}&departmentFio=${departmentFio}&ovPos=${ovPos}&ovFio=${ovFio}&numbers=${numbersToPrint}&sopCodeForm=${sopCodeForm}`}>
                            </iframe>
                        </Modal>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}