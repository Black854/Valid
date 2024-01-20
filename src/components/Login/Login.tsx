import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
import { Button, Card, Checkbox, Form, Input, Typography, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { login } from '../../redux/Reducers/authReducer'
import { getAuthResponseMessage, getIsAuthSelector } from '../../redux/Selectors/authSelectors'
import { useNavigate } from 'react-router-dom'
import authImage from '../../img/authImage.jpg'
import { getInitializeAppStatus } from '../../redux/Selectors/appSelectors'

const { Text } = Typography

export const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuthSelector)
    const initializeAppStatus = useSelector(getInitializeAppStatus)
    const authResponseMessage = useSelector(getAuthResponseMessage)
    const navigate = useNavigate()
    useEffect(() => {
        isAuth && navigate('/')
    }, [isAuth])
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

    return (!isAuth && !initializeAppStatus) ? <>
        <Space style={{ display: 'grid', placeItems: 'center', height: '100vh', backgroundImage: `url(${authImage})`, backgroundPosition: 'center' }} >
            <div>
                <Text type='warning' style={{fontSize: '22pt'}}>V</Text>
                <Text style={{fontSize: '16pt', display: 'inline-block', marginBottom: '20px'}}>alidControl - современная система управления валидацией</Text>
                <Card style={{ minWidth: '300px', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.1)', opacity: '0.7', borderColor: 'rgba(255, 255, 255, 0.2)' }} title='Для продолжения, авторизуйтесь'>
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
                            <SubmitButton form={form} />
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Space >
    </> : <> {navigate('/')} </>
}