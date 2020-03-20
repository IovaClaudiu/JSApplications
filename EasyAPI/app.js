// We are using callback functions instead of Promises.
const http = new easyHTTP();

executeRequest();

function executeRequest() {
  get();
  // post();
  // put();
  // deleteP();
}

// GET Posts
function get() {
  http.get("https://jsonplaceholder.typicode.com/posts", function(
    error,
    posts
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log(posts);
    }
  });
}

// POST post

function post() {
  // Create Data
  const data = {
    title: "Custom Post",
    body: "This is a custom post"
  };
  // Execute the actual POST
  http.post("https://jsonplaceholder.typicode.com/posts", data, function(
    error,
    post
  ) {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log(post);
    }
  });
}

function put() {
  // Create Data
  const data = {
    title: "Custom Post",
    body: "This is a custom post"
  };
  // Execute the actual POST
  http.put("https://jsonplaceholder.typicode.com/posts/1", data, function(
    error,
    post
  ) {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log(post);
    }
  });
}

// Delete Post
function deleteP() {
  http.delete("https://jsonplaceholder.typicode.com/posts/1", function(
    error,
    posts
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log(posts);
    }
  });
}
