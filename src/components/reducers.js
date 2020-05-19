// ERROR REDUCER
export const errorInit = {
  showError: false,
  text: "",
};

export function errorReducer(state, action) {
  switch (action.type) {
    case "TRUE":
      return { showError: true, text: action.value };
    default:
      return errorInit;
  }
}
