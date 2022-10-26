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

export default function TaskHome({todos, completed, uncompleted, updateCompleted}) {
  const [checked, setChecked] = React.useState(completed);
  const [modalCheck, setModalCheck] = React.useState(false);
  const [tasks, setTasks] = React.useState("All");
  const [viewedTasks, setViewedTasks] = React.useState(todos);
  const [currentTask, setCurrentTask] = React.useState(todos[0]);

  const handleToggle = (value) => () => {
    console.log('this is the checked array ', checked);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    var checkComplete = false;

    if (currentIndex === -1) {
      newChecked.push(value);
      checkComplete = false;
    } else {
      newChecked.splice(currentIndex, 1);
      checkComplete = true;
    }

    setChecked(newChecked);

    axios.put('/complete', {
      todoID: value.todo_id,
      complete: checkComplete
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
    setTasks(event.target.value);
    if (event.target.value === 'All') {
      setViewedTasks(todos);
    } else if (event.target.value === 'Completed') {
      setViewedTasks(completed);
    } else {
      setViewedTasks(uncompleted);
    }
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

  return (
    <>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tasks</InputLabel>
        <Select
          value={tasks}
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
      {viewedTasks.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        console.log('our Completed array', checked);
        console.log('Current Value', value);
        console.log('checked index', checked.indexOf(value) !== -1);
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
                  checked={checked.indexOf(value) !== -1}
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
