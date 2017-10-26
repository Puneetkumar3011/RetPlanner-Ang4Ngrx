import { TaskModel } from "./task/task.model";
import { Blog } from "./blog/blog.model";

export class ContextModel{
    constructor(public task: TaskModel, public blog: Blog){}
}