class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmitBtn = document.querySelector(".post-submit");
    this.formState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>

                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
        `;
    });

    this.post.innerHTML = output;
  }

  showAlert(msg, classList) {
    this.clearAlert();

    const div = document.createElement("div");
    div.classList = classList;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".postsContainer");

    const posts = document.querySelector("#posts");
    container.insertBefore(div, posts);

    // set timeout after 3 seconds
    setTimeout(() => this.clearAlert(), 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
    this.idInput.value = "";
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmitBtn.textContent = "Update Post";
      this.postSubmitBtn.className = "post-submit btn btn-warning btn-block";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn block mt-3";
      button.appendChild(document.createTextNode("Cancel Edit"));

      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector(".form-end");
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmitBtn.textContent = "Submit Post";
      this.postSubmitBtn.className = "post-submit btn btn-primary btn-block";
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      this.clearFields();
    }
  }
}

export const ui = new UI();
