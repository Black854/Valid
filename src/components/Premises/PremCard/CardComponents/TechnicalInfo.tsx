import { Select, Table, Typography } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../redux/store"
import { getTechInfo } from "../../../../redux/Selectors/premisesSelectors"
import { getTechnicalInfo, updateTechnicalInfo } from "../../../../redux/Reducers/premisesReducer"
import { getPremModesSelector } from "../../../../redux/Selectors/appSelectors"
import { PremModesType } from "../../../../redux/Reducers/appReducer"
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

    const emptyData = {value: '', label: 'Не указано'}

    const mappedTempData = tempData?.map( e => ({ value: `${e.low} - ${e.hight}`, label: `${e.low} - ${e.hight} °C` }) )
    const mappedHumData = humData?.map( e => ({ value: `${e.low} - ${e.hight}`, label: `${e.low} - ${e.hight} %` }) )

    const updateTechInfo = (techType: string, text: string) => {
        dispatch(updateTechnicalInfo(id, techType, text))
    }
    const handleUpdateTemp = (text: string) => {
        dispatch(updateTechnicalInfo(id, 'temp', text))
    }

    const handleUpdateHum = (text: string) => {
        dispatch(updateTechnicalInfo(id, 'hum', text))
    }

    const anyData = [
        {
            value: techInfo?.project
        }           
    ]

    const anyColumns = [
        {
          dataIndex: 'value',
          render: (value: string) => value != '' ? <Text editable={{onChange: (text: string) => updateTechInfo('project', text)}} style={{fontSize: '12pt'}}>{value}</Text> :
                                                    <Text type='warning' editable={{onChange: (text: string) => updateTechInfo('project', text), text: ''}} style={{fontSize: '12pt'}} >Нет данных</Text>,
        }
    ]

    const skladData = [
        {
            rowName: 'Длина (мм)',
            value:  techInfo?.l ? <Text editable={{ onChange: (text) => {updateTechInfo('l', text)}, text: techInfo?.l}}>{ techInfo?.l } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('l', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Ширина (мм)',
            value:  techInfo?.w ? <Text editable={{ onChange: (text) => {updateTechInfo('w', text)}, text: techInfo?.w}}>{ techInfo?.w } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('w', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Высота (мм)',
            value:  techInfo?.h ? <Text editable={{ onChange: (text) => {updateTechInfo('h', text)}, text: techInfo?.h}}>{ techInfo?.h } мм</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('h', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Площадь (м²)',
            value:  techInfo?.s ? <Text editable={{ onChange: (text) => {updateTechInfo('s', text)}, text: techInfo?.s}}>{ techInfo?.s } м²</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('s', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Объем (м³)',
            value:  techInfo?.v ? <Text editable={{ onChange: (text) => {updateTechInfo('v', text)}, text: techInfo?.v}}>{ techInfo?.v } м³</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('v', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Наличие батарей',
            value:  techInfo?.bat ? <Text editable={{ onChange: (text) => {updateTechInfo('bat', text)}, text: techInfo?.bat}}>{ techInfo?.bat } шт</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('bat', text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие пароувлажнителей',
            value:  techInfo?.steam ? <Text editable={{ onChange: (text) => {updateTechInfo('steam', text)}, text: techInfo?.steam}}>{ techInfo?.steam } шт</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('steam', text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие кондиционеров',
            value:  techInfo?.con ? <Text editable={{ onChange: (text) => {updateTechInfo('con', text)}, text: techInfo?.con}}>{ techInfo?.con } шт</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('con', text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Наличие холодильных установок',
            value:  techInfo?.ref ? <Text editable={{ onChange: (text) => {updateTechInfo('ref', text)}, text: techInfo?.ref}}>{ techInfo?.ref } шт</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('ref', text)}, text: ''}}>Отсутствуют</Text>
        },
        {
            rowName: 'Датчик мониторинга 1 (номер по КС)',
            value:  techInfo?.sensor1 ? <Text editable={{ onChange: (text) => {updateTechInfo('sensor1', text)}, text: techInfo?.sensor1}}>{ techInfo?.sensor1 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('sensor1', text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 2 (номер по КС)',
            value:  techInfo?.sensor2 ? <Text editable={{ onChange: (text) => {updateTechInfo('sensor2', text)}, text: techInfo?.sensor2}}>{ techInfo?.sensor2 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('sensor2', text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 3 (номер по КС)',
            value:  techInfo?.sensor3 ? <Text editable={{ onChange: (text) => {updateTechInfo('sensor3', text)}, text: techInfo?.sensor3}}>{ techInfo?.sensor3 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('sensor3', text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 4 (номер по КС)',
            value:  techInfo?.sensor4 ? <Text editable={{ onChange: (text) => {updateTechInfo('sensor4', text)}, text: techInfo?.sensor4}}>{ techInfo?.sensor4 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('sensor4', text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Датчик мониторинга 5 (номер по КС)',
            value:  techInfo?.sensor5 ? <Text editable={{ onChange: (text) => {updateTechInfo('sensor5', text)}, text: techInfo?.sensor5}}>{ techInfo?.sensor5 }</Text>:
                                        <Text type="secondary" editable={{ onChange: (text) => {updateTechInfo('sensor5', text)}, text: ''}}>Отсутствует</Text>
        },
        {
            rowName: 'Кол-во приточных фильтров',
            value:  techInfo?.flow ? <Text editable={{ onChange: (text) => {updateTechInfo('flow', text)}, text: techInfo?.flow}}>{ techInfo?.flow } шт</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('flow', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Размеры приточных фильтров',
            value:  techInfo?.flowsize ? <Text editable={{ onChange: (text) => {updateTechInfo('flowsize', text)}, text: techInfo?.flowsize}}>{ techInfo?.flowsize }</Text>:
                                        (techInfo?.flow === '' ? <Text type="secondary">Не применимо</Text> :
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('flowsize', text)}, text: ''}}>Не указано</Text>)
        },
        {
            rowName: 'Кол-во ламп освещения',
            value:  techInfo?.lamp ? <Text editable={{ onChange: (text) => {updateTechInfo('lamp', text)}, text: techInfo?.lamp}}>{ techInfo?.lamp } шт</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('lamp', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Температурный режим по проекту',
            value:  <Select
                        defaultValue={techInfo?.temp}
                        onChange={handleUpdateTemp}
                        size="small"
                        style={{paddingRight: '20px', marginLeft: '-7px'}}
                        dropdownStyle={{width: 'auto'}}
                        bordered={false}
                        options={[emptyData, ...mappedTempData]}
                        // loading={isClassLoading}
                    />
        },
        {
            rowName: 'Влажность по проекту',
            value:  <Select
                        defaultValue={techInfo?.hum}
                        onChange={handleUpdateHum}
                        size="small"
                        style={{paddingRight: '20px', marginLeft: '-7px'}}
                        dropdownStyle={{width: 'auto'}}
                        bordered={false}
                        options={[emptyData, ...mappedHumData]}
                        // loading={isClassLoading}
                    />
        },
        {
            rowName: 'Требования по освещенности (Лк)',
            value:  techInfo?.light ? <Text editable={{ onChange: (text) => {updateTechInfo('light', text)}, text: techInfo?.light}}>{ techInfo?.light } Лк</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('light', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Кратность воздухообмена по проекту',
            value:  techInfo?.air ? <Text editable={{ onChange: (text) => {updateTechInfo('air', text)}, text: techInfo?.air}}>{ techInfo?.air }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('air', text)}, text: ''}}>Не указано</Text>
        },
        {
            rowName: 'Код проекта',
            value:  techInfo?.project ? <Text editable={{ onChange: (text) => {updateTechInfo('project', text)}, text: techInfo?.project}}>{ techInfo?.project }</Text>:
                                        <Text type="warning" editable={{ onChange: (text) => {updateTechInfo('project', text)}, text: ''}}>Не указано</Text>
        },
    ]

    const skladColumns = [
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
                columns={skladColumns}
                dataSource={skladData}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='rowName'
                style={{marginBottom: '60px'}}
            />
        )
    } else {
        return (
            <Table
                columns={anyColumns}
                dataSource={anyData}
                bordered
                pagination={false} // Скрыть пагинацию, если есть
                showHeader={false} // Скрыть заголовки, если есть
                rowKey='id'
                style={{marginBottom: '60px'}}
            />
        )
    }
    
}