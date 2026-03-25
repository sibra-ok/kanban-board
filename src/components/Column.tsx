import TaskCard from "./TaskCard";
import type { Task } from '../types'


type Props ={
    title:string;
    tasks:Task[];
    dispatch:React.Dispatch<any>;
};

function Column({ title, tasks,dispatch }:   Props) {
  return (
    <div>
      <h2>{title}</h2>

      {tasks.map(task => (
        <TaskCard key={task.id} task={task} dispatch={dispatch} />
      ))}

    </div>
  );
}

export default Column;