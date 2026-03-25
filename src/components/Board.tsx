import React from "react";
import Column from "./Column";
import type { Task } from '../types'
import { useSearchParams } from "react-router-dom";

type Props = {
 tasks: Task[];
 dispatch: React.Dispatch<any>;
};

function Board({ tasks, dispatch }: Props) {

const [searchParams,setSearchParams]=useSearchParams();
const statusUrl=searchParams.get("status");



const initialStatus=statusUrl ?
statusUrl.split(","):[];

const [selectedStatus, setSelectedStatus] = 
React.useState<string[]>(initialStatus);




const [selectedPriority,setSelectedPriority]=React.useState<string[]>([]);
 React.useEffect(() => {
  const params: any = {};

  if (selectedStatus.length > 0) {
    params.status = selectedStatus.join(",");
  }

  if (selectedPriority.length > 0) {
    params.priority = selectedPriority.join(",");
  }

  setSearchParams(params);
}, [selectedStatus, selectedPriority]);


const filteredTasks = tasks.filter(task => {
  const statusMatch =
  selectedStatus.length === 0 || selectedStatus.includes(task.status);

  const priorityMatch =
    selectedPriority.length === 0 || selectedPriority.includes(task.priority);

  return statusMatch && priorityMatch;
});
  
  const todoTasks = filteredTasks.filter(task => task.status === "todo");
const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
 const doneTasks = filteredTasks.filter(task => task.status === "done");

  return (
<div style={{  gap: "20px" }} className="text-center " >



  <div className="
  mt-5 border-2 bg-blend-darken" >

<label className="px-2 font-mono">
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedPriority([...selectedPriority, "low"]);
      } else {
        setSelectedPriority(selectedPriority.filter(p => p !== "low"));
      }
    }}
  />
  Low
</label>

<label className="px-2 font-mono">
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedPriority([...selectedPriority, "medium"]);
      } else {
        setSelectedPriority(selectedPriority.filter(p => p !== "medium"));
      }
    }}
  />
  Medium
</label>

<label className="px-2 font-mono">
  <input
    type="checkbox"
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedPriority([...selectedPriority, "high"]);
      } else {
        setSelectedPriority(selectedPriority.filter(p => p !== "high"));
      }
    }}
  />
  High
</label>


  <label className="px-2 font-mono">
    <input
      type="checkbox"
      value="todo"
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedStatus([...selectedStatus, "todo"]);
        } else {
          setSelectedStatus(selectedStatus.filter(s => s !== "todo"));
        }
      }}
    />
    Todo
  </label>

  <label className="px-2 font-mono">
    <input
      type="checkbox"
      value="in-progress"
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedStatus([...selectedStatus, "in-progress"]);
        } else {
          setSelectedStatus(selectedStatus.filter(s => s !== "in-progress"));
        }
      }}
    />
    In Progress
  </label>

  <label className="px-2 font-mono">
    <input
      type="checkbox"
      value="done"
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedStatus([...selectedStatus, "done"]);
        } else {
          setSelectedStatus(selectedStatus.filter(s => s !== "done"));
        }
      }}
    />
    Done
  </label>
</div>
<div style={{ display: "flex", gap: "20px", justifyContent:"center" }} className="mt-6">
<Column title="To Do" tasks={todoTasks} dispatch={dispatch} />
<Column title="In Progress" tasks={inProgressTasks} dispatch={dispatch} />
<Column title="Done" tasks={doneTasks} dispatch={dispatch} />
</div>
    </div>
  );
}

export default Board;