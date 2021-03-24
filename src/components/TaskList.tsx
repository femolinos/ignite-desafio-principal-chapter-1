import { useState, useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle === '') {
      return
    }

    setIdCounter(idCounter + 1);

    const newTask = {
      id: idCounter,
      title: newTaskTitle,
      isComplete: false
    }

    const newTaskList = [...tasks, newTask];

    setNewTaskTitle('');
    setTasks(newTaskList);
  }

  function handleToggleTaskCompletion(id: number) {
    const newTask = tasks.find(task => {
      if(task.id === id) {
        const updatedTask = task;
        updatedTask.isComplete = task.isComplete ? false : true;

        return updatedTask;
      }
    });

    const newTaskList = tasks.filter(task => {
      if(task.id === id) {
        return newTask;
      } else {
        return task;
      }
    });

    setTasks(newTaskList);
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id);

    setTasks(newTaskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}