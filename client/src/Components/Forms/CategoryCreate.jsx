import React from 'react';
import { useFormik, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
  <form onSubmit={formik.handleSubmit}>
    <label htmlFor="category">Category </label>
    <input
    id="category"
    name="category"
    type="text"
    onChange={formik.handleChange}
    value={formik.values.category}
    />

    <label htmlFor="color">Color </label>
    <input
    id="color"
    name="color"
    type="color"
    onChange={formik.handleChange}
    value={formik.values.color}
    />

    <button type="submit">Submit</button>
  </form>)
}

export default CategoryCreate;