import { Controller, FieldError, UseFormRegister } from 'react-hook-form'
import s from './FormControls.module.css'
import React from 'react'
import { Button, Col, Descriptions, DescriptionsProps, Image, Input, Modal, Row, Space, Upload, Typography, Form, Checkbox } from 'antd'
import TextArea from 'antd/es/input/TextArea'
const {Text, Title} = Typography

type CustomControllerProps = {
    name: string
    type: string
    control?: any
    label?: string
    required?: boolean
    maxLength?: number
    minLength?: number
    pattern?: string
    onBlur?: any
    styleProps?: {}
    onEnter?: any
}

export const CustomController: React.FC<CustomControllerProps> = ({control, type, name, label, required, maxLength, minLength, pattern, onBlur, styleProps, onEnter}) => {
    let rules = {}
    if (required) {
        rules = {
            ...rules,
            required: 'Поле обязательно для заполнения'
        }
    }
    if (maxLength) {
        rules = {
            ...rules,
            maxLength: {
                value: maxLength,
                message: `Поле не может содержать более ${maxLength} символов`
            }
        }
    }
    if (minLength) {
        rules = {
            ...rules,
            minLength: {
                value: minLength,
                message: `Поле не может содержать менее ${minLength} символов`
            }
        }
    }
    if (pattern && pattern==='URL') {
        rules = {
            ...rules,
            pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Введенное значение не соответствует URL-адресу',
            }
        }
    }
    return(
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                type==='checkbox' ? (<Form.Item style={{margin: 0}}><Checkbox checked={field.value} {...field} /><Text style={{marginLeft: '10px'}}>{label}</Text></Form.Item>) : 
                type==='text' ? (<Form.Item label={label} validateStatus={fieldState.invalid ? 'error' : ''} help={fieldState.invalid ? fieldState.error?.message : null}> <Input style={styleProps} {...field} /></Form.Item>) :
                type==='email' ? (<Form.Item label={label} validateStatus={fieldState.invalid ? 'error' : ''} help={fieldState.invalid ? fieldState.error?.message : null}> <Input style={styleProps} {...field} type='email' /></Form.Item>) :
                type==='password' ? (<Form.Item label={label} validateStatus={fieldState.invalid ? 'error' : ''} help={fieldState.invalid ? fieldState.error?.message : null}> <Input style={styleProps} {...field} type='password' /></Form.Item>) :
                (<Form.Item label={label} validateStatus={fieldState.invalid ? 'error' : ''} help={fieldState.invalid ? fieldState.error?.message : null} ><TextArea rows={4} {...field} onBlur={onBlur} style={styleProps} onPressEnter={onEnter} /></Form.Item>)
            )}
        />
    )
}