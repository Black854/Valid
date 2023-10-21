import { Typography } from "antd"
const { Text } = Typography

type ArHelperPropsType = {
    ar: string
}

export const ArHelper: React.FC<ArHelperPropsType> = ({ar}) => {
    if (ar==='0'){ return <Text>Не валидируется</Text>} 
    else if (ar==='0,5'){ return <Text>Квалификация 1 раз в год c промежуточным контролем</Text> } 
    else if (ar==='13'){ return <Text>Квалификация 1 раз в полгода</Text> } 
    else if (ar==='1') { return <Text>Квалификация 1 раз в год</Text> }
    else if (ar==='2') { return <Text>Квалификация 1 раз в 2 года</Text> } 
    else if (ar==='3') { return <Text>Квалификация 1 раз в 3 года</Text> } 
    else if (ar==='4') { return <Text>Квалификация 1 раз в 3 года (посезонно)</Text> } 
    else if (ar==='5') { return <Text>Квалификация 1 раз в 5 лет</Text> } 
    else if (ar==='16') { return <Text>Квалификация 1 раз в 5 лет (без оформления ПОТС)</Text> } 
    else if (ar==='10') { return <Text>Квалификация по изменениям (с оформлением ПОТС)</Text> } 
    else if (ar==='11') { return <Text>Квалификация по изменениям (без оформления ПОТС)</Text> } 
    else if (ar==='12') { return <Text>Законсервировано</Text> } 
    else if (ar==='14') { return <Text>Квалификация 1 раз в 5 лет (посезонно)</Text> } 
    else if (ar==='15') { return <Text type="danger">Списано</Text> }
    else {return <Text type="danger">Неизвестный тип данных</Text>}
}