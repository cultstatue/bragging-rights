//Function to handle logout button
async function logout() {
  //fetch the logout route from users and post the return
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  //if our logout is successful, return to the homepage
  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
