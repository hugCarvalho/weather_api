import React, { useEffect, useContext } from 'react'
import './DisplayErrorMsg.scss'
import { ErrorContext } from '../../App'

export default function DisplayErrorMsg() {
  const { error, dispatchError } = useContext(ErrorContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchError('FALSE')
    }, 1600)

    return () => {
      clearTimeout(timer)
    }
  }, [error, dispatchError])

  return (
    <>
      <div className='container__error-message'>
        <p
          className='error-message'
          style={error.showError ? { visibility: 'visible', background: '#fffb00' } : { visibility: 'none' }}>
          {''}
          {error.text}
        </p>
      </div>
    </>
  )
}
