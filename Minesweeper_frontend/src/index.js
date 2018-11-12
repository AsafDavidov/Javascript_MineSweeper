document.addEventListener('DOMContentLoaded', ()=>{
  const app = new App();
  app.createGame();
  document.getElementById('container').oncontextmenu = () => false;
})
