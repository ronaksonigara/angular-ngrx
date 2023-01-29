import { Action, createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess,
} from './posts.actions';
import { initialState, PostsState } from './posts.state';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return {
      ...state,
      posts: [...state.posts, { ...action.post }],
    };
  }),
  on(updatePostSuccess, (state, action) => {
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
  on(deletePostSuccess, (state, action) => {
    return {
      ...state,
      posts: state.posts.filter((post) => post.id !== action.id),
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(
  state: PostsState | undefined,
  action: Action
): PostsState {
  return _postsReducer(state, action);
}
