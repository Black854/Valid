import { Select, Table, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../redux/store"
import { getTechInfo } from "../../../../redux/premisesSelectors"
import { getTechnicalInfo, updateTechnicalInfo } from "../../../../redux/premisesReducer"
import { getPremModesSelector } from "../../../../redux/appSelectors"
import { PremModesType } from "../../../../redux/appReducer"
const {Text} = Typography

type TechnicalInfoPropsType = {
    id: string
    premClass: string
}

export const TechnicalInfo: React.FC<TechnicalInfoPropsType> = ({ id, premClass }) => {
    const dispatch: AppDispatch= useDispatch()
    const techInfo = useSelector(getTechInfo)
    const premModes = useSelector(getPremModesSelector)
    const tempData = premModes?.filter(e => e.type === 't' && e.isactive === '')
    const humData = premModes?.filter(e => e.type === 'h' && e.isactive === '')

    const mappedTempData = tempData?.map(e => {{id: e.id, }})
    useEffect (() => {
        dispatch(getTechnicalInfo(id))
    }, [])

    const updateTechInfo = (text: string) => {
        dispatch(updateTechnicalInfo(id, text))
    }

    const data = [
        {
            value: techInfo?.project
        }           
    ]

    const updateDataNomer = (text: string) => {

    }

    const columns = [
        {
          dataIndex: 'value',
          render: (value: string) => value != '' ? <Text editable={{onChange: (text: string) => updateTechInfo(text)}} style={{fontSize: '12pt'}}>{value}</Text> :
                                                    <Text type='warning' editable={{onChange: (text: string) => updateTechInfo(text), text: ''}} style={{fontSize: '12pt'}} >Нет данных</Text>,
        }
    ]

    const data2 = [
        {
            rowName: 'Длина (мм)',
            value:  techInfo?.l ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.l } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Ширина (мм)',
            value:  techInfo?.w ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.w } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Высота (мм)',
            value:  techInfo?.h ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.h } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Площадь (м²)',
            value:  techInfo?.s ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.s } м²</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Объем (м³)',
            value:  techInfo?.v ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.v } м³</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Наличие батарей',
            value:  techInfo?.bat ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.bat }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие пароувлажнителей',
            value:  techInfo?.steam ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.steam }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие кондиционеров',
            value:  techInfo?.con ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.con }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие холодильных установок',
            value:  techInfo?.ref ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.ref }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Датчик мониторинга 1 (номер по КС)',
            value:  techInfo?.sensor1 ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.sensor1 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 2 (номер по КС)',
            value:  techInfo?.sensor2 ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.sensor2 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 3 (номер по КС)',
            value:  techInfo?.sensor3 ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.sensor3 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 4 (номер по КС)',
            value:  techInfo?.sensor4 ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.sensor4 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 5 (номер по КС)',
            value:  techInfo?.sensor5 ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.sensor5 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Кол-во приточных фильтров',
            value:  techInfo?.flow ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.flow }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Размеры приточных фильтров',
            value:  techInfo?.flowsize ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.flowsize }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Кол-во ламп освещения',
            value:  techInfo?.lamp ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.lamp }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Температурный режим по проекту',
            value:  <Select
                        defaultValue={techInfo?.temp}
                        // onChange={handleUpdateGroup}
                        size="small"
                        style={{paddingRight: '20px', marginLeft: '-7px'}}
                        dropdownStyle={{width: 'auto'}}
                        bordered={false}
                        options={mappedTempData}
                        // loading={isClassLoading}
                    />
        },
        {
            rowName: 'Влажность по проекту',
            value:  <Select
                        defaultValue={techInfo?.hum}
                        // onChange={handleUpdateGroup}
                        size="small"
                        style={{paddingRight: '20px', marginLeft: '-7px'}}
                        dropdownStyle={{width: 'auto'}}
                        bordered={false}
                        options={mappedHumData}
                        // loading={isClassLoading}
                    />
        },
        {
            rowName: 'Требования по освещенности (Лк)',
            value:  techInfo?.light ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.light } Лк</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Кратность воздухообмена по проекту',
            value:  techInfo?.air ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.air }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Код проекта',
            value:  techInfo?.project ? <Text editable={{ onChange: (text) => {updateDataNomer(text)}}}>{ techInfo?.project }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateDataNomer(text)}, text: ''}}>Не указано</Text>
        },
    ]

    const columns2 = [
        {
          dataIndex: 'rowName',
          render: (rowName: string) => <Text style={{fontSize: '12pt'}} >{rowName}</Text>,
        },
        {
          dataIndex: 'value',
          width: '60%'
        },
    ]
    if (premClass === 'Складские') {
        return (
            <Table
                columns={columns2}
                dataSource={data2}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='rowName'
            />
        )
    } else {
        return (
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='id'
            />
        )
    }
    
}