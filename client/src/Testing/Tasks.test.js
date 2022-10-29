/**
 * Jest testing environment below
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import { useState, useEffect } from 'react';
import { mockData } from './tableData.js';

import TaskHome from '../Components/Forms/TaskHome.jsx';
import Todo from '../Components/CalendarInteraction/Todo.jsx';
import ClickTask from '../Components/CalendarInteraction/ClickTask.jsx';

describe('Task List and related features', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Testing main entry of TaskHome component', () => {
    it('should test for a correct render', () => {
      render(<TaskHome todos={mockData}/>, temporarySandBox);
      configure({testIdAttribute: 'id'})
      expect(screen.getByTestId('demo-simple-select-label')).toBeInTheDocument();
      expect(screen.getByText('Show All')).toBeInTheDocument();
      expect(screen.getByText('Buy water')).toBeInTheDocument();
      expect(screen.getByText('Morning debrief')).toBeInTheDocument();
      expect(screen.getByText('trash out')).toBeInTheDocument();
      expect(screen.getByText('PM gym')).toBeInTheDocument();
    });
  });

  describe('Testing single Todo near Calendar', () => {
    it ('should render unscheduled tasks', () => {
      render(<Todo
        todo={mockData[0]}
        color={'black'}
        textColor={'white'}/>, temporarySandBox);
        configure({testIdAttribute: 'id'});
        expect(screen.getByTestId('singleTodoTest')).toBeInTheDocument();
        expect(screen.getByText('Buy water')).toBeInTheDocument();
        expect(screen.getByTestId('singleTodoTest')).toHaveStyle(`background: black`);
        expect(screen.getByTestId('singleTodoTest')).toHaveStyle(`color: white`);
    });
  });

  describe('Testing clicked Todo on Calendar', () => {
    it ('should render todo information', () => {
      render(<ClickTask
        currentTask={mockData[1]}
        taskID={mockData[1].todo_id}/>, temporarySandBox);
        configure({testIdAttribute: 'id'});
        expect(screen.getByTestId('detailedTask')).toBeInTheDocument();
        expect(screen.getByText('Morning debrief')).toBeInTheDocument();
        //Potential mock function to handle the taskID and spit data to replicate changing of state
    });
  });
});