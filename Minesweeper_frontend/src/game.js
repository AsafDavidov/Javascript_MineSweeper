class Game{
  constructor(data){

    this.id = data.id;
    this.timeTaken = !!data.time_taken ? data.time_taken : 0;
    this.winner = data.winner;
    this.bombs = [];
    this.playing;
    this.rows = 10;
    this.columns = 10;
    this.difficulty = !!data.difficulty ? data.difficulty : "Easy";
    this.userId = data.user_id;
  }
  createDisplay(){
    this.timeTaken = 0;
    window.clearInterval(this.playing)
    //ASSIGNMENT OF BOMBS. CAN BE PLACED ANYWHERE. MAYBE GOOD FOR AVOIDING FIRST CLICK LOST

    const container = document.getElementById('game-container')
    container.innerHTML = '<div id="space-down"></div><h1 id = "intro">Start!</h1>'
    this.createTimer()
    let fullHTML = '<div id="button-grid"><table>'
    for (let i = 0; i < this.rows; i++) {
      fullHTML+= "<tr>"
      for (let j = 0; j < this.columns; j++) {
        fullHTML += `<td><button class="play-area" data-row = "${i}" data-column ="${j}"></button></td>`
      }
      fullHTML +="</tr>"
    }

    if (this.difficulty ==="Easy"){
      fullHTML += '</table></div><div id="difficulty"><select id="list"><option selected value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option></select></div>'
    }else if (this.difficulty ==="Medium"){
      fullHTML += '</table></div><div id="difficulty"><select id="list"><option value="Easy">Easy</option><option selected value="Medium">Medium</option><option value="Hard">Hard</option></select></div>'
    }else if (this.difficulty ==="Hard"){
      fullHTML += '</table></div><div id="difficulty"><select id="list"><option value="Easy">Easy</option><option value="Medium">Medium</option><option selected value="Hard">Hard</option></select></div>'
    }

    container.innerHTML+=fullHTML;
    document.getElementById('list').onchange = ()=> {
      if (document.getElementById('list').value ==="Easy"){
        this.rows = 10;
        this.columns = 10;
        this.difficulty = "Easy"
      }else if (document.getElementById('list').value ==="Medium"){
        this.rows = 15;
        this.columns = 20;
        this.difficulty = "Medium"
      }else if (document.getElementById('list').value ==="Hard"){
        this.rows = 20;
        this.columns = 25;
        this.difficulty = "Hard"
      }
      this.createDisplay();
    }
  }
  createTimer(){
    const container = document.getElementById('game-container')
    container.innerHTML += `<div><h1 data-id = "1" id="clock">${this.timeTaken}</h1></div>`
    this.playing = setInterval(()=>{
      const timer1 = document.getElementById('clock');
      if (!!timer1){
        this.timeTaken++
        timer1.innerText = this.timeTaken
      }
    },1000)
  }
  adjacentButtons(clickedSquare){
    let r = parseInt(clickedSquare.dataset.row)*10;
    let c = parseInt(clickedSquare.dataset.column);
    let adjacentButtons=[];
    let decRow = r-10;
    let incRow = r+10;

    if (decRow >= 0){
      if (c === (this.columns-1)){
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

    if (c === (this.columns-1)){
      adjacentButtons.push(r+(c-1));
    }else if(c===0){
      adjacentButtons.push(r+(c+1));
    }else{
      adjacentButtons.push(r+(c-1));
      adjacentButtons.push(r+(c+1));
    }
    if (incRow<=((this.rows-1)*10)){
      if (c === (this.columns-1)){
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
    return adjacentButtons;
  }
  click(clickedButton){
    if (event.which === 1 && clickedButton.innerText === ""){
      let r = parseInt(clickedButton.dataset.row)*10;
      let c = parseInt(clickedButton.dataset.column);
      let adjacentSquares = this.adjacentButtons(clickedButton);
      let countAdjacent = 0;

      if(this.bombs.includes(r+c)){
          this.winner = false
          window.clearInterval(this.playing)
          this.lost()
      }else{
        if(this.bombs.length===0){
          let n;
          if (this.difficulty==="Easy"){
            n = 10;
          }else if (this.difficulty==="Medium"){
            n = 40;
          }else if (this.difficulty==="Hard"){
            n = 70;
          }
          let arr = [];
          while(arr.length<n){
            let n = Math.floor(Math.random()*(this.rows*this.columns));
            if(arr.indexOf(n) === -1 && n!=r+c) arr.push(n);
          };
          this.bombs = arr
        }
        adjacentSquares.forEach((num)=>{
          if(this.bombs.includes(num)){
            countAdjacent++
          }
        })

        if (countAdjacent != 0){
          clickedButton.innerText = countAdjacent
          clickedButton.value = true;
          clickedButton.disabled = true;
          this.styleNumber(clickedButton,countAdjacent)
        }
        else{
          this.zeroUncover(clickedButton)
        }
        let totalClicked = Array.from(document.querySelectorAll(".play-area")).filter((elem)=>elem.value=="true").length
        if (totalClicked === (document.querySelectorAll(".play-area").length - this.bombs.length)){
          this.winner = true;
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
    }}
  zeroUncover(clickedSquare){
    if (!clickedSquare){
      return
    }
    else{
      let adjacentRegions = this.adjacentButtons(clickedSquare)
      let row = parseInt(clickedSquare.dataset.row);
      let column = parseInt(clickedSquare.dataset.column);
      let clickedBombs = adjacentRegions.filter((region)=>{
        return this.bombs.includes(region)
      })
      if(clickedBombs.length === 0 && clickedSquare.value === ""){
        this.styleNumber(clickedSquare,0)
        clickedSquare.value = true;
        clickedSquare.disabled = true;
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row-1 && bu.dataset.column == column-1}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row-1 && bu.dataset.column == column}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row-1 && bu.dataset.column == column+1}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row && bu.dataset.column == column-1}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row && bu.dataset.column == column+1}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row+1 && bu.dataset.column == column-1}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row+1 && bu.dataset.column == column}))
        this.zeroUncover(Array.from(document.getElementById("button-grid").querySelectorAll(".play-area")).find((bu)=>{return bu.dataset.row == row+1 && bu.dataset.column == column+1}))
      }else{
        clickedSquare.innerText = `${clickedBombs.length}`
        clickedSquare.value = true;
        clickedSquare.disabled = true;
        this.styleNumber(clickedSquare,clickedBombs.length)
      }
    }
  }
  won(){
    //Should display message along with emoji and left board
    Array.from(document.querySelectorAll(".play-area")).forEach((space)=>{
      let r = parseInt(space.dataset.row)*10;
      let c = parseInt(space.dataset.column);
      if (this.bombs.includes(r+c)){
        space.innerText = "💣"
      }
      space.disabled = true;
    })
    let addGameAdapter = new Adapter("http://localhost:3000/api/v1/games")
    addGameAdapter.post({time_taken: this.timeTaken, winner:this.winner, difficulty: this.difficulty, user_id: currentUser.id})
    const introduction = document.getElementById('intro')
    introduction.innerText = "😎"+ "YOU WIN!" + "😎"
    const container = document.getElementById('game-container')
    container.innerHTML += `<button id = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
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
    addGameAdapter.post({time_taken: this.timeTaken, winner:this.winner, difficulty: this.difficulty, user_id: currentUser.id})
    const introduction = document.getElementById('intro')
    introduction.innerText = "Game OVER"
    const container = document.getElementById('game-container')
    container.innerHTML += `<button data-diif = ${this.difficulty} msdjfifid = "start">Play new Game!</button> <button id = "stats">Your Stats</button>`
  }
  renderGame(){
    if(this.winner){
      return `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Won</td></tr>`
    }
    else{
      return `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Lost</td></tr>`
    }
  }
  renderWorldGame(num){
    const easyContainer = document.getElementById('easy')
    const mediumContainer = document.getElementById('medium')
    const hardContainer = document.getElementById('hard')
    const adapter = new Adapter("http://localhost:3000/api/v1/users");
    adapter.getOne(this.userId)
    .then((json)=>{

      let user = json;
      if(num ===1){
        if(this.winner){
          easy.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Won</td><td>${user.username}</td></tr>`
        }
        else{
          easy.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Lost</td><td>${user.username}</td></tr>`
        }
      }else if(num===2){
        if(this.winner){
          medium.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Won</td><td>${user.username}</td></tr>`
        }
        else{
          medium.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Lost</td><td>${user.username}</td></tr>`
        }
      }
      else if(num ===3){
        if(this.winner){
          hard.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Won</td><td>${user.username}</td></tr>`
        }
        else{
          hard.innerHTML += `<tr><td>${this.timeTaken}</td><td>${this.difficulty}</td><td>Lost</td><td>${user.username}</td></tr>`
        }
      }

    })

  }
  styleNumber(clicked,num){
    switch (num){
      case 0:
      clicked.innerText = ""
      clicked.style.backgroundColor = "rgb(28,176,161,0.8)"
      break
      case 1:
      clicked.style.color = "green"
      clicked.style.fontWeight = 900
      break
      case 2:
      clicked.style.color = "blue"
      clicked.style.fontWeight = 900
      break
      case 3:
      clicked.style.color = "maroon"
      clicked.style.fontWeight = 900
      break
      case 4:
      clicked.style.color = "olive"
      clicked.style.fontWeight = 900
      break
      case 5:
      clicked.style.color = "orange"
      clicked.style.fontWeight = 900
      break
      case 6:
      clicked.style.color = "yellowgreen"
      clicked.style.fontWeight = 900
      break
      case 7:
      clicked.style.color = "yellow"
      clicked.style.fontWeight = 900
      break
      case 8:
      clicked.style.color = "brown"
      clicked.style.fontWeight = 900
      break
    }
  }
  static renderGames(gamesArr){
    return gamesArr.map((game)=>{
      return game.renderGame()
    }).join('')
  }
  static averageTimes(gamesArr){
    return Number.parseFloat(gamesArr.reduce((accum,game)=> {return accum + game.timeTaken},0)/gamesArr.length).toFixed(2)
  }
  static winPercentage(gamesArr){
    let wonGames = gamesArr.filter((game)=>{return game.winner}).length
    let percentage = wonGames/gamesArr.length
    return Number.parseFloat(percentage*100).toFixed(2)
  }
  static renderWorldGames(gamesArr,num){
    return gamesArr.map((game)=>{
      return game.renderWorldGame(num)
    }).join('')
  }
  static WorldGames(gamesArr,caseNum){
    switch (caseNum){
      case 1:
        let easyGames = gamesArr.filter((game)=>{
          return (game.difficulty==="Easy" && game.winner)
        })
        let sortedFiveE = easyGames.sort((gameA,gameB)=>{return gameA.timeTaken - gameB.timeTaken}).slice(0,5)
        return Game.renderWorldGames(sortedFiveE,1);
      case 2:
        let medGames = gamesArr.filter((game)=>{
          return (game.difficulty==="Medium" && game.winner)
        })
        let sortedFiveMed = medGames.sort((gameA,gameB)=>{return gameA.timeTaken - gameB.timeTaken}).slice(0,5)
        return Game.renderWorldGames(sortedFiveMed,2);
      case 3:
        let hardGames = gamesArr.filter((game)=>{
          return (game.difficulty==="Hard" && game.winner)
        })
        let sortedFiveHard = hardGames.sort((gameA,gameB)=>{return gameA.timeTaken - gameB.timeTaken}).slice(0,5)
        return Game.renderWorldGames(sortedFiveHard,3);
    }
  }


}
