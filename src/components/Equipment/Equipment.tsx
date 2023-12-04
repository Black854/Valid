import { Typography, Col, Image, Row, Spin, Table, Card, Button, Space, Input } from "antd";
import { Content } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux";
import { getEquipData, getIsLoading } from "../../redux/Selectors/equipmentSelectors";
import { getEquipment } from "../../redux/Reducers/equipmentReducer";
import { EyeOutlined } from '@ant-design/icons';
import { RenderDateHelper } from "../common/renderDateHelper";
import empty from './../../img/empty.png'
import { NavLink } from "react-router-dom";
import React, { useRef, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

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

export const Equipment: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const equipData = useSelector(getEquipData)
  const isLoading = useSelector(getIsLoading)

  if (equipData.length === 0 && isLoading === false) {
    dispatch(getEquipment())
  }
  const equipNewData = equipData.map(e => ({
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
      ...getColumnSearchProps('name'),
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Подразделение</Text>,
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
      title: <Text strong style={{ fontSize: '12pt' }}>Учетный номер</Text>,
      dataIndex: 'inv',
      render: (inv) => {
        if (inv !== '') {
          return <Text>{inv}</Text>
        } else {
          return <Text type="warning">Отсутствует</Text>
        }
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
      align: 'center',
      ...getColumnSearchProps('inv'),
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Группа</Text>,
      dataIndex: 'group',
      filters: [
        { text: 'Термостаты', value: 'Термостаты' },
        { text: 'Тех. оборудование', value: 'Тех. оборудование' },
        { text: 'Лаб. оборудование', value: 'Лаб. оборудование' },
        { text: 'Термоконтейнеры', value: 'Термоконтейнеры' }
      ],
      render: (text) => <Text>{text}</Text>,
      onFilter: (value: any, record) => record.group.indexOf(value) === 0,
      sorter: (a, b) => a.group.localeCompare(b.group),
      sortDirections: ['ascend'],
      width: '12%',
      align: 'center',
    },
    {
      title: <Text strong style={{ fontSize: '12pt' }}>Дата (до)</Text>,
      dataIndex: 'date',
      render: (date, record) => { return <RenderDateHelper date={date} record={record} /> },
      width: '10%',
      align: 'center'
    },
  ]

  const data: DataType[] = equipNewData.map((item, index) => ({
    ...item,
    index: index + 1,
  }))
  if (isLoading) {
    return <Spin size="large" style={{ width: '60px', height: '60px', margin: '30px auto 10px auto' }} />
  }
  return (
    <Content style={{ padding: '20px 0', marginBottom: '60px' }}>
      <Row>
        <Col push={1} xs={4} sm={22} md={22} lg={22} xl={22} xxl={22} >
          <Table
            columns={columns}
            dataSource={data}
            bordered={false}
            pagination={{ defaultPageSize: 20 }}
            title={() => <Text style={{ fontSize: '14pt' }}>Оборудование (всего: {equipData.length})</Text>}
            size="small"
          />
        </Col>
      </Row>
    </Content>
  )
}