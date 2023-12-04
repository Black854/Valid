import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const Result404: React.FC = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Страница не найдена"
            extra={<Link to="/">
                <Button type="primary">На главную</Button>
            </Link>}
        />
    )
}