$( document ).ready(function(){
  playGame();
  $("#customBet").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      var amount = $("#customBet").val()
      if(amount.includes("$")){
        console.log('enter')
        amountrefined = amount.replace("$", "")
        betMoney(amountrefined);
      }
      else{
        betMoney(amount);
      }
    }
});
  $(".pokercard").on({
      mouseenter: function () {
        if(this.id == "card1" ){
          console.log(card1)
        $(this).attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/' + card1 + '.png');
      }else{
        console.log(card2)
        $(this).attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/' + card2 + '.png');
      }
      },
      mouseleave: function () {
        $(this).attr('src', 'C:/Users/partont/Documents/PersonalProjects/PokerProject/pokerproject/PokerProject/PNG-cards-1.3/0.png');
      }
  });
});

var card1 = "0"
var card2 = "0"
var comp1card1 = "0"
var comp2card1 = "0"
var comp2card2 = "0"
var comp1card2 = "0"
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
function playGame(){
  var userHand = playerHand()
  comp1card1 = randomCard();
  comp1card2 = randomCard();
  comp2card2 = randomCard();
  comp2card1 = randomCard();
  var computer1 = [comp1card1, comp2card1]
  var computer2 = [comp2card1, comp2card2]
  $(".progress").attr("hidden", false);
  var runTime = window.setInterval(runTimer, 1000)
  var stopRun = window.setInterval(function(){
    if(timer == 0){
      clearInterval(runTime)
      clearInterval(stopRun)
    }
  }, 1000)
  var visCommunity = [randomCard(), randomCard(), randomCard()]

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
    console.log("Hide")
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
  if (card in cardsUsed){
    console.log(cardsUsed)
    while(card in cardsUsed){
    card = cardarr[getRandomInt(13)] + suitarr[getRandomInt(4)]
    }
    return card
  }
  cardsUsed.push(card)

  return card

}
function showCard(id, val){
  console.log(id)
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
  $(".playerControls").hide()
}
