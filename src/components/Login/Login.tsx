import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
import { Button, Card, Checkbox, Form, Input, Typography, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { login } from '../../redux/Reducers/authReducer'
import { getAuthResponseMessage, getIsAuthSelector } from '../../redux/Selectors/authSelectors'
import { useLocation, useNavigate } from 'react-router-dom'

const { Text } = Typography

export const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    const authResponseMessage = useSelector(getAuthResponseMessage)
    const navigate = useNavigate()
    { isAuth && navigate('/') }
    const dispatch: AppDispatch = useDispatch()

    const onFinish = (values: any) => {
        dispatch(login(values.username, values.password, values.rememberMe))
    }

    const [form] = Form.useForm()

    const SubmitButton = ({ form }: { form: FormInstance }) => {
        const [submittable, setSubmittable] = useState(false)

        const values = Form.useWatch([], form)

        useEffect(() => {
            form.validateFields({ validateOnly: true }).then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            )
        }, [values])

        return (
            <Button type="primary" htmlType="submit" disabled={!submittable}>
                Войти
            </Button>
        )
    }

    return (
        <Space style={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
            <Card style={{ minWidth: '300px' }} title='Авторизация'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                    autoComplete='off'
                >
                    <Text type='warning' style={{ display: 'inline-block', marginBottom: '10px' }}>{authResponseMessage}</Text>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя пользователя" />
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
                    <Form.Item>
                        <SubmitButton form={form} />
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    )
}