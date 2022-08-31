// const posts = [];
async function findPosts(event) {
  event.preventDefault();
  console.log("i clicked the button");
  const search_text = document.querySelector("input[type=search]").value.trim();
  console.log(search_text);
  const response = await fetch(`/${search_text}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    // response.json().then(function (data) {
    //   console.log(data);
    //   //   const posts = data.filter(function (post) {
    //   //     return post.achievement.game.game_title === search_text;
    //   //   });
    //   //   console.log(posts);
    document.location.replace("/search-result");
    // });
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".search-btn").addEventListener("click", findPosts);
