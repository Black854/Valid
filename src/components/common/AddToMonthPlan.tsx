import { Button, Col, Row, Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { PlusOutlined } from '@ant-design/icons'
import { AppDispatch } from "../../redux/store"
import { getAddToMonthPlanIsLoading, getMonthPlanObjectDataSelector } from "../../redux/Selectors/appSelectors"
import { Loading } from "./Loading"
import { createObjectInMonthPlane, getMonthPlanObjectData } from "../../redux/Reducers/appReducer"
import { getMonthNameFromMonthNumber } from "./getMonthNameFromMonthNumber"
const { Title } = Typography

type PhotosBlockPropsType = {
    id: string
    objectType: 'equipment' | 'premises'| 'systems'| 'processes'
}

export const AddToMonthPlan: React.FC<PhotosBlockPropsType> = ({ id, objectType }) => {

    const currentMonth = `${(new Date().getMonth() + 1).toString().length === 1 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}.${new Date().getFullYear()}`
    const monthNumber = new Date().getMonth()

    const dispatch: AppDispatch = useDispatch()
    const isLoading = useSelector(getAddToMonthPlanIsLoading)
    const data = useSelector(getMonthPlanObjectDataSelector)

    useEffect(() => {
        dispatch(getMonthPlanObjectData(id, objectType, currentMonth))
    }, [])

    const handleAddToMonthPlan = () => {
        dispatch(createObjectInMonthPlane(id, objectType, currentMonth))
    }

    return isLoading ? <Loading /> : (
        <Row gutter={4} style={{ marginBottom: '100px' }}>
            <Col>
                <Title level={4}>Добавление объекта в работу</Title>
                {data?.isPlanned ?
                    <Row gutter={4}>
                        <Col>
                            <Title level={5}>Объект запланирован на текущий месяц</Title>
                        </Col>
                        <Col>
                            {data.fio ?
                                <Title level={5} type='success'> - исполнитель - {data.fio}</Title> :
                                <Title level={5} type='warning'> - исполнитель еще не назначен</Title>
                            }
                            {data.date1 && data.date2 ?
                                <Title level={5} type='success'> - сроки работ с {data.date1} по {data.date2}</Title> :
                                data.date1 ?
                                    <Title level={5} type='success'> - начало работ с {data.date1}</Title> :
                                    <Title level={5} type='warning'> - сроки еще не назначены</Title>
                            }
                            {data.workType ?
                                <Title level={5} type='success'> - результат работ - {data.workType.toLowerCase()}</Title> :
                                <Title level={5} type='warning'> - тип работ еще не назначен</Title>
                            }
                        </Col>
                    </Row> :
                    <>
                        <Row gutter={4} style={{ marginBottom: '20px' }}>
                            <Col>
                                <Title level={5}>Объект не запланирован на текущий месяц</Title>
                            </Col>
                            <Col>
                                <Title level={5} type='success'> - добавление разрешено</Title>
                            </Col>
                        </Row>
                        <Button type="primary" size="small" icon={<PlusOutlined />} onClick={handleAddToMonthPlan}>Добавить объект в план на {getMonthNameFromMonthNumber(monthNumber)}</Button>
                    </>
                }
            </Col>
        </Row>
    )
}