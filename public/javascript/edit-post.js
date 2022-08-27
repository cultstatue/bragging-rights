// update achievement title
async function updateAchievement(id, title) {

    const response = await fetch(`/api/achievements/${id}`, {

        method: 'PUT',
        body: JSON.stringify({
            title,
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    })
    if (response.ok) {

        console.log("achievement updated!")
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


// get achievement id associated with post
async function getAchievementId(postId, achievement) {

    const id = postId

    const achievementTitle = achievement

    const response = await fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {

        response.json().then(function (data) {

            const achievementId = data.achievement.id

            console.log(achievementId)

            updateAchievement(achievementId, achievementTitle)
        })
        
    } else {
        alert(response.statusText);
    }
}

// update post title
async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('input[name="post-title"]').value;

    const achievementTitle = document.querySelector('input[name="achievement-title"]').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {

        getAchievementId(id, achievementTitle);
        // document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);