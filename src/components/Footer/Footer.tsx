import { Footer } from "antd/es/layout/layout";

const CustomFooter: React.FC = () => {
    return (
        <Footer style={{position: 'fixed', bottom: '0px', width: '100%' }}>
            Информационная система ТОО "КФК" v 2.1 © Ввод в эксплуатацию: 14.07.2022 г.
        </Footer>
    )
}

export default CustomFooter
