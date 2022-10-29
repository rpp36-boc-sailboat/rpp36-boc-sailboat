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
      category: '',
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
        <label htmlFor="category" style={{marginTop: '15px'}}>Category </label>
        <input
        id="category"
        name="category"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.category}
        />
      </div>

      <div>
        <label htmlFor="color" style={{marginTop: '7px'}}>Color </label>
        <input
        id="color"
        name="color"
        type="color"
        onChange={formik.handleChange}
        value={formik.values.color}
        />
      </div>

      <div>
        <Button variant="contained" style={{marginTop: '15px', width: '145px'}} type="submit">Submit</Button>
      </div>
    </div>
  </form>
  )
}

export default CategoryCreate;