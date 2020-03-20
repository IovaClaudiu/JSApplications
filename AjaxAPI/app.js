// Button event
document.querySelector(".get-jokes").addEventListener("click", e => {
  const number = document.querySelector('input[type="number"]').value;

  console.log(number);
  if (number == null || number == "") {
    document.querySelector(
      ".jokes"
    ).innerHTML = `<li>SET A FUCKING NUMBER</li>`;
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function() {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        let output = "";
        response.value.forEach(element => {
          output += `<li>${element.joke}</li>`;
        });

        document.querySelector(".jokes").innerHTML = output;
      }
    };
    xhr.send();
  }
  e.preventDefault();
});
