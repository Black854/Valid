import { VMPDataType } from "../../redux/Reducers/vmpReducer";

export const plansDataBuilder = (VMPData: VMPDataType[], typeval: string) => {
    const r1 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] !== '0')
    const r2 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] !== '0')
    const r3 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] !== '0')
    const r4 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] !== '0')
    const r5 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] !== '0')
    const r6 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] !== '0')
    const r7 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] !== '0')
    const r8 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] === '0' && 
                                    e['8'] !== '0')
    const r9 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] === '0' && 
                                    e['8'] === '0' && 
                                    e['9'] !== '0')
    const r10 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] === '0' && 
                                    e['8'] === '0' && 
                                    e['9'] === '0' && 
                                    e['10'] !== '0')
     const r11 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] === '0' && 
                                    e['8'] === '0' && 
                                    e['9'] === '0' && 
                                    e['10'] === '0' && 
                                    e['11'] !== '0')
    const r12 = VMPData.filter(e =>  e.typeval === typeval && 
                                    e['1'] === '0' && 
                                    e['2'] === '0' && 
                                    e['3'] === '0' && 
                                    e['4'] === '0' && 
                                    e['5'] === '0' && 
                                    e['6'] === '0' && 
                                    e['7'] === '0' && 
                                    e['8'] === '0' && 
                                    e['9'] === '0' && 
                                    e['10'] === '0' && 
                                    e['11'] === '0' && 
                                    e['12'] !== '0')
    const data = [...r1, ...r2, ...r3, ...r4, ...r5, ...r6, ...r7, ...r8, ...r9, ...r10, ...r11, ...r12]
    return data
}