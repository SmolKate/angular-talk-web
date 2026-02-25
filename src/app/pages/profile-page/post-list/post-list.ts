import { Component } from '@angular/core';
import { PostInput } from "../post-input/post-input";
import { Post } from "../post/post";

@Component({
  selector: 'app-post-list',
  imports: [PostInput, Post],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {

}
