import { Typography, Col, Image, Row, Spin, Table, Badge, Space, Dropdown, TableColumnsType, Progress, Button, Popconfirm, message } from "antd"
import { PremReestrType } from "../../../redux/premisesReducer"
import { EquipReestrType } from "../../../redux/equipmentReducer"
import { SysReestrType } from "../../../redux/systemsReducer"

type ProgresssHelper = {
    record: any
    myPremData: PremReestrType[]
    myEquipData: EquipReestrType[]
    mySysData?: SysReestrType[]
}

export const ProgressHelper: React.FC<ProgresssHelper> = ({record, myPremData, myEquipData, mySysData}) => {
    let a: number = 0
    let b: number = 1
    const thisObject = record.objectType === 'premises' ? myPremData.find(e => e.idfromtable === record.id) :
    record.objectType === 'equipment' ? myEquipData.find(e => e.idfromtable === record.id) :
    record.objectType === 'systems' ? mySysData?.find(e => e.idfromtable === record.id) : null
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
    }
    let c = Math.round((a/b)*100)
    return <Progress type="line" percent={c} size="small" status={c === 100 ? 'success' : 'normal'} />
}