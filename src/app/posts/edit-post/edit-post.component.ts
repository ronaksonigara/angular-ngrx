import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { AppState } from "src/app/store/app.state";
import { addPost, updatePost } from "../state/posts.actions";
import { getPostById } from "../state/posts.selectors";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  post?: Post;

  private editPostSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get("id");
        const getPost = getPostById({ id });
        this.editPostSubscription = this.store.select(getPost).subscribe({
          next: (post?: Post) => {
            this.post = post;
            this.createForm();
          },
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.editPostSubscription.unsubscribe();
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showDescriptionError(): string {
    const descriptionForm = this.postForm.get("description");
    if (descriptionForm?.errors?.["required"]) {
      return "Description is required";
    }
    if (descriptionForm?.errors?.["minlength"]) {
      return "Description should be minimum 10 character";
    }
    return "";
  }

  onUpdatePost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      ...this.postForm.value,
      id: this.post?.id,
    };

    this.store.dispatch(updatePost({ post }));
    this.postForm.reset();
    this.router.navigate(["posts"]);
  }
}
