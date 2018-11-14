class App {
  createGame() {
    let newGame = new Game({})
    document.getElementById('game-container').addEventListener('mousedown', (event)=>{
      if (event.target.id === "start"){
        newGame.timeTaken = 0;
        newGame.createDisplay()
      }
      else if (event.target.className === "play-area"){
        newGame.click(event.target)
      }
      else if(event.target.id === "stats"){
        const container = document.getElementById('game-container')
        let myGames=[];
        let fullHTML =
        `<div class="stat">
              <h1> Lifetime Stats</h1>
              <table>
                <thead>
                  <th>Won/Lost</th>
                  <th>Time Taken</th>
                </thead>
              `
        let myGamesAdapter = new Adapter("http://localhost:3000/api/v1/games")
        myGamesAdapter.getAll()
        .then((games)=>{
          myGames = games.filter((game)=>{
            return game.user_id === 1
          }).map((stat)=>{
            return new Game(stat)
          })
          let gamesString = Game.renderGames(myGames)
           container.innerHTML = fullHTML + gamesString + "</table></div>"
           container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
        })

      }
    })
  }
}
