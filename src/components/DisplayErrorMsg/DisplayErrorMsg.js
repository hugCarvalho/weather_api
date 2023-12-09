import React, { useEffect, useContext } from 'react'
import { ErrorContext } from '../../App'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  text-align: center;
  margin: 20px;

  .error-message {
    color: lighten($gray-dark, 18%);
    display: inline;
    padding: 5px 10px;
    font-size: 1.3rem;
    font-weight: 500;
    border-radius: 4px;
  }
`

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
      <ErrorMessage>
        <p
          className='error-message'
          style={error.showError ? { visibility: 'visible', background: '#fffb00' } : { visibility: 'none' }}>
          {''}
          {error.text}
        </p>
      </ErrorMessage>
    </>
  )
}
