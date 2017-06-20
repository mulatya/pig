rollTheDice = function() {
     var roll = Math.floor((Math.random() * 6) + 1);
     if (roll === 1) {
         this.Score = 0;
         this.changePlayer();
     } else if (roll > 1) {
         this.Score += roll;
     }
     return roll;
 };

 changePlayer = function() {
     if (this.rollingPlayer === 7) {
         this.player1 += this.Score;
         this.rollingPlayer = 2;
     } else {
         this.player2 += this.Score;
         this.rollingPlayer = 7;
     }
 };

 holdTurn = function() {
     this.changePlayer();
     this.Score = 0;
 };

 var PigDice = { holdTurn: holdTurn , player1: 0, changePlayer: changePlayer , player2: 0 , rollTheDice: rollTheDice , Score: 0 , rollingPlayer: 7 };

 $(document).ready(function() {
     $(".button").click(function() {
         $("#game").fadeIn(1500)
         $("#instructions").fadeOut()
     });
     var game = Object.create(PigDice);
     var player1wins = 0;
     var player2wins = 0;
     var changePlayer = function() {
         var player = game.rollingPlayer;
         if (player === 7) {
             $("#player2buttons").hide();
             $("#player1buttons").show();
         } else {
             $("#player1buttons").hide();
             $("#player2buttons").show();
         }
     };

     changePlayer();

     var rollTheDice = function() {
         var dice = game.rollTheDice();
         winner();
         board();
         changePlayer();
     };

     $("button#roll").click(function() {
         rollTheDice();
     });

     $("button#hold").click(function() {
         var hold = game.holdTurn();
         winner();
         board();
         changePlayer();
     });

     var winner = function() {
         if (game.player1 >= 100) {

             $("#player1wins").text("player1 is the winner!!!!!!");
             game = Object.create(PigDice);
             $("#winner-meme").show();
             $("#win").hide();
             player1wins += 1;
             $("#player1wins").text(player1wins);

         } else if (game.player2 >= 100) {

             $("#player2wins").text("player2 is the winner!!!!!!");
             $("#winner-meme2").show()
             game = Object.create(PigDice);
             player2wins += 1;
             $("#player2wins").text(player2wins);
         }

     };

     var board = function() {
         $("#player1score").text(game.player1);
         $("#player2score").text(game.player2);
         $("#current").text(game.Score);
     };

 });
