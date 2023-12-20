import { Space, Progress, Button, Popconfirm } from "antd"
import { PremReestrType } from "../../../redux/Reducers/premisesReducer"
import { EquipReestrType } from "../../../redux/Reducers/equipmentReducer"
import { SysReestrType } from "../../../redux/Reducers/systemsReducer"
import { ProcReestrType } from "../../../redux/Reducers/processesReducer"
import { AppDispatch } from "../../../redux/store"
import { useDispatch } from "react-redux"
import { setCancelTask, setSuccessTask } from "../../../redux/Reducers/workReducer"

type RecordType = {
    objectType: "equipment" | "premises" | "systems" | "processes"
    id: string
    key: string
    sp2: string
    name: string
    nomer: string
    class: string
    mode: string
    date: string
    ar: string
    foto: string
    fio: string
}

type ProgresssHelper = {
    record: RecordType
    myPremData: PremReestrType[]
    myEquipData: EquipReestrType[]
    mySysData: SysReestrType[]
    myProcData: ProcReestrType[]
    type: 'work' | 'mon'
}

export const ProgressHelper: React.FC<ProgresssHelper> = ({ record, myPremData, myEquipData, mySysData, myProcData, type }) => {
    let a: number = 0
    let b: number = 1
    const thisObject = record.objectType === 'premises' ? myPremData.find(e => e.idfromtable === record.id) :
        record.objectType === 'equipment' ? myEquipData.find(e => e.idfromtable === record.id) :
            record.objectType === 'systems' ? mySysData?.find(e => e.idfromtable === record.id) :
                record.objectType === 'processes' ? myProcData?.find(e => e.idfromtable === record.id) : null
    if (record.objectType === 'premises') {
        if (thisObject?.typeval === '1') {
            if (record.class === 'Чистые' || record.class === 'Контролируемые') {
                b = 7
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            } else {
                if (record.mode === '2 - 8 ºC' || record.mode === 'минус 30 - 35 ºC') {
                    b = 10
                    a += thisObject?.vp !== '' ? 1 : 0
                    a += thisObject?.nvp !== '' ? 1 : 0
                    a += thisObject?.dvp !== '' ? 1 : 0
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                    a += thisObject?.pam !== '' ? 1 : 0
                    a += thisObject?.pam2 !== '' ? 1 : 0
                    a += thisObject?.season !== '0' ? 1 : 0
                } else {
                    b = 8
                    a += thisObject?.vp !== '' ? 1 : 0
                    a += thisObject?.nvp !== '' ? 1 : 0
                    a += thisObject?.dvp !== '' ? 1 : 0
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                    a += thisObject?.season !== '0' ? 1 : 0
                }
            }
        } else if (thisObject?.typeval === '3') {
            if (record.class === 'Чистые' || record.class === 'Контролируемые') {
                b = 4
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            } else {
                if (record.mode === '2 - 8 ºC' || record.mode === 'минус 30 - 35 ºC') {
                    b = 4
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                } else {
                    b = 4
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                }
            }
        }
    } else if (record.objectType === 'equipment') {
        if (thisObject?.typeval === '1') {
            if (record.class === 'Термостаты') {
                b = 9
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.pam !== '' ? 1 : 0
                a += thisObject?.pam2 !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            } else if (record.class === 'Термоконтейнеры') {
                b = 7
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.pam !== '' ? 1 : 0
            } else {
                b = 7
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            }
        } else if (thisObject?.typeval === '3') {
            if (record.class === 'Термоконтейнеры') {
                b = 3
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
            } else {
                b = 4
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            }
        }
    } else if (record.objectType === 'systems') {
        if (thisObject?.typeval === '1') {
            b = 7
            a += thisObject?.vp !== '' ? 1 : 0
            a += thisObject?.nvp !== '' ? 1 : 0
            a += thisObject?.dvp !== '' ? 1 : 0
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
            a += thisObject?.et !== '' ? 1 : 0
        } else if (thisObject?.typeval === '3') {
            b = 4
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
            a += thisObject?.et !== '' ? 1 : 0
        }
    } else if (record.objectType === 'processes') {
        if (thisObject?.typeval === '1') {
            b = 6
            a += thisObject?.vp !== '' ? 1 : 0
            a += thisObject?.nvp !== '' ? 1 : 0
            a += thisObject?.dvp !== '' ? 1 : 0
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
        } else if (thisObject?.typeval === '3') {
            b = 3
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
        }
    }

    const dispatch: AppDispatch = useDispatch()

    const handleCancelTask = (objectId: string, objectType: "equipment" | "premises" | "systems" | "processes") => {
        console.log(objectId)
        dispatch(setCancelTask(objectId, objectType))
    }

    const handleSuccessTask = (objectId: string, objectType: "equipment" | "premises" | "systems" | "processes") => {
        console.log(objectId)
        console.log(objectType)
        dispatch(setSuccessTask(objectId, objectType))
    }

    let c = Math.round((a / b) * 100)
    if (type === 'mon') {
        if (c === 100) {
            return <>
                <Space style={{ textAlign: 'left' }}>
                    <Progress type="dashboard" size={[50, 50]} percent={c} steps={b} style={{ margin: '0px', padding: '0px', float: 'left' }} status={c === 100 ? 'success' : 'normal'} />
                    <div style={{ float: 'left', marginLeft: '10px' }}>
                        <Popconfirm
                            title='Подтвердите изменение'
                            description='Вы уверены, что хотите завершить задачу?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => handleSuccessTask(record.id, record.objectType)}
                        >
                            <Button style={{ display: 'inline' }} size="small" type="link">Завершить задачу</Button>
                        </Popconfirm>
                        <Popconfirm
                            title='Подтвердите изменение'
                            description='Вы уверены, что хотите отменить задачу?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => handleCancelTask(record.id, record.objectType)}
                        >
                            <Button style={{ display: 'inline' }} size="small" type="link">Отменить задачу</Button>
                        </Popconfirm>
                    </div>
                </Space>
            </>
        } else if (record.objectType === 'processes' && c >= 50) {
            return <>
                <Space style={{ textAlign: 'left' }}>
                    <Progress type="dashboard" size={[50, 50]} percent={c} steps={b} style={{ margin: '0px', padding: '0px', float: 'left' }} status={c >= 100 ? 'success' : 'normal'} success={{ percent: record.objectType === 'processes' ? c >= 50 ? c : 0 : 0 }} />
                    <div style={{ float: 'left', marginLeft: '10px' }}>
                        <Popconfirm
                            title='Подтвердите изменение'
                            description='Вы уверены, что хотите завершить задачу?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => handleSuccessTask(record.id, record.objectType)}
                        >
                            <Button style={{ display: 'inline' }} size="small" type="link">Завершить задачу</Button>
                        </Popconfirm>
                        <Popconfirm
                            title='Подтвердите изменение'
                            description='Вы уверены, что хотите отменить задачу?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => handleCancelTask(record.id, record.objectType)}
                        >
                            <Button style={{ display: 'inline' }} size="small" type="link">Отменить задачу</Button>
                        </Popconfirm>
                    </div>
                </Space>
            </>
        } else {
            return <>
                <Space style={{ textAlign: 'left', float: 'left' }}>
                    <Progress type="dashboard" size={[50, 50]} percent={c} steps={b} style={{ margin: '0px', padding: '0px', float: 'left' }} status={c >= 100 ? 'success' : 'normal'} />
                    <div style={{ float: 'left', marginLeft: '10px' }}>
                        <Popconfirm
                            title='Подтвердите изменение'
                            description='Вы уверены, что хотите отменить задачу?'
                            okText='Да'
                            cancelText='Нет'
                            onConfirm={() => handleCancelTask(record.id, record.objectType)}
                        >
                            <Button style={{ display: 'inline' }} size="small" type="link">Отменить задачу</Button>
                        </Popconfirm >
                    </div>
                </Space>
            </>
        }
    } else {
        return <Progress type="line" steps={b} percent={c} size={[12, 5]} style={{ margin: '0px', padding: '0px' }} status={c === 100 ? 'success' : 'normal'} />
    }
}