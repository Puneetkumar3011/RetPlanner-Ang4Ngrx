import { Blog } from "../blog/blog.model";
import { TaskModel } from "../task/task.model";
import { ContextModel } from "../context.model";

export interface AppState {
    blog: Array<Blog>;
    task: Array<TaskModel>;
    context: ContextModel;
}