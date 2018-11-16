class App {
  createGame() {
    let newGame = new Game({userId:currentUser.id})
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
               container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "reset">Reset Stats</button><button id="world-stats">World LeaderBoard</button>`
          }
          else{
            container.innerHTML = `<div class="stat">
                                        <h1>Play Some Games!</h1>
                                    </div>
                                    <button id = "start">Play new Game!</button>
                                    <button id = "reset">Reset Stats</button>
                                    <button id="world-stats">World LeaderBoard</button>`
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
      else if(event.target.id === "world-stats"){
        const container = document.getElementById('game-container')
        let allGamesArr = []
        let allGames = new Adapter("http://localhost:3000/api/v1/games")
        allGames.getAll()
        .then((json)=>{
          json.forEach((game)=>{
            allGamesArr.push(new Game(game))
          })


          let fullHTML = `<div class="stat">
                <h2>Top 5 Easy Games Stats</h1>
                  <table>
                    <thead id="easy">
                      <th>Time Taken</th>
                      <th>Difficulty</th>
                      <th>Won/Lost</th>
                      <th>Username</th>
                    </thead>
                    </table>
                <h2>Top 5 Medium Games Stats</h1>
                  <table>
                    <thead id="medium">
                      <th>Time Taken</th>
                      <th>Difficulty</th>
                      <th>Won/Lost</th>
                      <th>Username</th>
                    </thead>
                    </table>
                <h2>Top 5 Hard Games Stats</h1>
                  <table>
                    <thead id="hard">
                    <th>Time Taken</th>
                    <th>Difficulty</th>
                    <th>Won/Lost</th>
                    <th>Username</th>
                    </thead>
                </table>`
                container.innerHTML = fullHTML
                Game.WorldGames(allGamesArr,1)
                Game.WorldGames(allGamesArr,2)
                Game.WorldGames(allGamesArr,3)
                container.innerHTML +=  `<button id = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
        })
      }
    })
  }
}
