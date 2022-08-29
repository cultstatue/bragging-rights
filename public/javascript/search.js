async function findPosts(event) {
  event.preventDefault();
  console.log("i clicked the button");
  const search_text = document.querySelector("input[type=search]").value.trim();
  console.log(search_text);
}

document.querySelector(".search-btn").addEventListener("click", findPosts);
