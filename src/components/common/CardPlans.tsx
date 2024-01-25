import React, { useEffect } from "react"
import { AppDispatch } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { createVMPPlansData, getObjectVMPPlansData } from "../../redux/Reducers/vmpReducer"
import { getObjectVMPPlansDataSelector } from "../../redux/Selectors/vmpSelectors"
import { Button, Card, Col, Row, Table, Typography } from "antd"
import { CardPlansHelper } from "./CardPlansHelper"
import { PlusOutlined } from "@ant-design/icons"

const { Text } = Typography

type CardPlansType = {
    objectId: string
    objectName: string
    sp: string
    objectType: 'premises' | 'equipment' | 'systems' | 'processes'
    access: number
}

export const CardPlans: React.FC<CardPlansType> = ({ objectId, sp, objectType, objectName, access }) => {
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
            value: <CardPlansHelper data={data1} month='0' sp={sp} access={access} />,
            key: '1-0'
        },
        {
            rowName: 'Февраль',
            value: <CardPlansHelper data={data1} month='1' sp={sp} access={access} />,
            key: '1-1'
        },
        {
            rowName: 'Март',
            value: <CardPlansHelper data={data1} month='2' sp={sp} access={access} />,
            key: '1-2'
        },
        {
            rowName: 'Апрель',
            value: <CardPlansHelper data={data1} month='3' sp={sp} access={access} />,
            key: '1-3'
        },
        {
            rowName: 'Май',
            value: <CardPlansHelper data={data1} month='4' sp={sp} access={access} />,
            key: '1-4'
        },
        {
            rowName: 'Июнь',
            value: <CardPlansHelper data={data1} month='5' sp={sp} access={access} />,
            key: '1-5'
        },
        {
            rowName: 'Июль',
            value: <CardPlansHelper data={data1} month='6' sp={sp} access={access} />,
            key: '1-6'
        },
        {
            rowName: 'Август',
            value: <CardPlansHelper data={data1} month='7' sp={sp} access={access} />,
            key: '1-7'
        },
        {
            rowName: 'Сентябрь  ',
            value: <CardPlansHelper data={data1} month='8' sp={sp} access={access} />,
            key: '1-8'
        },
        {
            rowName: 'Октябрь',
            value: <CardPlansHelper data={data1} month='9' sp={sp} access={access} />,
            key: '1-9'
        },
        {
            rowName: 'Ноябрь',
            value: <CardPlansHelper data={data1} month='10' sp={sp} access={access} />,
            key: '1-10'
        },
        {
            rowName: 'Декабрь',
            value: <CardPlansHelper data={data1} month='11' sp={sp} access={access} />,
            key: '1-11'
        },
    ]

    const data4 = [
        {
            rowName: 'Январь',
            value: <CardPlansHelper data={data2} month='0' sp={sp} access={access} />,
            key: '2-0'
        },
        {
            rowName: 'Февраль',
            value: <CardPlansHelper data={data2} month='1' sp={sp} access={access} />,
            key: '2-1'
        },
        {
            rowName: 'Март',
            value: <CardPlansHelper data={data2} month='2' sp={sp} access={access} />,
            key: '2-2'
        },
        {
            rowName: 'Апрель',
            value: <CardPlansHelper data={data2} month='3' sp={sp} access={access} />,
            key: '2-3'
        },
        {
            rowName: 'Май',
            value: <CardPlansHelper data={data2} month='4' sp={sp} access={access} />,
            key: '2-4'
        },
        {
            rowName: 'Июнь',
            value: <CardPlansHelper data={data2} month='5' sp={sp} access={access} />,
            key: '2-5'
        },
        {
            rowName: 'Июль',
            value: <CardPlansHelper data={data2} month='6' sp={sp} access={access} />,
            key: '2-6'
        },
        {
            rowName: 'Август',
            value: <CardPlansHelper data={data2} month='7' sp={sp} access={access} />,
            key: '2-7'
        },
        {
            rowName: 'Сентябрь  ',
            value: <CardPlansHelper data={data2} month='8' sp={sp} access={access} />,
            key: '2-8'
        },
        {
            rowName: 'Октябрь',
            value: <CardPlansHelper data={data2} month='9' sp={sp} access={access} />,
            key: '2-9'
        },
        {
            rowName: 'Ноябрь',
            value: <CardPlansHelper data={data2} month='10' sp={sp} access={access} />,
            key: '2-10'
        },
        {
            rowName: 'Декабрь',
            value: <CardPlansHelper data={data2} month='11' sp={sp} access={access} />,
            key: '2-11'
        },
    ]

    const columns = [
        {
            dataIndex: 'rowName',
            render: (rowName: string) => <Text style={{ fontSize: '12pt' }} >{rowName}</Text>,
        },
        {
            dataIndex: 'value',
            width: '35%'
        },
    ]

    const handleCreateObjectPlansData = (typeval: '1' | '3') => {
        dispatch(createVMPPlansData(objectName, objectId, sp, typeval, objectType))
    }

    return (
        <Card style={{ marginBottom: '100px', padding: '0px' }} size="small">
            <Row>
                <Col span={11}>
                    <Table
                        title={() => <Text style={{ fontSize: '14pt' }}>Отчет по квалификации</Text>}
                        showHeader={false}
                        columns={data1.length > 0 ? columns : undefined}
                        dataSource={data1.length > 0 ? data3 : undefined}
                        pagination={false}
                        size="small"
                    />
                    {data1.length === 0 && <Button disabled={access > 1} type="primary" size="small" onClick={() => handleCreateObjectPlansData('1')} style={{ marginTop: '20px' }} icon={<PlusOutlined />}>Добавить данные</Button>}
                </Col>
                <Col span={11} push={2}>
                    <Table
                        title={() => <Text style={{ fontSize: '14pt' }}>Оценка валидационного статуса</Text>}
                        showHeader={false}
                        columns={data2.length > 0 ? columns : undefined}
                        dataSource={data2.length > 0 ? data4 : undefined}
                        pagination={false}
                        size="small"
                    />
                    {data2.length === 0 && <Button disabled={access > 1} type="primary" size="small" onClick={() => handleCreateObjectPlansData('3')} style={{ marginTop: '20px' }} icon={<PlusOutlined />}>Добавить данные</Button>}
                </Col>
            </Row>
        </Card>
    )
}