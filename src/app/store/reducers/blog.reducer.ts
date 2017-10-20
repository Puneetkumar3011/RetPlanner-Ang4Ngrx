import { Action } from "@ngrx/store";
import { BlogActions } from "../actions/blog.actions";

import { Blog } from "../../blog/blog.model";

export function BlogReducer(state : Array<Blog> = [], action: Action){

    switch(action.type){
        case BlogActions.LOAD_BLOG_SUCCESS:{
            return action.payload;
        }
        case BlogActions.ADD_BLOG_SUCCESS: {
            return [...state,action.payload];
        }
        case BlogActions.DELETE_BLOG_SUCCESS: {
            let newState = state.filter((blog) =>{
                return blog.id !== action.payload.id;
            });
            
            return newState;
        }
        default:{
            return state;
        }
        
    }
}