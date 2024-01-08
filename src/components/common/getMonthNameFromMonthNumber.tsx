export const getMonthNameFromMonthNumber = (monthNumber: number) => {
    const monthes = [
        { name: 'январь', number: 0 },
        { name: 'февраль', number: 1 },
        { name: 'март', number: 2 },
        { name: 'апрель', number: 3 },
        { name: 'май', number: 4 },
        { name: 'июнь', number: 5 },
        { name: 'июль', number: 6 },
        { name: 'август', number: 7 },
        { name: 'сентябрь', number: 8 },
        { name: 'октябрь', number: 9 },
        { name: 'ноябрь', number: 10 },
        { name: 'декабрь', number: 11 },
    ]
    const resultName = monthes.filter(e => e.number === monthNumber).map(e => e.name)
    return resultName
}