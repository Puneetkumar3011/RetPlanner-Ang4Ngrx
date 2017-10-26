import { Action } from "@ngrx/store";

import { ContextActions } from "../actions/context.actions";
import { TaskModel} from "../../task/task.model";
import { Blog } from "../../blog/blog.model";
import { ContextModel } from "../../context.model";

let defaultContext : ContextModel = {
    task: null,
    blog: null
};

export function ContextReducers(state: ContextModel = defaultContext, action: Action){
    switch(action.type){
        case ContextActions.SET_TASK_IN_CONTEXT:{
            let newState = Object.assign({}, state, { task: action.payload });
            return newState;
        }
        case ContextActions.SET_BLOG_IN_CONTEXT:{
            let newState = Object.assign({}, state, { blog: action.payload });
            return newState;
        }
        default:{
            return state;
        }
    }

}