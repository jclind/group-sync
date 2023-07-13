import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './EventChat.scss'
import { EventMessageType } from '../../../types'
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../../services/firestore'
import FormInput from '../FormInput/FormInput'
import { AiOutlinePlus, AiOutlineSmile, AiOutlineClose } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { PiCaretDownBold } from 'react-icons/pi'
import EmojiPicker from 'emoji-picker-react'

type EventChatProps = {
  eventID: string
}

const EventChat = ({ eventID }: EventChatProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<EventMessageType[] | null>(null)

  const [currMessage, setCurrMessage] = useState('')

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [selectedImg, setSelectedImg] = useState<string | undefined>()

  useEffect(() => {
    const eventDocRef = doc(db, 'events', eventID)
    const eventMessagesColRef = collection(eventDocRef, 'messages')
    const q = query(
      eventMessagesColRef,
      orderBy('createdAt', 'desc'),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      const fetchedMessages: EventMessageType[] = []
      QuerySnapshot.forEach(doc => {
        const messageData = doc.data() as EventMessageType
        fetchedMessages.push(messageData)
      })
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      )
      setMessages(sortedMessages)
    })
    return () => unsubscribe()
  }, [])

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Proceed with uploading or further processing
      // Here, you can implement the code to handle the selected file
      // For example, you can upload it to a server or process it locally
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const img = new Image()
        img.src = reader.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          let width = img.width
          let height = img.height
          let x = 0
          let y = 0

          if (width > height) {
            x = (width - height) / 2
            width = height
          } else {
            y = (height - width) / 2
            height = width
          }

          canvas.width = width
          canvas.height = height

          if (ctx) {
            ctx.drawImage(img, x, y, width, height, 0, 0, width, height)
            setSelectedImg(canvas.toDataURL())
          }
        }
      }
    } else {
      throw new Error('Something went wrong, please select another image')
    }
  }
  const removeImg = () => {
    setSelectedImg(undefined)
  }

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className='chat-container card'>
      <div className='header'>
        <h3 className='title'>Event Chat</h3>
      </div>
      <div className='messages-container'></div>
      {selectedImg && (
        <div className='attached-img-container'>
          <div className='img-container'>
            <img src={selectedImg} alt='attached' className='attached-img' />
            <button className='btn-no-styles' onClick={removeImg}>
              <AiOutlineClose className='icon' />
            </button>
          </div>
        </div>
      )}
      <div className='input-container'>
        <div className={`input ${selectedImg ? 'img-attached' : ''}`}>
          <input placeholder='Message the group' />
          <button className='send'>Send</button>
        </div>
        <div className='options'>
          <input
            type='file'
            name='photo'
            accept='image/*'
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
          <button
            className='attachment btn-no-styles'
            onClick={handleAttachmentClick}
          >
            <BiImageAdd className='icon' />
          </button>

          <button className='emoji btn-no-styles'>
            <AiOutlineSmile className='icon' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventChat
