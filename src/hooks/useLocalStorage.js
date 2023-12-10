import React from "react"

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = React.useState(() => {
    const value = localStorage.getItem(key)
    return JSON.parse(value) || defaultValue
})

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])
  return [state, setState]
}

export {useLocalStorage}