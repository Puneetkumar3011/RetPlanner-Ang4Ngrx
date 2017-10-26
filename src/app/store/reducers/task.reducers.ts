import { Action } from "@ngrx/store";
import { TaskActions } from "../actions/task.actions";

import { TaskModel } from "../../task/task.model";

export function TaskReducer(state : Array<TaskModel> = [], action: Action){
    switch(action.type){
        case TaskActions.LOAD_TASK_SUCCESS: {
            return action.payload;
        }
        case TaskActions.ADD_TASK_SUCCESS: {
            return [...state,action.payload];
        }
        case TaskActions.DELETE_TASK_SUCCESS: {
            let newState = state.filter((task) =>{
                return task.id !== action.payload.id;
            });
            return newState;
        }
        default:{
            return state;
        }
    }
}