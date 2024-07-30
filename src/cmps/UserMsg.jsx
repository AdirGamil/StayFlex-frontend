import { useEffect, useRef, useState } from 'react'
import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import {
  socketService,
  SOCKET_EVENT_ORDER_ADDED,
} from '../services/socket.service'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 12000000)
    })

    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
      showSuccessMsg(`New Order: ${order._id}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_ORDER_ADDED)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  function msgClass() {
    return msg ? 'visible' : ''
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg?.type} ${msgClass()}`}>
      <Alert
        severity={msg.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeMsg}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {msg.txt}
      </Alert>
    </section>
  )
}
