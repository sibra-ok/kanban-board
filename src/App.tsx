 import { useReducer, useState } from "react";
import Board from "./components/Board";
import type{ Task } from "./types";
import { generateTasks } from "./utilis/generateTasks";



const initialTasks :  Task[]= [
  { id: "1", title: "Task 1", status: "todo", priority: "low", assigneeId: "user-1", dueDate: "2026-03-25" },
  { id: "2", title: "Task 2", status: "in-progress", priority: "medium", assigneeId: "user-2", dueDate: "2026-03-25" },
  { id: "3", title: "Task 3", status: "done", priority: "high", assigneeId: "user-3", dueDate: "2026-03-25" }
];

type Action =
| {type: "MOVE_TASK"; payload:
  { id: string ;newStatus:Task["status"]}}

 function taskReducer(state :Task[], action:Action):Task[] {
  switch (action.type) {
    case "MOVE_TASK":
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.newStatus }
          : task
      );

    default:
      return state;
  }
}
 function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks,()=>generateTasks(500));

  return <Board tasks={tasks} 
  dispatch={dispatch} />;
}

export default App;

