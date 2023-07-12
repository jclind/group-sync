import React, { useState } from 'react'
import Modal from 'react-modal'
import FormInput from '../FormInput/FormInput'
import { v4 as uuidv4 } from 'uuid'
import './UserDataModal.scss'
import { UserLocalDataType } from '../../../types'

type UserDataModalProps = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  setUserLocalStorage: (data: UserLocalDataType) => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#eeeeee',
    padding: '2.5rem',
    borderRadius: '5px',
    maxWidth: '90%',
  },
  overlay: {
    zIndex: '1000',
    background: 'rgba(0, 0, 0, 0.5)',
  },
}

const UserDataModal = ({
  isOpen,
  setIsOpen,
  setUserLocalStorage,
}: UserDataModalProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const uid = uuidv4()

    const currUserData = { name, email, uid }
    setUserLocalStorage(currUserData)
  }

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      // contentLabel='Example Modal'
    >
      <div className='content'>
        {/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
        {/* <button onClick={closeModal}>close</button> */}
        <div className='modal-title'>Enter your info</div>
        <form onSubmit={handleSubmit}>
          <FormInput
            value={name}
            setValue={setName}
            type='text'
            label='Name'
            placeholder='John Smith'
          />
          <FormInput
            value={email}
            setValue={setEmail}
            type='text'
            label='Email'
            optional={true}
            placeholder='johnsmith@gmail.com'
          />
          <button
            className={`modal-btn btn-submit ${
              name.length > 0 ? 'active' : ''
            }`}
            disabled={name.length <= 0}
            type={'submit'}
          >
            Go To Event
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default UserDataModal
