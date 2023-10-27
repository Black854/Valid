import { DatePicker, Input, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
const { Text } = Typography;

type ConvertDateType = {
    date: string | undefined
}

export const ConvertDate: React.FC<ConvertDateType> = ({date}) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Открываем Popconfirm после изменения даты
        setPopconfirmVisible(true);
      };

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
            // return <Text>{date}</Text>
            
            let dateFormat ="DD.MM.YYYY"
            return <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={handleDateChange}
                        okText="Yes"
                        cancelText="No"
                        visible={isPopconfirmVisible}
                    >
                        <DatePicker format={'DD.MM.YYYY'} defaultValue={dayjs(date, dateFormat)} bordered={false}  />
                    </Popconfirm>
        }
    }
    return <></>
}