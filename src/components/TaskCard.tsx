import React from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  dispatch: React.Dispatch<any>;
};


function TaskCard({ task, dispatch }: Props) {
let nextStatus: Task["status"] | null = null;

  if (task.status === "todo") {
    nextStatus = "in-progress";
  } else if (task.status === "in-progress") {
    nextStatus = "done";
  }
  
const today=new
Date().toDateString();
const taskDue=new
Date(task.dueDate).toDateString();
const isDueToday=today===taskDue

const now=new
Date();

const dueDate=new Date(task.dueDate);

const isOverdue=dueDate < now;

const diffTime=now.getTime()-dueDate.getTime();
const diffDays=Math.floor(diffTime/(1000*60*60*24));
 
  return (
    <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
      <h4 className="font-bold">{task.title}</h4>
      <p className="mt-2">Status: {task.status}</p>

      <p>
  Due: {isDueToday
    ? "Due Today"
    : isOverdue
    ?` Overdue by ${diffDays} days`
    : new Date(task.dueDate).toLocaleDateString()}
</p>

{nextStatus&&(
      <button
        onClick={() =>
          dispatch({
            type: "MOVE_TASK",
            payload: { id: task.id, newStatus: nextStatus }
          })
        }
        className="bg-blend-hard-light  border-2 mt-3 hover:bg-amber-100  bg-amber-50 px-1" 
      >
        Move to {nextStatus}
      </button>
      )}
    </div>
  );
}

export default TaskCard;