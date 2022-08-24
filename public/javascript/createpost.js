// logic to create a new achievement
async function createAchievement(achievement, game) {
   
    const genre = "test"

    const response = await fetch('/api/achievements', {

        method: 'POST',
        body: JSON.stringify({

            achievement,
            game,
            genre

        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })

    if(response.ok) {

        console.log("new achievement recorded!")

    } else {

        alert(response.statusText)
    }
}


// logic to check games database and return games as an array
async function checkGames(game) {

    const response = await fetch('/api/games', {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json'
        }
    })
    
    if(response.ok) {

        response.json()
        .then(function(data) {
            const gameArray = data.map(({ game_title }) => game_title);

            if(gameArray.includes(game)) {

                console.log("no game added")

            } else {

                createGame(game)

            }
   
        })

    } else {
        alert(response.statusText)
    }

}

// logic to create a new game
async function createGame(game_title) {

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
    } else {
        alert(response.statusText)
    }
}



async function newPostHandler(event) {
    event.preventDefault();

    // grab form values
    const achievement = document.querySelector('input[id="post-title-input"]').value
    const game = document.querySelector('input[id="game-select-input"]').value

    checkGames(game);
    
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler)