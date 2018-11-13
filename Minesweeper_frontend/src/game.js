class Game{
  constructor(data){
    this.id = data.id;
    this.timeTaken = data.timeTaken;
    this.winner = data.winner;
    this.bombs = [0,1,2,3,4,5,6,7,8,13]
    //this.rows
    //this.columns for dynamic code
  }
  createDisplay(){
    const container = document.getElementById('game-container')
    container.innerHTML = "<h1>Game Here</h1>"
    let fullHTML = '<div id="button-grid"><table>'
    for (let i = 0; i < 10; i++) {
      fullHTML+= "<tr>"
      for (let j = 0; j < 10; j++) {
        fullHTML += `<td><button class="play-area" data-row = "${i}" data-column ="${j}"></button></td>`
      }
      fullHTML +="</tr>"
    }
    fullHTML += "</table></div>"
    container.innerHTML+=fullHTML
  }

  click(clickedButton){

    if (event.which ===1 && clickedButton.innerText === ""){
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
      if(this.bombs.includes(r+c)){
          this.winner = false
          //this.timeTaken = whatever the time is
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
    }
  }
  won(){

  }
  lost(){
    const container = document.getElementById('game-container')
    container.innerHTML = "<h1>Game OVER</h1>"
    container.innerHTML += `<button id = "start" name="button">Play new Game!</button> <button id = "stats" name="button">Your Stats</button>`
  }
}
Game.all = [];
