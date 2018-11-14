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
        let user = new Adapter("http://localhost:3000/api/v1/users")
        user.getOne(1)
        .then((json)=>{
          myGames = json.games.map((stat)=>{
            return new Game(stat)
          })

        let fiveGamesString = Game.renderGames(myGames.slice(Math.max(myGames.length - 5, 1)).reverse())
        let fullHTML =
        `<div class="stat">
              <h1>LifeTime Stats</h1>
              <h2>Average Time Taken: ${Game.averageTimes(myGames)}</h2>
              <h2>Win Percentage: ${Game.winPercentage(myGames)}%`+
              `
              <h1> Last Five Games</h1>
              <table>
                <thead>
                  <th>Won/Lost</th>
                  <th>Time Taken</th>
                </thead>
              `
           container.innerHTML = fullHTML + fiveGamesString + "</table></div>"
           container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
        })

      }
    })
  }
}
