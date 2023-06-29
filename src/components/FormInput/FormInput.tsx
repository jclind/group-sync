import React from 'react'
import './FormInput.scss'

interface FormInputProps {
  label?: string
  type: string
  value: string
  setValue: (val: string) => void
  required?: boolean
  placeholder?: string
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  setValue,
  required,
  placeholder,
}) => {
  return (
    <div className='form-input'>
      <label className='form-label'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        required={required}
        placeholder={placeholder}
        className='form-input-field'
      />
    </div>
  )
}

export default FormInput
