import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { PostsState } from './posts.state';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = (props: { id: string | null }) =>
  createSelector(getPostsState, (state: PostsState) => {
    return state?.posts?.find((post: Post) => post.id === props.id);
  });
