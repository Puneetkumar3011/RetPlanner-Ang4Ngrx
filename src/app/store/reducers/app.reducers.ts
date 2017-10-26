import { Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { BlogReducer } from "./blog.reducer";
import { TaskReducer } from "./task.reducers";
import { ContextReducers } from "../reducers/context.reducers";

export default compose(combineReducers)({
    blog: BlogReducer,
    task: TaskReducer,
    context: ContextReducers
}); 
