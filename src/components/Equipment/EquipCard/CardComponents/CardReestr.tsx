import { Button, Col, Row, Table, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getReestrData } from "../../../../redux/equipmentReducer"
import React, { useEffect } from "react"
import { getIsLoading, getReestrDataSelector } from "../../../../redux/equipmentSelectors"
import { ColumnsType } from "antd/es/table"
import { RenderDateHelper } from "../../../helpers/renderDateHelper"
import { ConvertDate } from "../../../helpers/convertDate"
import { FileWordOutlined, DeleteOutlined } from '@ant-design/icons';
const { Text, Link } = Typography


type reestrDataItemType = {
    id: string
    nvo: string
    vo: string
    dvo: string
    nvp: string
    vp: string
    dvp: string
    pam: string
}

type DataType = Array<reestrDataItemType>

type CardReestrPropsType = {
    id: string
    isReestrDataLoading: boolean
    reestrData: DataType
}

const CardReestr: React.FC<CardReestrPropsType> = ({id, isReestrDataLoading, reestrData}) => {
    const columns: ColumnsType<reestrDataItemType> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>Код протокола</Text>,
            dataIndex: 'nvp',
            render: (nvp, record) => {
                if (record.vp) {
                    return <Link href={'http://10.85.10.212/ov/' + record.vp}>{nvp}</Link>
                } else {
                    return <Text>{nvp}</Text>
                }
            },
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата утв. протокола</Text>,
            dataIndex: 'dvp',
            render: (dvp) => { return <ConvertDate date={dvp} /> },
            // width: '13%',
            align: 'center',
        },
        {
            title: <Text strong style={{fontSize: '12pt', textAlign: 'center'}}>Код отчета</Text>,
            dataIndex: 'nvo',
            render: (nvo, record) => {
                if (record.vo) {
                    return <Link href={'http://10.85.10.212/ov/' + record.vo}>{nvo}</Link>
                } else {
                    return <Text>{nvo}</Text>
                }
            },
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Дата утв. отчета</Text>,
            dataIndex: 'dvo',
            sorter: (a, b) => {
                // Используйте функцию сравнения дат для сортировки
                const dateA:any = new Date(a.dvo);
                const dateB:any = new Date(b.dvo);
                return dateA - dateB;
            },
            render: (dvo) => { return <ConvertDate date={dvo} /> },
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'descend',
            // width: '12%',
            align: 'center'
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Памятка</Text>,
            dataIndex: 'pam',
            render: (pam) => { return pam ? <Button icon={<FileWordOutlined style={{fontSize: '16pt'}} />} type="link" href={'http://10.85.10.212/ov/' + pam}>Просмотр</Button> : <Text type="danger">Отсутствует</Text>},
            width: '10%',
            align: 'center'
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={reestrData}
            bordered
            pagination={false} // Скрыть пагинацию, если есть
            style={{marginBottom: '30px'}}
            rowKey='id'
            loading={isReestrDataLoading}
        />
    )
}

export default React.memo(CardReestr)