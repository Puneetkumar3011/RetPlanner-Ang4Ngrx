import { Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { BlogReducer } from "./blog.reducer";
import { Blog } from "../../blog/blog.model";

export default compose(combineReducers)({
    blog: BlogReducer
}); 
