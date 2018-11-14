class Game{
  constructor(data){
    this.id = data.id;
    this.timeTaken = !!data.time_taken ? data.time_taken : 0;
    this.winner = data.winner;
    this.bombs = [0,1,2,3,4,5,6,7,8,13];//rand Array of ten bombs
    this.playing;
    //this.rows
    //this.columns for dynamic code
  }
  createDisplay(){
    const container = document.getElementById('game-container')
    container.innerHTML = '<h1 id = "intro">Start!</h1>'
    this.createTimer()
    let fullHTML = '<div id="button-grid"><table>'
    for (let i = 0; i < 10; i++) {
      fullHTML+= "<tr>"
      for (let j = 0; j < 10; j++) {
        fullHTML += `<td><button class="play-area" data-row = "${i}" data-column ="${j}"></button></td>`
      }
      fullHTML +="</tr>"
    }
    fullHTML += "</table></div>"
    container.innerHTML+=fullHTML} //works
  createTimer(){
    const container = document.getElementById('game-container')
    container.innerHTML += `<div><h1 data-id = "1" id="clock">${this.timeTaken}</h1></div>`
    //debugger
    //const timer = document.getElementById('clock');
    this.playing = setInterval(()=>{
      const timer1 = document.getElementById('clock');
      //console.log(timer,timer1);
    //    console.log(this);
        this.timeTaken++
        timer1.innerText = this.timeTaken
      //  console.log(this.timeTaken)
      //debugger
      //console.log(timer.innerText);
    },1000)
  } //works
  click(clickedButton){

    if (event.which === 1 && clickedButton.innerText === ""){
      // console.log(this);
      let r = parseInt(clickedButton.dataset.row)*10;
      let c = parseInt(clickedButton.dataset.column);
      let adjacentButtons=[];
      let decRow = r-10;
      let incRow = r+10;
      if (decRow >= 0){
        if (c === 9){
          adjacentButtons.push(decRow+(c-1));
          adjacentButtons.push(decRow+c);
        }else if(c===0){
          adjacentButtons.push(decRow+c);
          adjacentButtons.push(decRow+(c+1));
        }else{
          adjacentButtons.push(decRow+(c-1));
          adjacentButtons.push(decRow+c);
          adjacentButtons.push(decRow+(c+1));
        }
      }

      if (c === 9){
        adjacentButtons.push(r+(c-1));
      }else if(c===0){
        adjacentButtons.push(r+(c+1));
      }else{
        adjacentButtons.push(r+(c-1));
        adjacentButtons.push(r+(c+1));
      }
      if (incRow<90){
        if (c === 9){
          adjacentButtons.push(incRow+(c-1));
          adjacentButtons.push(incRow+c);
        }else if(c===0){
          adjacentButtons.push(incRow+c);
          adjacentButtons.push(incRow+(c+1));
        }else{
          adjacentButtons.push(incRow+(c-1));
          adjacentButtons.push(incRow+c);
          adjacentButtons.push(incRow+(c+1));
        }
      }
      let countAdjacent = 0;
      //console.log(this);
      if(this.bombs.includes(r+c)){
          this.winner = false
          window.clearInterval(this.playing)
          this.lost()
      }else{
        adjacentButtons.forEach((num)=>{
          if(this.bombs.includes(num)){
            countAdjacent++
          }
        })
        clickedButton.innerText = countAdjacent
        clickedButton.value = true;
        let totalClicked = Array.from(document.querySelectorAll(".play-area")).filter((elem)=>elem.value=="true").length
        if (totalClicked === (document.querySelectorAll(".play-area").length - this.bombs.length)){
          this.winner = true;
          //this.timeTaken = whatever the time is
          window.clearInterval(this.playing)
          this.won()
        }
      }
    }
    else if(event.which === 3){
      if (clickedButton.innerText === ""){
        clickedButton.innerText = "🚩"
      } else if(clickedButton.innerText === "🚩"){
        clickedButton.innerText = "?"
      } else if(clickedButton.innerText === "?"){
        clickedButton.innerText = ""
      }
    }}// works
  won(){
    //Should display message along with emoji and left board
  }
  lost(){
    //should disable all buttons and display all bombs
    Array.from(document.querySelectorAll(".play-area")).forEach((space)=>{
      let r = parseInt(space.dataset.row)*10;
      let c = parseInt(space.dataset.column);
      if (this.bombs.includes(r+c)){
        space.innerText = "💣"
      }
      space.disabled = true;
    })
    let addGameAdapter = new Adapter("http://localhost:3000/api/v1/games")
    addGameAdapter.post({time_taken: this.timeTaken, winner:this.winner, user_id: 1})
    .then((obj)=>{debugger})
    const introduction = document.getElementById('intro')
    introduction.innerText = "Game OVER"
    const container = document.getElementById('game-container')
    container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
  }
  renderGame(){
    if(this.winner){
      return `<tr><td>Won</td><td>${this.timeTaken}</td></tr>`
    }
    else{
      return `<tr><td>Lost</td><td>${this.timeTaken}</td></tr>`
    }
  }
  static renderGames(gamesArr){
    return gamesArr.map((game)=>{
      return game.renderGame()
    }).join('')
  }
}
