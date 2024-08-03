import React from 'react'

const TodoContext = React.createContext({
  isSignUp: false,
  onToggleSignUp: () => {},
})

export default TodoContext
