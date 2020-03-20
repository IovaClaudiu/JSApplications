document.getElementById("button1").addEventListener("click", getText);

document.getElementById("button2").addEventListener("click", getJson);

document.getElementById("button3").addEventListener("click", getExternal);

// Get text function
function getText() {
  fetch("text.txt")
    .then(res => res.text())
    .then(res => (document.getElementById("output").innerHTML = res))
    .catch(reason => console.log(reason));
}

// Get json function
function getJson() {
  fetch("post.json")
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      let output = "";
      res.forEach(element => {
        output += `<li>${element.title}</li>`;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(function(reason) {
      console.log(reason);
    });
}

// Get external function
function getExternal() {
  fetch("https://api.github.com/users")
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      let output = "";
      res.forEach(element => {
        output += `<li>${element.login}</li>`;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(function(reason) {
      console.log(reason);
    });
}
