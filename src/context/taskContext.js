import { createContext, useState, useContext } from "react";
export const taskContext = createContext({
  taskData: {},
  addTask: () => {},
  deleteTask: () => {},
  changeStatus: () => {},
  editTask: () => {},
  moveTask: () => {},
  addTaskList: () => {},
});

const localdata = JSON.parse(localStorage.getItem("taskdata"));

const initialValue = localdata
  ? localdata
  : {
      tasklists: [
        {
          name: "My Tasks",
          Tasks: [],
        },
      ],
    };

export const TaskContextProvider = ({ children }) => {
  const [taskData, setTaskData] = useState(initialValue);
  const addTask = (task, taskListName) => {
    const newTaskData = taskData.tasklists.map((tasklist) => {
      if (tasklist.name === taskListName) {
        tasklist.Tasks.push(task);
      }
      return tasklist;
    });
    const finalData = { tasklists: newTaskData };
    setTaskData(finalData);
    console.log("add", finalData);
    localStorage.setItem("taskdata", JSON.stringify(finalData));
  };
  const deleteTask = (id, taskListName) => {
    const newTaskData = taskData.tasklists.map((tasklist) => {
      if (tasklist.name === taskListName) {
        var newTasks = tasklist.Tasks.filter((task) => task.id !== id);
        tasklist = { ...tasklist, Tasks: newTasks };
      }
      return tasklist;
    });
    const finalData = { tasklists: newTaskData };
    setTaskData(finalData);
    localStorage.setItem("taskdata", JSON.stringify(finalData));
  };
  const changeStatus = (taskListName, id) => {
    const newTaskData = taskData.tasklists.map((tasklist) => {
      if (tasklist.name === taskListName) {
        let num;
        tasklist.Tasks.map((task, index) => {
          if (task.id === id) num = index;
          return null;
        });
        tasklist.Tasks[num].done = !tasklist.Tasks[num].done;
      }
      return tasklist;
    });
    const finalData = { tasklists: newTaskData };
    setTaskData(finalData);
    localStorage.setItem("taskdata", JSON.stringify(finalData));
  };
  const moveTask = (task) => {
    //move Task
  };
  const editTask = (id, data, taskListName) => {
    const newTaskData = taskData.tasklists.map((tasklist) => {
      if (tasklist.name === taskListName) {
        let num;
        tasklist.Tasks.map((task, index) => {
          if (task.id === id) num = index;
          return null;
        });
        tasklist.Tasks[num] = data;
      }
      return tasklist;
    });
    const finalData = { tasklists: newTaskData };
    setTaskData(finalData);
    localStorage.setItem("taskdata", JSON.stringify(finalData));
  };
  const addTaskList = (listName) => {
    const newList = {
      name: listName,
      Tasks: [],
    };
    const finalData = { tasklists: [...taskData.tasklists, newList] };
    setTaskData(finalData);
    localStorage.setItem("taskdata", JSON.stringify(finalData));
  };
  return (
    <taskContext.Provider
      value={{
        taskData,
        addTask,
        deleteTask,
        changeStatus,
        moveTask,
        editTask,
        addTaskList,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export const useTaskContext = () => {
  const {
    taskData,
    addTask,
    deleteTask,
    changeStatus,
    moveTask,
    editTask,
    addTaskList,
  } = useContext(taskContext);
  return {
    taskData,
    addTask,
    deleteTask,
    changeStatus,
    moveTask,
    editTask,
    addTaskList,
  };
};
