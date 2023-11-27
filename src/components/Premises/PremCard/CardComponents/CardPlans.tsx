import React, { useEffect } from "react"
import { AppDispatch } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { VMPDataType, getObjectVMPPlansData } from "../../../../redux/Reducers/vmpReducer"
import { getObjectVMPPlansDataSelector } from "../../../../redux/Selectors/vmpSelectors"
import { Card, Col, Layout, Row, Table, Typography } from "antd"
import Paragraph from "antd/es/typography/Paragraph"
import { ColumnsType } from "antd/es/table"

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
            value: <Text>{data1[0]?.[0]}</Text>
        },
        {
            rowName: 'Февраль',
            value: <Text>{data1[0]?.[1]}</Text>
        },
        {
            rowName: 'Март',
            value: <Text>{data1[0]?.[2]}</Text>
        },
        {
            rowName: 'Апрель',
            value: <Text>{data1[0]?.[3]}</Text>
        },
        {
            rowName: 'Май',
            value: <Text>{data1[0]?.[4]}</Text>
        },
        {
            rowName: 'Июнь',
            value: <Text>{data1[0]?.[5]}</Text>
        },
        {
            rowName: 'Июль',
            value: <Text>{data1[0]?.[6]}</Text>
        },
        {
            rowName: 'Август',
            value: <Text>{data1[0]?.[7]}</Text>
        },
        {
            rowName: 'Сентябрь  ',
            value: <Text>{data1[0]?.[8]}</Text>
        },
        {
            rowName: 'Октябрь',
            value: <Text>{data1[0]?.[9]}</Text>
        },
        {
            rowName: 'Ноябрь',
            value: <Text>{data1[0]?.[10]}</Text>
        },
        {
            rowName: 'Декабрь',
            value: <Text>{data1[0]?.[11]}</Text>
        },
    ]

    const data4 = [
        {
            rowName: 'Январь',
            value: <Text>{data2[0]?.[0]}</Text>
        },
        {
            rowName: 'Февраль',
            value: <Text>{data2[0]?.[1]}</Text>
        },
        {
            rowName: 'Март',
            value: <Text>{data2[0]?.[2]}</Text>
        },
        {
            rowName: 'Апрель',
            value: <Text>{data2[0]?.[3]}</Text>
        },
        {
            rowName: 'Май',
            value: <Text>{data2[0]?.[4]}</Text>
        },
        {
            rowName: 'Июнь',
            value: <Text>{data2[0]?.[5]}</Text>
        },
        {
            rowName: 'Июль',
            value: <Text>{data2[0]?.[6]}</Text>
        },
        {
            rowName: 'Август',
            value: <Text>{data2[0]?.[7]}</Text>
        },
        {
            rowName: 'Сентябрь  ',
            value: <Text>{data2[0]?.[8]}</Text>
        },
        {
            rowName: 'Октябрь',
            value: <Text>{data2[0]?.[9]}</Text>
        },
        {
            rowName: 'Ноябрь',
            value: <Text>{data2[0]?.[10]}</Text>
        },
        {
            rowName: 'Декабрь',
            value: <Text>{data2[0]?.[11]}</Text>
        },
    ]

    const columns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '20%'
        },
    ]

    return (
        <Row style={{ marginBottom: '100px' }}>
            <Col span={11}>

                {data1.length > 0 ?
                    <Table
                        title={() => <Text style={{ fontSize: '14pt' }}>Квалификация</Text>}
                        showHeader={false}
                        columns={data1.length > 0 ? columns : undefined}
                        dataSource={data1.length > 0 ? data3 : undefined}
                        pagination={false}
                        bordered
                    /> :
                    <Text type="secondary">Нет данных</Text>}
            </Col>
            <Col span={11} push={2}>
                <Table
                    title={() => <Text style={{ fontSize: '14pt' }}>Оценка валидационного статуса</Text>}
                    showHeader={false}
                    columns={data2.length > 0 ? columns : undefined}
                    dataSource={data2.length > 0 ? data4 : undefined}
                    pagination={false}
                    bordered
                />
            </Col>
        </Row>
    )
}