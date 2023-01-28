import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { AppState } from "src/app/store/app.state";
import { addPost } from "../state/posts.actions";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.scss"],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
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

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      ...this.postForm.value,
    };
    this.store.dispatch(addPost({ post }));
    this.postForm.reset();
    this.router.navigate(["posts"]);
  }
}
