// logic to create a new achievement
async function createAchievement(title, game_id) {
   
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

        console.log("new achievement recorded!")

    } else {

        alert(response.statusText)
    }
}


// logic to check games database and return games as an array
async function checkGames(game, achievement) {

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
            const gameIndex = data.findIndex( x => x.game_title == game)

            const gameId = data[gameIndex].id;

            console.log(data)
            if(gameArray.includes(game)) {

                console.log("no game added")

            } else {

                createGame(game)

            }

            createAchievement(achievement, gameId)
            
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

    // dummy img url to be replaced with info from uploader?
    const url = "https://image.shutterstock.com/image-photo/lizard-isolated-on-white-background-600w-711991510.jpg"
    
    // grab form values
    const postTitle = document.querySelector('input[id="post-title-input"]').value
    const achievement = document.querySelector('input[id="post-achievement-input"]').value
    const game = document.querySelector('input[id="game-select-input"]').value
    
    if( postTitle == null || postTitle == "" || game == null || game == "" || achievement == null || achievement == "" || url == null || url == "") {
        
        alert("Please ensure you've filled out the entire post form.")
        return;
    }

    // check games database
    checkGames(game, achievement);
    
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler)