import { Typography, Col, Image, Row, Spin, Table, Input, Space, Button, message } from "antd"
import { Content } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { EyeOutlined } from '@ant-design/icons'
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom"
import React, { useEffect, useRef, useState } from "react"
import { AppDispatch } from "../../redux/store"
import { getInstruments } from "../../redux/Reducers/instrumentsReducer"
import { getInstData, getInstErrorMessage, getIsLoading } from "../../redux/Selectors/instrumentsSelectors"
import { RenderDateHelperInstruments } from "../common/RenderDateHelperInstruments"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { NewObjectForm } from "./CreateNewObjectForm"
import { getUserDataAccessSelector } from "../../redux/Selectors/authSelectors"

const { Text } = Typography;

interface DataType {
    id: string
    name: string
    name2: string
    serial: string
    invno: string
    startDate: string
    endDate: string
    foto: string
}

type DataIndex = keyof DataType;

const Instruments: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const instData = useSelector(getInstData)
    const isLoading = useSelector(getIsLoading)

    const errorMessage = useSelector(getInstErrorMessage)
    const access = parseInt(useSelector(getUserDataAccessSelector))

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

    if (instData.length === 0 && isLoading === false && !errorMessage) {
        dispatch(getInstruments())
    }
    const instNewData = instData.map(e => ({
        id: e.id,
        key: e.id,
        name: e.name,
        name2: e.name2,
        serial: e.serial,
        invno: e.invno,
        startDate: e.date1,
        endDate: e.date2,
        foto: e.foto
    }))
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
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
            title: <Text strong style={{ fontSize: '12pt' }}>№</Text>,
            dataIndex: 'index',
            align: 'center'
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Наименование</Text>,
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
                            src={record.foto ? "http://10.85.10.212/ov/" + record.foto : empty}
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
            ...getColumnSearchProps('name')
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Тип</Text>,
            dataIndex: 'name2',
            render: (name2, record) => <Text>{name2}</Text>,
            sorter: (a, b) => a.name2.localeCompare(b.name2)
        },
        {
            title: <Text strong style={{ fontSize: '12pt' }}>Дата (до)</Text>,
            dataIndex: 'endDate',
            render: (endDate, record) => { return (record.startDate === '' && endDate === '') ? <Text type="secondary">Не подлежит поверке</Text> : <RenderDateHelperInstruments date={endDate} /> },
            width: '10%',
            align: 'center'
        },
    ]

    const data: DataType[] = instNewData.map((item, index) => ({
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
                        pagination={{ defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] }}
                        title={() => <>
                            <Text style={{ fontSize: '13pt' }}>
                                <NewObjectForm access={access} />
                                Валидационные приборы (всего: {instData.length})
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

export default Instruments