
import { PickerLocale } from 'antd/es/date-picker/generatePicker'
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';

export const datePickerLocale: PickerLocale = {
    lang: {
      placeholder: 'Выберите дату',
      yearPlaceholder: 'Выберите год',
      quarterPlaceholder: 'Выберите квартал',
      monthPlaceholder: 'Выберите месяц',
      weekPlaceholder: 'Выберите неделю',
      rangePlaceholder: ['Начальная дата', 'Конечная дата'],
      rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
      rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
      rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
      ...CalendarLocale,
    },
    timePickerLocale: {
        placeholder: 'Выберите время',
        rangePlaceholder: ['Время начала', 'Время окончания'],
    },
}