import { Button, Col, Input, Popconfirm, Row, Select, Table, Typography, message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../redux/store"
import { getCleanPremListSelector, getCleanTabSelector, getIsCleanPremDataLoading } from "../../../../redux/premisesSelectors"
import { createCleanPrem, deleteCleanPrem, getCleanPremList, updateCleanPremItemData } from "../../../../redux/premisesReducer"
import { getDepartmentsSelector } from "../../../../redux/appSelectors"
import { ColumnsType } from "antd/es/table"
import { PlusOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
const {Text} = Typography

type TechnicalInfoPropsType = {
    id: string
}

type CleanPremListTypeWithIndex = {
    id: string
    sp: string
    nomer: string
    name: string
    index: number
}

export const CleanPremList: React.FC<TechnicalInfoPropsType> = ({ id }) => {
    const [messageApi, contextHolder] = message.useMessage()
    const warn = (fieldName: string) => {
        messageApi.open({
          type: 'warning',
          content: `Не заполнено поле "${fieldName}"`,
        })
    }
    const error = (nomer: string) => {
        messageApi.open({
          type: 'error',
          content: `Помещение с номером ${nomer} уже существует!`,
        })
    }
    const success = () => {
        messageApi.open({
          type: 'success',
          content: `Помещение добавлено`,
        })
    }
    const [isNewPremAdding, setIsNewPremAdding] = useState(false)
    const dispatch: AppDispatch = useDispatch()
    const cleanPremList = useSelector(getCleanPremListSelector)
    const cleanTab = useSelector(getCleanTabSelector)
    let cleanPremListWithIndex = cleanPremList.map((item, index) => ({
        ...item,
        index: index + 1,
    }))
    if (isNewPremAdding) {
        const newPremObject = {
            id: '',
            name: '',
            nomer: '',
            sp: '',
            index: 0
        }
        cleanPremListWithIndex = [newPremObject, ...cleanPremListWithIndex]
    }
    const departments = useSelector(getDepartmentsSelector)
    const isCleanPremDataLoading = useSelector(getIsCleanPremDataLoading)
    let filteredDepartments = departments.filter(e => e.stat === '1')
    let departmentData = filteredDepartments.map((e: any) => ({ value: e.name, label: e.name }))
    useEffect(() => {
        dispatch(getCleanPremList(id))
    }, [])

    const handleUpdateCleanPrem = (recordId: string, text: string, dataType: 'nomer' | 'sp' | 'name') => {
        dispatch(updateCleanPremItemData(id, recordId, text, dataType))
    }

    const [inputValues, setInputValues] = useState({
        name: '',
        sp: '',
        nomer: ''
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInputValues({
            ...inputValues,
            [name]: value,
        })
    }

    const handleDepartmentChange = (value: string) => {
        setInputValues({
            ...inputValues,
            sp: value,
        })
      }

    const handleSavePrem = () => {
        if (inputValues.nomer === '') {
            warn('Номер помещения')
        } 
        if (inputValues.sp === '') {
            warn('Подразделение')
        } 
        if (inputValues.name === '') {
            warn('Наименование')
        }
        if (inputValues.nomer !== '' && inputValues.sp !== '' && inputValues.name !== '') {
            const result = cleanPremListWithIndex.find(e => e.nomer === inputValues.nomer)
            if (!result) {
                dispatch(createCleanPrem(cleanTab, inputValues.nomer, inputValues.sp, inputValues.name))
                setIsNewPremAdding(false)
                success()
            } else {
                error(inputValues.nomer)
            }
        }
    }
    
    const handleAddPrem = () => {
        setIsNewPremAdding(true)
    }

    const handleCancel = () => {
        setIsNewPremAdding(false)
    }

    const handleDeleteCleanPrem = (recordId: string) => {
        dispatch(deleteCleanPrem(id, cleanTab, recordId))
    }

    const columns: ColumnsType<CleanPremListTypeWithIndex> = [
        {
            title: <Text strong style={{fontSize: '12pt'}}>№</Text>,
            dataIndex: 'index',
            align: 'center',
            render: (index) => index !== 0 ? index : ''
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Номер помещения</Text>,
            dataIndex: 'nomer',
            render: (nomer, record) => record.index !== 0 ? <Text editable={{onChange: (text: string) => {handleUpdateCleanPrem(record.id, text, 'nomer')}, text: nomer}} >{`№ ${nomer}`}</Text>:
                                                            <Input onChange={handleInputChange} type="number" name="nomer" placeholder="Введите номер" />
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Ответственное подразделение</Text>,
            dataIndex: 'sp',
            align: 'center',
            render: (sp, record) => record.index !== 0 ?    <Select
                                                                defaultValue={sp}
                                                                onChange={(text) => handleUpdateCleanPrem(record.id, text, 'sp')}
                                                                size="small"
                                                                dropdownStyle={{width: '120px'}}
                                                                style={{paddingRight: '20px', marginLeft: '-7px'}}
                                                                bordered={false}
                                                                options={departmentData}
                                                            /> :
                                                            <Select
                                                                defaultValue='Не выбрано'
                                                                options={departmentData}
                                                                dropdownStyle={{minWidth: '120px'}}
                                                                onChange={handleDepartmentChange}
                                                            />
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Наименование</Text>,
            dataIndex: 'name',
            render: (name, record) =>  record.index !== 0 ? <Text editable={{onChange: (text: string) => {handleUpdateCleanPrem(record.id, text, 'name')}, text: name}} >{name}</Text> :
                                                            <Input name="name" placeholder="Введите наименование" onChange={handleInputChange} />
        },
        {
            title: <Text strong style={{fontSize: '12pt'}}>Действия</Text>,
            render: (name, record, index) =>    <Row>
                                                    <Col span={18} push={3} style={{display: 'flex', flexDirection: 'column'}}>
                                                        {(index === 0 && isNewPremAdding) ? <>  <Button style={{display: 'block'}} onClick={handleSavePrem} size="small" type="link" icon={<SaveOutlined />}>Сохранить</Button>
                                                                                                <Button style={{display: 'block', marginTop: '5px'}} onClick={handleCancel} size="small" type="link" icon={<DeleteOutlined />}>Отмена</Button></> :
                                                                                                <Popconfirm
                                                                                                    title='Подтвердите удаление'
                                                                                                    description='Вы уверены, что хотите удалить помещение? При удалении помещения оно так же удалится из всех этикеток'
                                                                                                    okText='Да'
                                                                                                    cancelText='Нет'
                                                                                                    onConfirm={() => handleDeleteCleanPrem(record.id)}
                                                                                                >
                                                                                                    <Button style={{display: 'block', marginTop: '5px'}} size="small" danger type="link" icon={<DeleteOutlined />}>Удалить</Button>
                                                                                                </Popconfirm>
                                                        }
                                                        
                                                    </Col>
                                                </Row>,
            align: 'center'            
        }
    ]

    return (
        <>
            {contextHolder}
            <Button icon={<PlusOutlined />} style={{position: 'absolute', top: '15px', zIndex: '1'}} onClick={handleAddPrem}>Добавить помещение</Button>
            <Table
                columns={columns}
                dataSource={cleanPremListWithIndex}
                bordered
                pagination={{position: ["topRight"], defaultPageSize: 10}}
                rowKey='id'
                style={{marginBottom: '60px'}}
                loading={isCleanPremDataLoading}
            />
        </>
    )
    
}