import {MdOutlineDeleteOutline} from 'react-icons/md'
import './index.css'

const TodoItem = props => {
  const {todoDetails, onChangeStatus, onDeleteTodoItem} = props
  const {id, description, status} = todoDetails
  console.log(status)
  const onChangeCheckboxStatus = () => {
    onChangeStatus(id)
  }

  const onDeleteTodo = () => {
    onDeleteTodoItem(id)
  }

  return (
    <li className="todo-item-container">
      <input
        type="checkbox"
        className="checkbox-input"
        onChange={onChangeCheckboxStatus}
        checked={status}
      />
      <div className="label-container">
        <label className="checkbox-label">{description}</label>
        <div className="delete-icon-container">
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteTodo}
          >
            <MdOutlineDeleteOutline size="25" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
