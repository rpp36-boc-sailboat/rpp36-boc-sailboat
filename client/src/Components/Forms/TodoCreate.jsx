import React from 'react';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CategoryCreate from './CategoryCreate.jsx';
import Button from '@mui/material/Button';

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
      style={{width: '352px'}}
      />
      {formik.touched.taskName && formik.errors.taskName ? (
      <div>{formik.errors.taskName}</div>
      ) : null}
    </div>

    <div>
      <label htmlFor="category">Category </label>
      <select
          name="category"
          class="custom-select"
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
      <Button variant="contained" style={{marginTop: '7px', marginBottom: '3px', height: '35px', width: '150px', fontSize: '0.675rem'}} onClick={props.handleClick}>Create Category</Button>
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
      style={{width: '355px'}}
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
      style={{width: '355px'}}
      />
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

    <Button variant="contained" style={{marginTop: '15px', width: '360px'}} type="submit">Submit</Button>
  </form>
  {categoryModal}
  </>
  )
}

export default TodoCreate;