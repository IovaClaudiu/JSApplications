const http = new EasyHTTP();

// Get users
// http
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// POST users
const user = {
  name: "Iova",
  username: "iova",
  email: "claudiu.iova@ibm.com"
};

// http
//   .post("https://jsonplaceholder.typicode.com/users", user)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// http
//   .put("https://jsonplaceholder.typicode.com/users/1", user)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

http
  .delete("https://jsonplaceholder.typicode.com/users/1")
  .then(data => console.log(data))
  .catch(err => console.log(err));
