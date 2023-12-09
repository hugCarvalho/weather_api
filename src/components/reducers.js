// ERROR REDUCER
export const errorInit = {
  showError: true,
  text: 'my error',
}

export function errorReducer(state, action) {
  switch (action.type) {
    case 'TRUE':
      return {
        showError: true,
        text: action.value,
      }
    default:
      return errorInit
  }
}
