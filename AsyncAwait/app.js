async function myFunc() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello"), 1000);
  });

  const err = true;
  if (!err) {
    const res = await promise; //  wait until promite is resolved
    return res;
  } else {
    await Promise.reject(new Error("Something went wrong!"));
  }
}

// myFunc()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

async function getUsers() {
  // await the response of the fetch call
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  // Only proceed once its resolved
  const data = await response.json();

  // Only proceed once the second promite is resolved.
  return data;
}

getUsers().then(users => console.log(users));
