import { Footer } from "antd/es/layout/layout";

export const CustomFooter: React.FC = () => {
    return (
        <Footer style={{position: 'fixed', bottom: '0px', width: '100%', zIndex: '2', height: '30px', padding: '5px 0px 5px 40px' }} >
            Информационная система ТОО "КФК" v 2.1 © Ввод в эксплуатацию: 14.07.2022 г.
        </Footer>
    )
}