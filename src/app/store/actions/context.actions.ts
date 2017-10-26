import { Action } from "@ngrx/store";

import { TaskModel } from "../../task/task.model";
import { Blog } from "../../blog/blog.model";

export class ContextActions{
    static SET_TASK_IN_CONTEXT = "SET_TASK_IN_CONTEXT";
    static SET_BLOG_IN_CONTEXT = "SET_BLOG_IN_CONTEXT";

    setTask(task: TaskModel) : Action{
        return{
            type: ContextActions.SET_TASK_IN_CONTEXT,
            payload: task
        }
    }

    setBlog(blog: Blog) : Action{
        return{
            type: ContextActions.SET_BLOG_IN_CONTEXT,
            payload: blog
        }
    }

}