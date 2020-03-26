import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

function submitPost(post) {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  if (title === "" || body === "") {
    ui.showAlert("Please add information", "alert alert-danger");
  } else {
    const data = {
      title,
      body
    };
    // Check for ID
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then(response => {
          ui.showAlert("Post added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(response => {
          ui.showAlert("Post updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Listener for delete post
document.querySelector("#posts").addEventListener("click", deletePost);

function deletePost(e) {
  if (e.target.classList.contains("fa-remove")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm(`Are you sure you want to delete the post with id: ${id}`)) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(response => {
          ui.showAlert("Post removed", "alert alert-success");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Listener for edit post
document.querySelector("#posts").addEventListener("click", enableEdit);

function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    http
      .get(`http://localhost:3000/posts/${id}`)
      .then(response => {
        const body = response.body;
        const title = response.title;
        const data = {
          id,
          body,
          title
        };
        ui.fillForm(data);
      })
      .catch(err => console.log(err));
  }
  e.preventDefault();
}

// Listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}
