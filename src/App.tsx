import { useState, ChangeEvent, FormEvent } from "react";
import "./App.css";


interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTaskCompleted = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
  setTasks(tasks.filter(task => task.id !== id));
};


const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");


const startEditing = (task: Task) => {
  setEditingTaskId(task.id);
  setEditingTaskTitle(task.title);
};

const saveEditing = (id: number) => {
  setTasks(
    tasks.map(task =>
      task.id === id ? { ...task, title: editingTaskTitle } : task
    )
  );
  setEditingTaskId(null);
  setEditingTaskTitle("");
};


  return (
   <div className="app-container">
  <h1>React TypeScript To-Do App</h1>

  <form onSubmit={handleAddTask}>
    <input
      type="text"
      value={newTask}
      onChange={handleInputChange}
      placeholder="Enter a new task"
    />
    <button type="submit">Add Task</button>
  </form>

  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompleted(task.id)}
        />

        {editingTaskId === task.id ? (
          <>
            <input
              type="text"
              value={editingTaskTitle}
              onChange={(e) => setEditingTaskTitle(e.target.value)}
            />
            <button onClick={() => saveEditing(task.id)}>Save</button>
          </>
        ) : (
          <>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
            <button onClick={() => startEditing(task)}>Edit</button>
          </>
        )}

        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default App;
