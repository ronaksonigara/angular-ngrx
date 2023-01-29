import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${environment.FIREBASE_REALTIME_DB}posts.json`)
      .pipe(
        map((data: any) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${environment.FIREBASE_REALTIME_DB}posts.json`,
      post
    );
  }

  updatePost(post: Post): Observable<Post> {
    const postData = {
      [post.id || '']: {
        title: post.title,
        description: post.description,
      },
    };
    return this.http.patch<Post>(
      `${environment.FIREBASE_REALTIME_DB}posts.json`,
      postData
    );
  }

  deletePost(id?: string): Observable<null> {
    return this.http.delete<null>(
      `${environment.FIREBASE_REALTIME_DB}posts/${id}.json`
    );
  }
}
