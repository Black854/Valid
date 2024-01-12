import { AppDispatch } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDepartments } from "../../redux/Reducers/appReducer"
import { getEquipment } from "../../redux/Reducers/equipmentReducer"
import { Button, Col, Menu, Row, Select, Table, Typography } from "antd"
import { getEquipData, getIsLoading } from "../../redux/Selectors/equipmentSelectors"
import { getDepartmentsSelector } from "../../redux/Selectors/appSelectors"
import { useNavigate, useParams } from "react-router-dom"
import { PrinterOutlined } from "@ant-design/icons"
import { useReactToPrint } from "react-to-print"
import { ColumnsType } from "antd/es/table"
import { RenderDateHelper } from "../common/renderDateHelper"

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

export const EquipPlacement: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const equipData = useSelector(getEquipData)
    const isLoading = useSelector(getIsLoading)
    const departments = useSelector(getDepartmentsSelector)

    const [filterParam, setFilterParam] = useState(null as string | null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (departments.length === 0) {
            dispatch(getDepartments())
        }
    }, [])

    let departmentData = departments.filter(e => e.stat === '1').map((e: any) => ({ value: e.name, label: e.name }))

    if (equipData.length === 0 && isLoading === false) {
        dispatch(getEquipment())
    }

    const componentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const columns: ColumnsType<DataType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
            width: '3%',
        },
        {
            title: <Text>Помещение</Text>,
            dataIndex: 'nomer',
            render: (nomer) => nomer ? <Text>№ {nomer}</Text> : <Text type="warning">Не указано</Text>,
            width: '13%',
            align: 'center',
        },
        {
            title: <Text>Наименование</Text>,
            dataIndex: 'name',
            render: (name) => <Text>{name}</Text>,
        },
        {
            title: <Text>Уч. номер</Text>,
            dataIndex: 'inv',
            render: (inv) => {
                if (inv !== '') {
                    return <Text>{inv}</Text>
                } else {
                    return <Text type="warning">Отсутствует</Text>
                }
            },
            align: 'center',
            width: '14%',
        },
        {
            title: <Text>Дата (до)</Text>,
            dataIndex: 'date',
            render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
            width: '16%',
            align: 'center'
        },
    ]

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

    return <>
        <Button disabled={filterParam ? false : true} type="primary" onClick={handlePrint} icon={<PrinterOutlined />} size="small" style={{ margin: '20px 20px 0 0' }}>Напечатать</Button>
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
                    Отчет о местонахождении оборудования {filterParam} (всего: {equipNewData.length})
                </Text>
            </>}
            size="small"
            ref={componentRef}
        />
    </>
}