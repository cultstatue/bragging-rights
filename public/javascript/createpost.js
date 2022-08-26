// logic to create a new achievement
async function createAchievement(title, game_id, postTitle, url) {
   
    // dummy data
    const genre = "test"

    const response = await fetch('/api/achievements', {

        method: 'POST',
        body: JSON.stringify({

            title,
            game_id,
            genre

        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })

    if(response.ok) {

        response.json()
        .then(function(data) {

            const achievementId = data.id;
            createNewPost(achievementId, postTitle, url)
        })

    } else {

        alert(response.statusText)
    }
}


// logic to check games database to see if the game exists yet or not
async function checkGames(game, achievement, postTitle, url) {

    const response = await fetch('/api/games', {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json'
        }
    })
    
    if(response.ok) {

        response.json()
        .then(function(data) {

            // return array of only game names
            const gameArray = data.map(({ game_title }) => game_title);

            // check submitted game name against array to see if it exists in the database
            if(gameArray.includes(game)) {

                console.log("no game added")

                // get the index of the object where the given game title exists
                const gameIndex = data.findIndex( x => x.game_title == game)

                // isolate its game id
                const gameId = data[gameIndex].id;

                // create new achievemnt attatched to game id
                createAchievement(achievement, gameId, postTitle, url)

            } else {

                // if game does not exist in the database, create it and pass achievement to it
                createGame(game, achievement, postTitle, url)

            }    
        })

    } else {
        alert(response.statusText)
    }

}

// logic to create a new game
async function createGame(game_title, achievement, postTitle, url) {

    const response = await fetch('/api/games', {

        method: 'POST',
        body: JSON.stringify({
            game_title
        }),
        headers: {

            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log("game added!")

        // pass game title and achievment to a function that gets the updated array of games
        getNewGames(game_title, achievement, postTitle, url)
    } else {
        alert(response.statusText)
    }
}

// find new array of games after creating a new game entry
async function getNewGames(game, achievement, postTitle, url) {

    const response = await fetch('/api/games', {

        method: 'GET',
        headers: {

            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {

        response.json()
        .then(function(data) {

            // get the index of the object where the given game title exists
            const gameIndex = data.findIndex( x => x.game_title == game)

            // isolate its game id
            const gameId = data[gameIndex].id;

            // if game does not exist in the database, create it and pass achievement to it
            createAchievement(achievement, gameId, postTitle, url)

        })

    } else {
        alert(response.statusText)
    }
}

// function to create the new post
async function createNewPost(achievement_id, title, post_url) {

    const reponse = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_url,
            achievement_id
        }),
        headers: {

            'Content-Type': 'application/json'
        }
    })
    if (reponse.ok) {
        console.log("post created!")
    } else {
        alert(response.statusText)
    }
}

// function to create a new post
async function newPostHandler(event) {

    event.preventDefault();

    // dummy img url to be replaced with info from uploader?
    const url = "https://image.shutterstock.com/image-photo/lizard-isolated-on-white-background-600w-711991510.jpg"
    
    // grab form values
    const postTitle = document.querySelector('input[id="post-title-input"]').value
    const achievementName = document.querySelector('input[id="post-achievement-input"]').value
    const game = document.querySelector('input[id="game-select-input"]').value
    
    if( postTitle == null || postTitle == "" || game == null || game == "" || achievementName == null || achievementName == "" || url == null || url == "") {
        
        alert("Please ensure you've filled out the entire post form.")
        return;
    }

    // check games and chain through creating a post
    checkGames(game, achievementName, postTitle, url)

}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler)