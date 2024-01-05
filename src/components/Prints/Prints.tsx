import { Col, Row, Select, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import { getEquipment } from "../../redux/Reducers/equipmentReducer"
import { RenderDateHelper } from "../common/renderDateHelper"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { getEquipData, getIsLoading } from "../../redux/Selectors/equipmentSelectors"
import { useEffect, useState } from "react"
import { getDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { getDepartments } from "../../redux/Reducers/appReducer"

const { Text, Title } = Typography

interface DataType {
    id: string,
    sp2: string
    name: string
    serial: string
    inv: string
    group: string
    date: string
    ar: string
    nomer: string
}

export const Prints: React.FC = () => {

    const [filterParam, setFilterParam] = useState(null as string | null)

    const columns: ColumnsType<DataType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text>Местоположение</Text>,
            dataIndex: 'nomer',
            render: (nomer) => nomer ? <Text>№ {nomer}</Text> : <Text type="warning">Не указано</Text>,
            width: '8%',
            align: 'center',
        },
        {
            title: <Text>Наименование</Text>,
            dataIndex: 'name',
            render: (name, record) => <Text>{name}</Text>,
        },
        {
            title: <Text>Учетный номер</Text>,
            dataIndex: 'inv',
            render: (inv) => {
                if (inv !== '') {
                    return <Text>{inv}</Text>
                } else {
                    return <Text type="warning">Отсутствует</Text>
                }
            },
            align: 'center',
        },
        {
            title: <Text>Группа</Text>,
            dataIndex: 'group',
            render: (text) => <Text>{text}</Text>,
            width: '12%',
            align: 'center',
        },
        {
            title: <Text>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '10%',
            align: 'center'
        },
    ]

    const dispatch: AppDispatch = useDispatch()

    const equipData = useSelector(getEquipData)
    const isLoading = useSelector(getIsLoading)
    const departments = useSelector(getDepartmentsSelector)

    useEffect(() => {
        if (departments.length === 0) {
            dispatch(getDepartments())
        }
    }, [])

    let departmentData = departments.filter(e => e.stat === '1').map((e: any) => ({ value: e.name, label: e.name }))

    if (equipData.length === 0 && isLoading === false) {
        dispatch(getEquipment())
    }

    const equipNewData = equipData.filter(e => e.sp2 === filterParam).map(e => ({
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        serial: e.serial,
        inv: e.inv,
        group: e.groupp,
        date: e.date,
        ar: e.ar,
        nomer: e.nomer
    })).sort((a, b) => {
        const nameA = a.nomer.toUpperCase()
        const nameB = b.nomer.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    })

    const data: DataType[] = equipNewData.map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    return <Row style={{ margin: '20px 0 40px 0' }}>
        <Col span={18} push={1}>
            {/* <Title level={4}>Печатные формы</Title>
            <Text>Здесь будут списки объектов по местоположению</Text> */}
            <Text style={{ marginRight: '20px', display: 'inline-block' }}>Выберите подразделение:</Text>
            <Select
                style={{ paddingRight: '20px', marginLeft: '-7px', marginBottom: '10px', width: '150px' }}
                defaultValue='Не выбрано'
                dropdownStyle={{ width: '150px' }}
                size="small"
                bordered={false}
                options={departmentData}
                onChange={setFilterParam}
            />
            <Table
                columns={columns}
                dataSource={data}
                bordered={false}
                pagination={false}
                title={() => <>
                    <Text style={{ fontSize: '13pt' }}>
                        Оборудование {filterParam} (всего: {equipNewData.length})
                    </Text>
                </>}
                size="small"
            />
        </Col>
    </Row>
}