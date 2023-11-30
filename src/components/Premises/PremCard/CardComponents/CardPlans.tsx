import React, { useEffect } from "react"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getObjectVMPPlansData } from "../../../../redux/Reducers/vmpReducer"
import { getObjectVMPPlansDataSelector } from "../../../../redux/Selectors/vmpSelectors"
import { Card, Col, Row, Table, Typography } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { ColumnsType } from "antd/es/table"
import Title from "antd/es/typography/Title"

const { Text } = Typography

type CardPlansType = {
    objectId: string
    sp: string
    objectType: 'premises' | 'equipment' | 'systems' | 'processes'
}

export const CardPlans: React.FC<CardPlansType> = ({ objectId, sp, objectType }) => {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(getObjectVMPPlansData(objectId, sp, objectType))
    }, [])
    const data = useSelector(getObjectVMPPlansDataSelector)
    const data1 = data.filter(e => e.typeval === '1')
    const data2 = data.filter(e => e.typeval === '2' || e.typeval === '3')

    const data3 = [
        {
            rowName: 'Январь',
            value: data1[0]?.[0] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[0]} дней</Text>
        },
        {
            rowName: 'Февраль',
            value: data1[0]?.[1] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[1]} дней</Text>
        },
        {
            rowName: 'Март',
            value: data1[0]?.[2] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[2]} дней</Text>
        },
        {
            rowName: 'Апрель',
            value: data1[0]?.[3] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[3]} дней</Text>
        },
        {
            rowName: 'Май',
            value: data1[0]?.[4] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[4]} дней</Text>
        },
        {
            rowName: 'Июнь',
            value: data1[0]?.[5] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[5]} дней</Text>
        },
        {
            rowName: 'Июль',
            value: data1[0]?.[6] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[6]} дней</Text>
        },
        {
            rowName: 'Август',
            value: data1[0]?.[7] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[7]} дней</Text>
        },
        {
            rowName: 'Сентябрь  ',
            value: data1[0]?.[8] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[8]} дней</Text>
        },
        {
            rowName: 'Октябрь',
            value: data1[0]?.[9] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[9]} дней</Text>
        },
        {
            rowName: 'Ноябрь',
            value: data1[0]?.[10] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[10]} дней</Text>
        },
        {
            rowName: 'Декабрь',
            value: data1[0]?.[11] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data1[0]?.[11]} дней</Text>
        },
    ]

    const data4 = [
        {
            rowName: 'Январь',
            value: data2[0]?.[0] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[0]} дней</Text>
        },
        {
            rowName: 'Февраль',
            value: data2[0]?.[1] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[1]} дней</Text>
        },
        {
            rowName: 'Март',
            value: data2[0]?.[2] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[2]} дней</Text>
        },
        {
            rowName: 'Апрель',
            value: data2[0]?.[3] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[3]} дней</Text>
        },
        {
            rowName: 'Май',
            value: data2[0]?.[4] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[4]} дней</Text>
        },
        {
            rowName: 'Июнь',
            value: data2[0]?.[5] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[5]} дней</Text>
        },
        {
            rowName: 'Июль',
            value: data2[0]?.[6] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[6]} дней</Text>
        },
        {
            rowName: 'Август',
            value: data2[0]?.[7] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[7]} дней</Text>
        },
        {
            rowName: 'Сентябрь  ',
            value: data2[0]?.[8] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[8]} дней</Text>
        },
        {
            rowName: 'Октябрь',
            value: data2[0]?.[9] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[9]} дней</Text>
        },
        {
            rowName: 'Ноябрь',
            value: data2[0]?.[10] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[10]} дней</Text>
        },
        {
            rowName: 'Декабрь',
            value: data2[0]?.[11] === '0' ? <Text type="warning">Не запланировано</Text> : <Text type="success">{data2[0]?.[11]} дней</Text>
        },
    ]

    const columns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '30%'
        },
    ]

    return (
        <Card style={{ marginBottom: '100px', padding: '0px' }}>
            <Row>
                <Col span={11}>
                    <Table
                        title={() => <Text style={{ fontSize: '14pt' }}>Отчет по квалификации</Text>}
                        showHeader={false}
                        columns={data1.length > 0 ? columns : undefined}
                        dataSource={data1.length > 0 ? data3 : undefined}
                        pagination={false}
                    />
                </Col>
                <Col span={11} push={2}>
                    <Table
                        title={() => <Text style={{ fontSize: '14pt' }}>Оценка валидационного статуса</Text>}
                        showHeader={false}
                        columns={data2.length > 0 ? columns : undefined}
                        dataSource={data2.length > 0 ? data4 : undefined}
                        pagination={false}
                    />
                </Col>
            </Row>
        </Card>
    )
}