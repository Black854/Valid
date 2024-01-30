import { AppDispatch } from "../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getEquipment } from "../../redux/Reducers/equipmentReducer"
import { Button, Select, Table, Typography } from "antd"
import { getEquipData } from "../../redux/Selectors/equipmentSelectors"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { PrinterOutlined } from "@ant-design/icons"
import { useReactToPrint } from "react-to-print"
import { ColumnsType } from "antd/es/table"
import { getPremData } from "../../redux/Selectors/premisesSelectors"
import { getSysData } from "../../redux/Selectors/systemsSelectors"
import { getProcData } from "../../redux/Selectors/processesSelectors"
import { getPremises } from "../../redux/Reducers/premisesReducer"
import { getSystems } from "../../redux/Reducers/systemsReducer"
import { getProcesses } from "../../redux/Reducers/processesReducer"

const { Text } = Typography

interface DataType {
    id: string,
    sp2: string
    name: string
    nomer: string
    foto: string
}

export const ObjectsWithoutAvatars: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const equipData = useSelector(getEquipData)
    const premData = useSelector(getPremData)
    const sysData = useSelector(getSysData)
    const procData = useSelector(getProcData)

    const [filterParam, setFilterParam] = useState('объектам' as string)

    useEffect(() => {
        dispatch(getPremises())
        dispatch(getEquipment())
        dispatch(getSystems())
        dispatch(getProcesses())
    }, [])

    let selectData = [
        { value: 'помещениям', label: 'Помещения' },
        { value: 'оборудованию', label: 'Оборудование' },
        { value: 'системам', label: 'Системы' },
        { value: 'процессам', label: 'Процессы' },
    ]

    const componentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const columns: ColumnsType<DataType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center',
            width: '4%',
        },
        {
            title: <Text>Подразделение</Text>,
            dataIndex: 'sp2',
            render: (sp2) => <Text>{sp2}</Text>,
            align: 'center',
            width: '17%',
        },
        {
            title: <Text>Наименование</Text>,
            dataIndex: 'name',
            render: (text, record) => <NavLink to={filterParam === 'помещениям' ? `/premises/${record.id}` : filterParam === 'оборудованию' ? `/equipment/${record.id}` : filterParam === 'системам' ? `/systems/${record.id}` : filterParam === 'процессам' ? `/processes/${record.id}` : ''} style={{ fontSize: '12pt', marginLeft: '10px' }}>
                {text}
            </NavLink>,
        },
    ]

    const filteredEquipData = equipData.filter(e => e.foto === '').map((e, index) => ({
        index: index + 1,
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        foto: e.foto
    })).sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    }).map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const filteredPremData = premData.filter(e => e.foto === '').map((e, index) => ({
        index: index + 1,
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.class === 'Складские' ? `Помещение ${e.nomer} «${e.name}»` : e.name,
        nomer: e.nomer,
        foto: e.foto,
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
    }).map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const filteredSysData = sysData.filter(e => e.foto === '').map((e, index) => ({
        index: index + 1,
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        foto: e.foto
    })).sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    }).map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const filteredProcData = procData.filter(e => e.foto === '').map((e, index) => ({
        index: index + 1,
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        nomer: e.nomer,
        foto: e.foto
    })).sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()

        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0
    }).map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const data = filterParam === 'помещениям' ? filteredPremData :
        filterParam === 'оборудованию' ? filteredEquipData :
            filterParam === 'системам' ? filteredSysData :
                filterParam === 'процессам' ? filteredProcData :
                    undefined

    return <>
        <Button disabled={filterParam === 'объектам'} type="primary" onClick={handlePrint} icon={<PrinterOutlined />} size="small" style={{ margin: '20px 20px 0 0' }}>Напечатать</Button>
        <Text style={{ marginRight: '20px', display: 'inline-block' }}>Выберите тип объекта:</Text>
        <Select
            style={{ paddingRight: '20px', marginLeft: '-7px', marginBottom: '10px', width: '160px' }}
            defaultValue='Не выбрано'
            dropdownStyle={{ width: '160px' }}
            size="small"
            bordered={false}
            options={selectData}
            onChange={setFilterParam}
        />
        <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={false}
            title={() => <>
                <Text style={{ fontSize: '13pt' }}>
                    Отчет по {filterParam} без титульной фотографии  (всего: {data ? data.length : '0'})
                </Text>
            </>}
            size="small"
            ref={componentRef}
        />
    </>
}