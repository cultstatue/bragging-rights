async function likeClickHandler(event) {
  event.preventDefault();

  //grab the post_id from the window location and split it for the number
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/posts/addlike", {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //check for response data
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".like-btn").addEventListener("click", likeClickHandler);
