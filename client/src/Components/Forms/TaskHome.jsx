import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Modal from 'react-modal';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function TaskHome({todos, updateCompleted}) {
  const [modalCheck, setModalCheck] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [currentTask, setCurrentTask] = React.useState(todos[0]);


  console.log(todos);
  const handleToggle = (value) => () => {
    axios.put('/complete', {
      todoID: value.todo_id,
      complete: value.completed
    })
    .then(result => {
      console.log(result);
      updateCompleted();
    })
  };

  // React.useEffect(() => {
  //   setChecked(completed);
  // });


  const isOpen = (e, value) => {
    setModalCheck(current => !current);
    setCurrentTask(value);
    console.log('in isOpen');
  }

  const isClose = () => {
    setModalCheck(current => !current);
  }

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const deleteTask = (value) => {
    console.log(value);
    axios.delete('/todos', {
      params: {
        todoID: value.todo_id
      }
    })
    .then(() => {
      console.log('TODO SUCCESSFULLY DELETED');
      isClose();
    })
}

  const filteredTodos = todos.filter(todo => {
    if (selectedFilter === 'All') {
      return true;
    } else if (selectedFilter === 'Completed') {
      return todo.completed === true;
    } else {
      return todo.completed === false;
    }
  }).sort();

  return (
    <>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tasks</InputLabel>
        <Select
          value={selectedFilter}
          label="Tasks"
          onChange={(e) => handleChange(e)}
        >
        <MenuItem value={'All'}>Show All</MenuItem>
        <MenuItem value={'Completed'}>Completed</MenuItem>
        <MenuItem value={'Incomplete'}>Incomplete</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {filteredTodos.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        console.log('Current Value', value);
        return (
          <>
          <ListItem
            key={value.todo_id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={(e) => isOpen(e, value)}>
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.task} />
            </ListItemButton>
          </ListItem>
          <Modal value={currentTask} style={{content: {width: '250px', height: '200px'}, overlay: {color: 'black'}}} isOpen={modalCheck} onRequestClose={isClose}>
            <div id='detailedTask'>
              <h3>{currentTask.task}</h3>
              <p>Date: {(new Date(currentTask.start_time).toLocaleDateString())} - {(new Date(currentTask.end_time).toLocaleDateString())}<br/>
              Time: {(new Date(currentTask.start_time).toLocaleTimeString())} - {(new Date(currentTask.end_time).toLocaleTimeString())}</p>
              <p>Description: {currentTask.description}</p>
              <DeleteIcon style={{cursor: 'pointer'}} onClick={() => deleteTask(currentTask)}/>
            </div>
          </Modal>
          </>
        );
      })}
    </List>
    </>
  );
}
