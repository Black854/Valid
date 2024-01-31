import { addMonths } from 'date-fns'
import { format } from 'date-fns'
import { getIntervalsByAr, getTermSettingsSelector } from '../../redux/Selectors/appSelectors'
import { useSelector } from 'react-redux'
import { IntervalsType } from '../../redux/Reducers/appReducer'
import { AppStateType } from '../../redux/store'

type LabelDateHelperType = {
    date: string
    ar: string
}

export const LabelDateHelper: React.FC<LabelDateHelperType> = ({date, ar}) => {
    let mainInterval = useSelector((state: AppStateType) => getIntervalsByAr(state, ar))
    const termSettings = useSelector(getTermSettingsSelector)
    const termSettingsNumber = termSettings ? parseInt(termSettings) : 0
    if (mainInterval) {
        const monthCount = parseInt(mainInterval) + termSettingsNumber;
        if (date) {
            const parts = date.split('.') // Разделяем строку по точкам
            if (parts.length === 3) {
                // Проверяем, что строка содержит три части: день, месяц и год
                const day = parts[0]
                const month = parts[1]
                const year = parts[2]
                // Создаем новую дату в формате "yyyy-MM-dd"
                date = `${year}-${month}-${day}`
            }
        }

        const objectDate = new Date(date)
        const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
    
        let dateForPrint = format(resultObjectDate, 'dd.MM.yyyy')
        if (ar === '0') { return <>Не валидируется</> }
        else if (ar==='12') { return <>Законсервировано</> }
        else if (ar==='15') { return <>Списано</> }
        else if (ar==='11' || ar==='10') { return <>До изменений</>}
        else if (date === null) { return <>Нет данных</> }
        else { return <>{dateForPrint}</> }
    } else {
        return <>Ошибка</>
    }
}

export const labelEndDate = (date: string, ar: string, intervals: IntervalsType[], termSettingsNumber: number) => {
    const mainInterval = intervals.find((e: IntervalsType) => e.value === ar)
    
    let monthCountString = mainInterval?.interval
    if (monthCountString) {
        const monthCount = parseInt(monthCountString) + termSettingsNumber;
        if (date) {
            const parts = date.split('.') // Разделяем строку по точкам
            if (parts.length === 3) {
                // Проверяем, что строка содержит три части: день, месяц и год
                const day = parts[0]
                const month = parts[1]
                const year = parts[2]
                // Создаем новую дату в формате "yyyy-MM-dd"
                date = `${year}-${month}-${day}`
            }
        }

        const objectDate = new Date(date)
        const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
    
        let dateForPrint = format(resultObjectDate, 'dd.MM.yyyy')
        if (ar === '0') { return 'Не валидируется' }
        else if (ar==='12') { return 'Законсервировано' }
        else if (ar==='15') { return 'Списано' }
        else if (ar==='11' || ar==='10') { return 'До изменений'}
        else if (date === null) { return 'Нет данных' }
        else { return dateForPrint }
    } else {
        return 'Ошибка'
    }
}