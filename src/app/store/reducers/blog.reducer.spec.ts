import { BlogActions } from "../actions/blog.actions";
import { BlogReducer } from "./blog.reducer";
import { Blog } from "../../blog/blog.model";

describe('The Blog reducer', () => {
    it('should return current state when no valid actions have been made', () => {
        const state : Array<Blog> = [];
        const actual = BlogReducer(state, { type: 'INVALID_ACTION', payload: {} });
        const expected = state;
        expect(actual).toBe(expected);
    });

});
