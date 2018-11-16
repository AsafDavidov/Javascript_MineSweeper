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
        user.getOne(currentUser.id)
        .then((json)=>{
          myGames = json.games.map((stat)=>{
            return new Game(stat)
          })
          if (myGames.length > 0){
            let fiveGamesString = Game.renderGames(myGames.slice(Math.max(myGames.length - 5, 0)).reverse())
            let fullHTML =
            `<div class="stat">
                  <h1>LifeTime Stats</h1>
                  <h2>Average Time Taken: ${Game.averageTimes(myGames)} seconds</h2>
                  <h2>Win Percentage: ${Game.winPercentage(myGames)}%`+
                  `
                  <h1> Last Five Games</h1>
                  <table>
                    <thead>
                    <th>Time Taken</th>
                    <th>Difficulty</th>
                    <th>Won/Lost</th>
                    </thead>
                  `
               container.innerHTML = fullHTML + fiveGamesString + "</table></div>"
               container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "reset">Reset Stats</button>`
          }
          else{
            container.innerHTML = `<div class="stat">
                                        <h1>Play Some Games!</h1>
                                    </div>
                                    <button id = "start">Play new Game!</button>
                                    <button id = "reset">Reset Stats</button>`
          }
      })

      }
      else if(event.target.id === "reset"){
        const container = document.getElementById('game-container')
        if(confirm("Do you really want to reset your stats?")){
          let delAdapter = new Adapter("http://localhost:3000/api/v1/games")
          delAdapter.destroyGames(currentUser.id)
          .then(()=>{
            container.innerHTML = `<div class="stat">
                                    <h1>Play Some Games!</h1>
                                  </div>
                                    <button id = "start">Play new Game!</button>
                                    <button id = "stats">Your Stats</button>
                                    <button id = "reset">Reset Stats</button>`
          })
        }
      }
    })
  }
}
