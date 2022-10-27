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
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

export default function TaskHome({todos, updateCompleted}) {
  const [modalCheck, setModalCheck] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [currentTask, setCurrentTask] = React.useState(todos[0]);


  // console.log(todos);
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
    setModalCheck(true);
    setCurrentTask(value);
  }

  const isClose = () => {
    setModalCheck(false);
  }

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const deleteTask = (value) => {
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
  });

  return (
    <>
    <Box sx={{width: 360, marginTop: '20px'}}>
      <FormControl sx={{width: 360}}>
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
      {filteredTodos.map((value, i) => {
        const labelId = `checkbox-list-label-${value}`;
        // console.log('Current Value', value);
        if (i % 2 === 0) {
          var listColor = 'rgba(146, 192, 255, 0.6)';
        } else {
          var listColor = 'rgba(146, 192, 255, 0.3)';
        }
        return (
          <>
          <ListItem
            sx={{backgroundColor: listColor}}
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
          <Modal overlayClassName='Overlay' className='Modal' value={currentTask} isOpen={modalCheck} onRequestClose={isClose}>
            <div id='detailedTask'>
              <CloseIcon fontSize='small' style={{float: 'right', top: '5px', right: '5px', cursor: 'pointer'}} onClick={() => isClose()}/>
              <h3>{currentTask.task}</h3>
              <p>Date: {(new Date(currentTask.start_time).toLocaleDateString())} - {(new Date(currentTask.end_time).toLocaleDateString())}<br/>
              Time: {(new Date(currentTask.start_time).toLocaleTimeString())} - {(new Date(currentTask.end_time).toLocaleTimeString())}</p>
              <p>Description: {currentTask.description}</p>
              <Tooltip title="Delete Task" placement="bottom-end" arrow>
                <DeleteIcon style={{cursor: 'pointer'}} onClick={() => deleteTask(currentTask)}/>
              </Tooltip>
            </div>
          </Modal>
          </>
        );
      })}
    </List>
    </>
  );
}
