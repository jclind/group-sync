import React from 'react'
import './FormInput.scss'

interface FormInputProps {
  label?: string
  type: string
  value: string
  setValue: (val: string) => void
  required?: boolean
  placeholder?: string
  optional?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  setValue,
  required,
  placeholder,
  optional,
}) => {
  return (
    <div className='form-input'>
      <label className='form-label'>
        {label} {optional ? <span className='optional'>(optional)</span> : null}
      </label>
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
