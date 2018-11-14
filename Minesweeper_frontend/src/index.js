let currentUser={};
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('login-user').addEventListener('submit',(e)=>{
    e.preventDefault()
    let userInput = document.getElementById('user-value').value
    let newOrFindUserAdapter = new Adapter("http://localhost:3000/api/v1/users")
    newOrFindUserAdapter.post({username: userInput})
    .then((user) =>{
      currentUser = user
      document.getElementById('game-container').innerHTML = `<h1>Welcome ${currentUser.username}</h1><button id = "start" name="button">Play new Game!</button>
      <button id = "stats" name="button">Your Stats</button>`
    })
  })
  const app = new App();
  app.createGame();
  document.getElementById('game-container').oncontextmenu = () => false;
})
