class App {
  createGame() {
    let newGame = new Game({id: 1})
    document.getElementById('game-container').addEventListener('mousedown', (event)=>{
      if (event.target.id === "start"){
        newGame.timeTaken = 0;
        newGame.createDisplay()
      }
      else if (event.target.className === "play-area"){

        newGame.click(event.target)
      }
    });
  }

}
