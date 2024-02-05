import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, Typography, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { login } from '../../redux/Reducers/authReducer'
import { getAuthResponseMessage } from '../../redux/Selectors/authSelectors'
import authImage from '../../img/authImage.jpg'

const { Text } = Typography

export const Login: React.FC = () => {
    const authResponseMessage = useSelector(getAuthResponseMessage)
    const dispatch: AppDispatch = useDispatch()

    const onFinish = (values: any) => {
        dispatch(login(values.username, values.password, values.rememberMe))
    }

    const [form] = Form.useForm()

    return <>
        <Space style={{ display: 'grid', placeItems: 'center', height: '100vh', backgroundImage: `url(${authImage})`, backgroundPosition: 'center' }} >
            <div style={{position: 'relative', bottom: '50px'}}>
                <Text type='success' style={{fontSize: '22pt'}}>V</Text>
                <Text style={{fontSize: '16pt', display: 'inline-block', marginBottom: '70px'}}>alidControl - современная система управления валидацией</Text>
                <Card style={{ minWidth: '300px', backdropFilter: 'blur(1px)', backgroundColor: 'rgba(255, 255, 255, 0.1)', opacity: '0.7', borderColor: 'rgba(255, 255, 255, 0.2)' }} title='Для продолжения, авторизуйтесь'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                        autoComplete='on'
                        style={{ marginBottom: '0', paddingBottom: '0' }}
                    >
                        <Text type='warning' style={authResponseMessage ? { display: 'inline-block', marginBottom: '10px' } : {}}>{authResponseMessage}</Text>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
                            style={{ marginTop: '0' }}
                        >
                            <Input autoFocus prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя пользователя" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Пароль"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                                <Checkbox>Запомнить меня</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: '0' }}>
                            <Button type="primary" htmlType="submit">Войти</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Space >
    </>
}