import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { Subscription } from "rxjs";
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPosts } from '../state/posts.actions';
import { getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[] | null> | undefined;

  // private postsSubscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.postsSubscription = this.store.select(getPosts).subscribe({
    //   next: (posts) => {
    //     this.posts = posts;
    //   },
    // });
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  // ngOnDestroy(): void {
  //   this.postsSubscription.unsubscribe();
  // }

  onDeletePost(id?: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}
