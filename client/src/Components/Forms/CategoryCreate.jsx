import React from 'react';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const CategoryCreate = (props) => {

  const formik = useFormik({
    initialValues: {
      userID: props.userID,
      category: 'none',
      color: '#BEBEBE'
    },
    validationSchema: Yup.object({
      category: Yup.string()
        .required('Required'),
      color: Yup.string()
        .required('Required')
    }),
    onSubmit: values => {
      axios.post('/category', values)
      .then(props.handleClick)
    },
  });

  return(
  <form onSubmit={formik.handleSubmit} class="category-modal">
    <div class="modal-content">
      <span class="close" onClick={props.close}>&times;</span>
      <div>
        <label htmlFor="category">Category </label>
        <input
        id="category"
        name="category"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.category}
        />
      </div>

      <div>
        <label htmlFor="color">Color </label>
        <input
        id="color"
        name="color"
        type="color"
        onChange={formik.handleChange}
        value={formik.values.color}
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
  )
}

export default CategoryCreate;