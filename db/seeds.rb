#5 users 5 games per user
User.create({username: "Asaf"})
Game.create({time_taken: 45, winner: true, user_id: 1, difficulty: "Easy"})
Game.create({time_taken: 50, winner: true, user_id: 1, difficulty: "Medium"})
Game.create({time_taken: 150, winner: false, user_id: 1, difficulty: "Hard"})
Game.create({time_taken: 250, winner: true, user_id: 1, difficulty: "Hard"})
Game.create({time_taken: 261, winner: true, user_id: 1, difficulty: "Hard"})

User.create({username: "Guy"})
Game.create({time_taken: 65, winner: true, user_id: 2, difficulty: "Easy"})
Game.create({time_taken: 237, winner: false, user_id: 2, difficulty: "Medium"})
Game.create({time_taken: 152, winner: false, user_id: 2, difficulty: "Medium"})
Game.create({time_taken: 47, winner: true, user_id: 2, difficulty: "Easy"})
Game.create({time_taken: 375, winner: true, user_id: 2, difficulty: "Hard"})

User.create({username: "Michael"})
Game.create({time_taken: 45, winner: true, user_id: 3, difficulty: "Easy"})
Game.create({time_taken: 50, winner: false, user_id: 3, difficulty: "Easy"})
Game.create({time_taken: 150, winner: false, user_id: 3, difficulty: "Medium"})
Game.create({time_taken: 251, winner: true, user_id: 3, difficulty: "Medium"})
Game.create({time_taken: 333, winner: true, user_id: 3, difficulty: "Hard"})

User.create({username: "Jim"})
Game.create({time_taken: 145, winner: true, user_id: 4, difficulty: "Hard"})
Game.create({time_taken: 254, winner: false, user_id: 4, difficulty: "Hard"})
Game.create({time_taken: 262, winner: false, user_id: 4, difficulty: "Hard"})
Game.create({time_taken: 257, winner: false, user_id: 4, difficulty: "Hard"})
Game.create({time_taken: 370, winner: true, user_id: 4, difficulty: "Hard"})

User.create({username: "Dwight"})
Game.create({time_taken: 68, winner: true, user_id: 5, difficulty: "Easy"})
Game.create({time_taken: 70, winner: true, user_id: 5, difficulty: "Easy"})
Game.create({time_taken: 120, winner: false, user_id: 5, difficulty: "Medium"})
Game.create({time_taken: 189, winner: true, user_id: 5, difficulty: "Medium"})
Game.create({time_taken: 224, winner: true, user_id: 5, difficulty: "Medium"})
