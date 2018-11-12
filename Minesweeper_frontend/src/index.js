document.addEventListener('DOMContentLoaded', ()=>{
  const user_header = document.createElement("h1")
  fetch("http://localhost:3000/api/v1/users/1")
  .then(res=>res.json())
  .then(json=>{
    user_header.innerText = json.username
  })
  document.getElementById('container').insertBefore(user_header,document.getElementById('game-container'))
  const app = new App();
  app.createGame();
  document.getElementById('game-container').oncontextmenu = () => false;
})
