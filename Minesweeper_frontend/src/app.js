class App {
  createGame() {
    document.getElementById('game-container').addEventListener('mousedown', (event)=>{
      let newGame = new Game({})
      if (event.target.id === "start"){
        newGame.createDisplay()
      }
      else if (event.target.className === "play-area"){
        newGame.click(event.target)
      }
    });
  }

}
