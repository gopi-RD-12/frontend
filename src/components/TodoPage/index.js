import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TodoItem from '../TodoItem'
import './index.css'

class TodoPage extends Component {
  state = {todoList: [], taskText: '', status: false}

  componentDidMount() {
    this.getTodos()
  }

  getTodos = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://todobackendapi-hi8m.onrender.com/todo-list/todos'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updateData = data.map(eachItem => ({
        id: eachItem._id,
        description: eachItem.description,
        status: eachItem.status,
      }))
      this.setState({todoList: updateData})
    }
  }

  onChangeTaskText = event => {
    this.setState({taskText: event.target.value})
  }

  onAddTask = async () => {
    const {taskText, status} = this.state
    if (taskText === '') {
      return alert('Please Enter Your Task')
    }

    const addTodo = {
      description: taskText,
      status,
    }
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://todobackendapi-hi8m.onrender.com/todo-list/todos'
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(addTodo),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    this.setState({taskText: ''})
    this.getTodos()
  }

  onChangeStatus = async value => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://todobackendapi-hi8m.onrender.com/todo-list/todos/${value}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    let updateStatus = null
    if (data.status === false) {
      updateStatus = true
    } else {
      updateStatus = false
    }
    const updateTodo = {
      description: data.description,
      status: updateStatus,
    }

    const updateUrl = `https://todobackendapi-hi8m.onrender.com/todo-list/todos/${value}`
    const updateOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updateTodo),
    }
    const updateResponse = await fetch(updateUrl, updateOptions)
    const updateData = await updateResponse.json()
    console.log(updateData)
    this.getTodos()
  }

  onDeleteTodoItem = async id => {
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://todobackendapi-hi8m.onrender.com/todo-list/todos/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    this.getTodos()
  }

  render() {
    const {todoList, taskText} = this.state
    const checkTodoList = todoList.length > 0
    return (
      <>
        <Header />
        <div className="todos-bg-container">
          <h1 className="todos-heading">Todos</h1>
          <div className="create-task-container">
            <div className="">
              <h1 className="create-task-heading">
                Create
                <span className="create-task-heading-subpart">Task</span>
              </h1>
              <input
                type="text"
                className="todo-user-input"
                value={taskText}
                placeholder="Enter Your Task"
                onChange={this.onChangeTaskText}
              />
              <button className="add-todo-button" onClick={this.onAddTask}>
                Add
              </button>
              <h1 className="todo-items-heading">
                My <span className="todo-items-heading-subpart">Tasks</span>
              </h1>

              {checkTodoList ? (
                <ul className="todo-items-container">
                  {todoList.map(eachTodo => (
                    <TodoItem
                      todoDetails={eachTodo}
                      key={eachTodo.id}
                      onChangeStatus={this.onChangeStatus}
                      onDeleteTodoItem={this.onDeleteTodoItem}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-todo-found-container">
                  <h1 className="no-todo-found">No Todo Found</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default TodoPage
