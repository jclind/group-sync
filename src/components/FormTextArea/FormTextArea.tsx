import React from 'react'
import './FormTextArea.scss'

interface FormTextAreaProps {
  label?: string
  value: string
  setValue: (val: string) => void
  required?: boolean
  placeholder?: string
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  value,
  setValue,
  required,
  placeholder,
}) => {
  return (
    <div className='text-area'>
      <label className='form-label'>{label}</label>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        required={required}
        placeholder={placeholder}
        className='text-area-field'
      />
    </div>
  )
}

export default FormTextArea
