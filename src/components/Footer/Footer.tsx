import { Footer } from "antd/es/layout/layout";

export const CustomFooter: React.FC = () => {
    const currentYear = new Date().getFullYear()
    return (
        <Footer style={{position: 'fixed', bottom: '0px', width: '100%', zIndex: '2', height: '30px', padding: '5px 0px 5px 40px' }} >
            ValidControl - современная система управления валидацией. Все права защищены © {currentYear} г. 
        </Footer>
    )
}