import { Controller } from 'react-hook-form'
import React from 'react'
import { Input, Form, Checkbox, Select, DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'

type CustomControllerProps = {
    name: string
    type: 'text' | 'checkbox' | 'checkbox' | 'password' | 'select' | 'email' | 'date'
    control: any
    label?: string
    required?: boolean
    maxLength?: number
    minLength?: number
    pattern?: string
    onBlur?: any
    styleProps?: {},
    options?: any
    placeholder?: string
}

export const CustomController: React.FC<CustomControllerProps> = ({control, type, name, label, required, maxLength, minLength, pattern, onBlur, styleProps, options, placeholder}) => {
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
                type==='checkbox' ? (<Form.Item label={label} required={required}><Checkbox checked={field.value} {...field} /></Form.Item>) : 
                type==='text' ? (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null}> <Input {...field} placeholder={placeholder} /></Form.Item>) :
                type==='email' ? (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null}> <Input {...field} type='email' /></Form.Item>) :
                type==='password' ? (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null}> <Input {...field} type='password' /></Form.Item>) :
                type==='select' ? (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null}> <Select {...field} options={options} /></Form.Item>) :
                type=== 'date' ? (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null}> <DatePicker {...field} /></Form.Item>):
                (<Form.Item label={label} required={required} validateStatus={fieldState.invalid ? 'warning' : 'success'} help={fieldState.invalid ? fieldState.error?.message : null} ><TextArea rows={4} {...field} onBlur={onBlur} style={styleProps} /></Form.Item>)
            )}
        />
    )
}