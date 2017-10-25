import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { TaskModel } from "../../task/task.model";

export class TaskActions{
    /* static variables */
    static LOAD_TASK = "LOAD_TASK";
    static LOAD_TASK_SUCCESS = "LOAD_TASK_SUCCESS";
    static ADD_TASK = "ADD_TASK";
    static ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
    static DELETE_TASK = "DELETE_TASK";
    static DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";

    loadTask(): Action{
        return{
            type: TaskActions.LOAD_TASK
        };
    }

    loadTaskSuccess(tasks: Array<TaskModel>): Action{
        return{
            type: TaskActions.LOAD_TASK_SUCCESS,
            payload: tasks
        }
    }

    addTask(task: TaskModel): Action{
        return{
            type: TaskActions.ADD_TASK,
            payload: task
        }
    }

    addTaskSuccess(task: TaskModel): Action{
        return{
            type: TaskActions.ADD_TASK_SUCCESS,
            payload: task
        }
    }

    deleteTask(taskId: string){
        return{
            type: TaskActions.DELETE_TASK,
            payload: taskId
        }
    }

    deleteTaskSuccess(task: TaskModel){
        return{
            type: TaskActions.DELETE_TASK_SUCCESS,
            payload: task
        }
    }
}