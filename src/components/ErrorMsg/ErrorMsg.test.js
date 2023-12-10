import React from 'react'
import { render, screen } from '@testing-library/react'
import DisplayErrorMsg from './DisplayErrorMsg'
import App from '../../App'

test('should ', () => {
  // const Wrapper = ({ children }) => <App>{children}</App>;
  // render(<DisplayErrorMsg error="error" />, { wrapper: Wrapper });
  render(
    <App>
      <DisplayErrorMsg />
    </App>
  )
})
