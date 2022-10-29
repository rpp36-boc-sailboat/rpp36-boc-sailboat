import React from 'react';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CategoryCreate from './CategoryCreate.jsx';git

const TodoCreate = (props) => {

  const formik = useFormik({
    initialValues: {
      userID: props.userID,
      taskName: '',
      start: '',
      end: '',
      category: 0,
      description: '',
      completed: false,
      appointment: false
    },
    validationSchema: Yup.object({
      taskName: Yup.string()
        .required('Required'),
      category: Yup.string()
        .required('Required')
    }),
    onSubmit: values => {
       axios.post('/todo', values)
       .then(props.handleTodo)
    },
  });

  let categoryModal
  if (props.showModal) {
    categoryModal = <CategoryCreate userID={props.userID} handleClick={props.handleCategorySubmit} close={props.handleClick}/>
  }

  return(
    <>
  <form onSubmit={formik.handleSubmit} class="todo-form">
    <div>
      <label htmlFor="taskName">Task Name </label>
      <input
      id="taskName"
      name="taskName"
      type="text"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.taskName}
      />
      {formik.touched.taskName && formik.errors.taskName ? (
      <div>{formik.errors.taskName}</div>
      ) : null}
    </div>

    <div>
      <label htmlFor="start">Start </label>
      <input
      id="start"
      name="start"
      type="datetime-local"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.start}
      />
    </div>

    <div>
      <label htmlFor="end">End </label>
      <input
      id="end"
      name="end"
      type="datetime-local"
      class="input"
      onChange={formik.handleChange}
      value={formik.values.end}
      />
    </div>

    <div>
      <label htmlFor="category">Category </label>
      <select
          name="category"
          class="input"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ display: "block" }}
        >
          {props.categories.map((option, i) => {
            return (
              <option value={option.value} label={option.key} key={i}/>
            )
          })}
      </select>
      <button type="button" onClick={props.handleClick}>Add Category</button>
    </div>

    <div>
      <label htmlFor="description">Description </label>
      <textarea
      id="description"
      name="description"
      class="description-input"
      onChange={formik.handleChange}
      value={formik.values.description}
      />
    </div>

    <button type="submit">Submit</button>
  </form>
  {categoryModal}
  </>
  )
}

export default TodoCreate;