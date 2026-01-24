import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { ErrorContext } from '../../App'

// eslint-disable-next-line no-unused-vars
const x = React

const ErrorMessage = styled.div`
  text-align: center;
  margin: 4px 0px -4px 0px;

  .error-message {
    color: lighten($gray-dark, 18%);
    display: inline;
    padding: 2px 10px;
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
