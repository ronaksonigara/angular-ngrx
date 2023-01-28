import { Action, createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { addPost, deletePost, updatePost } from "./posts.actions";
import { initialState, PostsState } from "./posts.state";

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    return {
      ...state,
      posts: [
        ...state.posts,
        { ...action.post, id: (state.posts.length + 1).toString() },
      ],
    };
  }),
  on(updatePost, (state, action) => {
    const posts = state.posts.map((post: Post) => {
      if (post.id === action.post.id) {
        return action.post;
      }
      return post;
    });

    return {
      ...state,
      posts: [...posts],
    };
  }),
  on(deletePost, (state, action) => {
    return {
      ...state,
      posts: state.posts.filter((post) => post.id !== action.id),
    };
  })
);

export function postsReducer(
  state: PostsState | undefined,
  action: Action
): PostsState {
  return _postsReducer(state, action);
}
