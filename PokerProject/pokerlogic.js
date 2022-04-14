$( document ).ready(function(){
  playGame();
  $("#customBet").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      var amount = $("#customBet").val()
      if(amount.includes("$")){
        amountrefined = amount.replace("$", "")
        betMoney(amountrefined);
      }
      else{
        betMoney(amount);
      }
      playersTurn(true)
    }
});
});

var card1 = "0"
var card2 = "0"
var comp1card1 = "0"
var comp2card1 = "0"
var comp2card2 = "0"
var comp1card2 = "0"
var comp3card1 = "0"
var comp3card2 = "0"
var comp4card1 = "0"
var comp4card2= "0"
var comp5card1 = "0"
var comp5card2 = "0"
function playerHand(){
  card1 = randomCard()
  card2 = randomCard()
  if (card1 == card2) {
    while (card1 == card2){
      card2 = randomCard()
    }
  }
  const playersHand = [card1, card2]

  return playersHand
};

var cardsUsed = []
var visCommunity = [randomCard(), randomCard(), randomCard(), randomCard(), randomCard()]
function playGame(){
  var userHand = playerHand();
  comp1card1 = randomCard();
  comp1card2 = randomCard();
  comp2card2 = randomCard();
  comp2card1 = randomCard();
  comp3card1 = randomCard();
  comp3card2 = randomCard();
  comp4card1 = randomCard();
  comp4card2 = randomCard();
  comp5card1 = randomCard();
  comp5card2 = randomCard();
  $('#card1').attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/' + card1 + '.png');
  $('#card2').attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/' + card2 + '.png');
  var computer1 = [comp1card1, comp2card1]
  var computer2 = [comp2card1, comp2card2]
  playersTurn()


};

var runTime = null
var stopRun = null
function playersTurn(kill){
  if(!kill){
  $(".progress").attr("hidden", false);
  $(".playerControls").attr("hidden", false)
  runTime = window.setInterval(runTimer, 1000)
  stopRun = window.setInterval(function(){
    if(timer == 0){
      $(".playerControls").attr("hidden", true)
      $(".progress").attr("hidden", true)
      playerFold()
      clearInterval(runTime)
      clearInterval(stopRun)
    }
    }, 1000)
    return
  }
  $(".playerControls").attr("hidden", true)
  $(".progress").hide();
  showCard("#river1", visCommunity[0])
  showCard("#river2", visCommunity[1])
  showCard("#river3", visCommunity[2])
  clearInterval(runTime)
  clearInterval(stopRun)
  };
var timer = 10
function runTimer(){
  timer = timer - 1;
  $("#gameTimer").attr("style", "width:"+timer+"0%")
  if(timer < 6 && timer > 3){
    $("#gameTimer").attr({style: "width:"+timer+"0%", class: "progress-bar bg-warning"})
  }
  else if(timer < 4 && timer > 0){
    $("#gameTimer").attr({style: "width:"+timer+"0%", class: "progress-bar bg-danger"})
  }
  else if (timer == 0){
    $(".progress").hide();
  }
  return
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

function randomCard(){
  const cardarr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  const suitarr = ["h", "c", "s", "d"]
  card = cardarr[getRandomInt(13)] + suitarr[getRandomInt(4)]
  if (cardsUsed.includes(card)){
    while(cardsUsed.includes(card)){
    card = cardarr[getRandomInt(13)] + suitarr[getRandomInt(4)]
    }
  }
  cardsUsed.push(card)

  return card

}
function showCard(id, val){
  $(id).attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/' + val + '.png');
};

var totalPot = 0
function runningPot(amount){
  if (balance < amount){
    $("#contain").prepend('<div class="alert alert-warning alert-dismissible fade show position-absolute w-100" id="flasher" role="alert"><strong>Message From Dealer: </strong> Your balance is too low!</div>')
    $("#flasher").delay(5000).fadeOut();
    return
  };
  totalPot += amount
  $('#totalPot').html("$" + totalPot)
};

function betMoney(amount){

  runningPot(parseInt(amount, 10));
  totalBalance(amount);
  $("#customBet").val("").blur()
  playersTurn(true)
};

var balance = 5000;
function totalBalance(bet){
    if(balance >= bet) {
      balance = balance - bet;
    }
    $("#balance").html("$" + balance)
};

function evaluateHand(hand1, hand2, hand3, visCommunity){
  if (hand1){
    return
  }
  if(hand2){
    return
  }
  if(hand3){
    return
  }
}

function playerFold(){

  $(".pokercard").attr('class', 'float-end pokercard fold')
  $(".playerControls").hide()
  $(".playerGroup").prepend('<p class="stamp">FOLD</p>')
  playersTurn(true)
}
