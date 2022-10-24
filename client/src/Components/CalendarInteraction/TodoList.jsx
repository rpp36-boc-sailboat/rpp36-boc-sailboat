import React from 'react';
import axios from 'axios';
import Todo from './Todo.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from "swiper";

import styles from '../../../public/style.css';

class TodoList extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.setState({todos: [...this.props.todos]});
  // }
  // componentDidUpdate() {
  //   if (this.state.todos !== this.props.todos) {
  //     this.setState({todos: this.props.todos});
  //   }
  // }

  render() {
    // console.log(Array.isArray(this.props.todos));
    return (
      <div id='taskList'>
        <Swiper slidesPerView={6} grid={{rows: 1}} spaceBetween={10} pagination={{clickable: true}} modules={[Grid, Pagination]}>
          {this.props.todos.map((todo) => <SwiperSlide> <Todo key={todo.todo_id} todo={todo} categories={this.props.categories}/> </SwiperSlide>)}
        </Swiper>
      </div>
    )
  }
}

export default TodoList;