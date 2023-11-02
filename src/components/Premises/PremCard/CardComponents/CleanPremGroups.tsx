import { ColumnsType } from "antd/es/table"
import { Col, Row, Table, Typography } from "antd"
import { CleanGroupLabelsType, getCleanGroupLabels } from "../../../../redux/premisesReducer"
import { useDispatch, useSelector } from "react-redux"
import { getCleanGroupLabelsSelector } from "../../../../redux/premisesSelectors"
import { useEffect } from "react"
import { AppDispatch } from "../../../../redux/store"
const {Text} = Typography

type CleanPremGroupsPropsType = {
    id: string
}

export const CleanPremGroups: React.FC<CleanPremGroupsPropsType> = ({id}) => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(
        () => {
            dispatch(getCleanGroupLabels(id))
        }, []
    )
    const cleanGroupLabels = useSelector(getCleanGroupLabelsSelector)

    const handleUpdateCleanPrem = (id: string, text: string, dataType: string) => {

    }

    const columns: ColumnsType<CleanGroupLabelsType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Номера помещений</Text>,
            dataIndex: 'numbers',
            render: (numbers) => <Text>{`№ ${numbers}`}</Text>
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Кол-во этикеток</Text>,
            dataIndex: 'count',
            align: 'center',
            render: (count) => <Text editable={{onChange: (text: string) => {handleUpdateCleanPrem(id, text, 'count')}, text: count}} >{`${count} шт`}</Text>
        }
    ]

    return (
        <Row>
            <Col span={14}>
                <Table
                    columns={columns}
                    dataSource={cleanGroupLabels}
                    bordered
                    pagination={false} // Скрыть пагинацию, если есть
                    rowKey='id'
                    style={{marginBottom: '60px'}}
                />
            </Col>
            <Col span={10} push={1}>
                <table border={1} style={{borderCollapse: 'collapse', backgroundColor: 'white', color: 'black', fontSize: '10pt', fontFamily: 'TimesNewRoman', lineHeight: '4mm'}}>
                    <tr>
                        <td style={{backgroundColor: '#078f07', textAlign: 'center', height: '18mm', fontSize: '18pt'}} colSpan={4}>
                            ВАЛИДИРОВАНО
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: '50mm', height: '7mm', padding: '0 2mm'}}>
                            Код валидационного отчета
                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '9mm', padding: '0 2mm'}}>
                            Наименование объекта квалификации
                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '8mm', padding: '0 2mm'}}>
                            Заводской/учетный номер
                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '9mm', padding: '0 2mm'}}>
                            Дата присвоения статуса «Валидировано»
                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '9mm', padding: '0 2mm'}}>
                            Срок действия статуса «Валидировано»
                        </td>
                        <td colSpan={3}>
                            
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={2} style={{padding: '0 2mm'}}>
                            Ответственный за сохранение статуса «Валидировано»
                        </td>
                        <td style={{width: '21.5mm', height: '4.5mm', textAlign: 'center'}}>
                            Должность
                        </td>
                        <td style={{width: '21.5mm', textAlign: 'center'}}>
                            Ф.И.О.
                        </td>
                        <td style={{width: '19mm', textAlign: 'center'}}>
                            Подпись
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '5.5mm', textAlign: 'center'}}>
                            
                        </td>
                        <td>

                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td style={{height: '9mm', padding: '0 2mm'}}>
                            Ответственный за присвоение статуса «Валидировано»
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                </table>
            </Col>
        </Row>
    )
}