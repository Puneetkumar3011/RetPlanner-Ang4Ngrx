import { BlogActions } from "../actions/blog.actions";
import { BlogReducer, InitialState } from "./blog.reducer";
import { Blog } from "../../blog/blog.model";

describe('BlogReducer', () => {
    it('should return current state when no valid actions have been made', () => {
        const state : Array<Blog> = [];
        const actual = BlogReducer(state, { type: undefined, payload: {} });
        const expected = state;
        expect(actual).toBe(expected);
    });

    it('should return action payload when LOAD_BLOG is dispatched', () => {
        const state : Array<Blog> = [];
        const payLoad : Array<Blog> = [
            {
                id: "1",
                categories: "Computer",
                content: "First Blog Content",
                title: "First Blog Title"
            }
        ];
        const newState = BlogReducer(state, { type: BlogActions.LOAD_BLOG_SUCCESS, payload: payLoad });
        expect(newState).toBeTruthy();
        expect(newState.length).toEqual(1);
        expect(newState[0].id).toBe("1");
    });

    it('should add new blog when ADD_BLOG is dispatched', () => {
        const state = [];
        const newBlog: Blog = {
            id: "1",
            categories: "Computer",
            content: "Blog Content",
            title: "Blog Title"
        };
        const newState = BlogReducer(state, { type: BlogActions.ADD_BLOG_SUCCESS, payload: newBlog });
        expect(newState).toBeTruthy();
        expect(newState.length).toEqual(1);
        expect(newState[0].title).toBe("Blog Title");
    });

    it('should delete existing blog when DELETE_BLOG is dispatched', () => {
        const state : Array<Blog> = [];
        const blog1: Blog = {
            id: "1",
            categories: "Computer",
            content: "First Blog Content",
            title: "First Blog Title"
        };
        const blog2: Blog = {
            id: "2",
            categories: "Computer",
            content: "Second Blog Content",
            title: "Second Blog Title"
        };
        state.push(blog1);
        state.push(blog2);
        const newState = BlogReducer(state, { type: BlogActions.DELETE_BLOG_SUCCESS, payload: blog2 });
        
        expect(newState).toBeTruthy();
        expect(state.length).toEqual(2);
        expect(newState.length).toEqual(1);
        expect(newState[0].title).toBe("First Blog Title");
    });

});
