document.addEventListener('DOMContentLoaded', ()=>{
  const user_header = document.createElement("h1")
  let users = new Adapter("http://localhost:3000/api/v1/users")
  users.getOne(1)
  .then((user)=>{
    user_header.innerText = "Current User: " +user.username
  })
  document.getElementById('container').insertBefore(user_header,document.getElementById('game-container'))
  const app = new App();
  app.createGame();
  document.getElementById('game-container').oncontextmenu = () => false;
})
