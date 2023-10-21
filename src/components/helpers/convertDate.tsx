import { Typography } from 'antd';
const { Text } = Typography;

type ConvertDateType = {
    date: string | undefined
}

export const ConvertDate: React.FC<ConvertDateType> = ({date}) => {
    if (date) {
        let parts = date.split('.'); // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`;
            // console.log(date)
            return <Text>{date}</Text>
        }
    
        parts = date.split('-'); // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`;
            // console.log(date)
            return <Text>{date}</Text>
        }
    }
    return <></>
}