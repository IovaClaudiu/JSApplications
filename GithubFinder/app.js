const github = new GitHub();
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

searchUser.addEventListener("keyup", e => {
  // Get Input Text
  const userText = e.target.value;

  if (userText !== "") {
    // Make HTTP call for user
    github.getUser(userText).then(result => {
      if (result.profile.message === "Not Found") {
        // Show alert
        ui.showAlert("User not found", "alert alert-danger");
      } else {
        // Show profile
        ui.showProfile(result.profile);
        ui.showRepos(result.repos);
      }
    });
  } else {
    // Clear profile UI
    ui.clearProfile();
  }
});
