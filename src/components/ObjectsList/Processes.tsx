import { Typography, Col, Image, Row, Table, Button, Input, Space, message } from "antd"
import { Content } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { EyeOutlined } from '@ant-design/icons'
import { RenderDateHelper } from "../common/renderDateHelper"
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { getIsLoading, getProcData, getProcErrorMessage } from "../../redux/Selectors/processesSelectors"
import { getProcesses } from "../../redux/Reducers/processesReducer"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { NewObjectForm } from "./NewObjectForms/NewProcObjectForm"
import { defaultPagination } from "../../redux/Reducers/appReducer"
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"
import { getServerSelector } from "../../redux/Selectors/appSelectors"

const { Text } = Typography;

interface DataType {
    id: string,
    sp2: string
    name: string
    serial: string
    inv: string
    group: string
    date: string
    ar: string
    foto: string
}

type DataIndex = keyof DataType;

const Processes: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const procData = useSelector(getProcData)
    const isLoading = useSelector(getIsLoading)

    const errorMessage = useSelector(getProcErrorMessage)
    const access = parseInt(useSelector(getUserDataAccessSelector))
    const server = useSelector(getServerSelector)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: 'error',
                content: errorMessage,
                duration: 7
            })
        }
    }, [errorMessage])

    if (procData.length === 0 && isLoading === false && !errorMessage) {
        dispatch(getProcesses())
    }

    const procNewData = procData.map(e => ({
        id: e.id,
        key: e.id,
        sp2: e.sp2,
        name: e.name,
        serial: e.serial,
        inv: e.inv,
        group: e.groupp,
        date: e.date,
        ar: e.ar,
        foto: e.foto
    }))

    const [searchText, setSearchText] = useState('')
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Введите наименование объекта`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Найти
                    </Button>
                    <Button
                        onClick={() => { clearFilters && handleReset(clearFilters); confirm({ closeDropdown: false }) }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Сброс
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: <Text>№</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text>Наименование</Text>,
            dataIndex: 'name',
            render: (text, record) => (
                <Row>
                    <Col span={1}>
                        <Image style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}
                            src={record.foto ? server + record.foto : empty}
                            preview={{ mask: <EyeOutlined style={{ fontSize: '12pt' }} /> }}
                        />
                    </Col>
                    <Col span={23}>
                        <NavLink to={record.id} style={{ fontSize: '12pt', marginLeft: '10px' }}>
                            <Highlighter
                                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                                searchWords={[searchText]}
                                autoEscape
                                textToHighlight={text ?
                                    text.toString()
                                    : ''}
                            />
                        </NavLink>
                    </Col>
                </Row>),
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: <Text>Подразделение</Text>,
            dataIndex: 'sp2',
            filters: [
                { text: 'МБЛ', value: 'МБЛ' },
                { text: 'БХЛ', value: 'БХЛ' },
                { text: 'ФХЛ', value: 'ФХЛ' },
                { text: 'ЛИП', value: 'ЛИП' },
                { text: 'ЦС', value: 'ЦС' },
                { text: 'ГК', value: 'ГК' },
            ],
            render: (sp) => <Text>{sp}</Text>,
            onFilter: (value: any, record) => record.sp2.indexOf(value) === 0,
            sorter: (a, b) => a.sp2.localeCompare(b.sp2),
            sortDirections: ['descend'],
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

    const data: DataType[] = procNewData.map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    return <>
        {contextHolder}
        <Content style={{ padding: '20px 0', marginBottom: '40px' }}>
            <Row>
                <Col span={22} push={1}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered={false}
                        pagination={defaultPagination}
                        title={() => <>
                            <Text style={{ fontSize: '13pt' }}>
                                <NewObjectForm access={access} />
                                Процессы (всего: {procData.length})
                            </Text>
                        </>}
                        size="small"
                        style={{ marginBottom: '30px' }}
                        loading={isLoading}
                    />
                </Col>
            </Row>
        </Content>
    </>
}

export default Processes