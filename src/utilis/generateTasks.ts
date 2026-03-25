export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assigneeId: string;
  startDate?: string;
  dueDate: string;
};

const status: Task["status"][] = ["todo", "in-progress", "done"];
const priority: Task["priority"][] = ["low", "medium", "high"];

const users = [
  "user-1",
  "user-2",
  "user-3",
  "user-4",
  "user-5",
  "user-6",
];


function getRandomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function getRandomDate(pastDays = 30, futureDays = 30) {
  const now = new Date();
  const randomOffset =
    (Math.random() * (futureDays + pastDays) - pastDays) * 24 * 60 * 60 * 1000;

  return new Date(now.getTime() + randomOffset).toISOString();
}



export function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const task: Task = {
      id: `task-${i}`,
      title: `Task ${i + 1}`,
      status: getRandomItem(status),
      priority: getRandomItem(priority),
      assigneeId: getRandomItem(users),
      dueDate: getRandomDate(30, 30),
    };

    tasks.push(task);
  }

  return tasks;
}