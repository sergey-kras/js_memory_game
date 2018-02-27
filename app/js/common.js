var deck = [
    'KC', 'KD', 'KH', 'KS' ,
    '0C', '0D', '0H', '0S' ,
    '2C', '2D', '2H', '2S' ,
    '3C', '3D', '3H', '3S' ,
    '4C', '4D', '4H', '4S' ,
    '5C', '5D', '5H', '5S' ,
    '6C', '6D', '6H', '6S' ,
    '7C', '7D', '7H', '7S' ,
    '8C', '8D', '8H', '8S' ,
    '9C', '9D', '9H', '9S' ,
    'AC', 'AD', 'AH', 'AS' ,
    'JC', 'JD', 'JH', 'JS' ,
    'QC', 'QD', 'QH', 'QS'
];
function randomCards(deck) {
    var Cards = [];
    for (var i=0; i<9; i++){
        var nowElement = CheckMatch(deck,Cards);
        Cards.push(nowElement);
        Cards.push(nowElement);
    }
    // Cards
    return randomAll(Cards);
}
function CheckMatch(deck, Cards) {
    var nowElement = deck[Math.floor(Math.random()*deck.length)];
    if(Cards.indexOf(nowElement) == -1){
        return nowElement;
    }
    else {
        return CheckMatch(deck, Cards);
    }
}
function random(min, max) {
    var range = max - min + 1;
    return Math.floor(Math.random()*range) + min;
}
function randomAll(randomDeck) {
    var r_i;
    var v;
    for (var i = 0; i < randomDeck.length-1; i++) {
        r_i = random(0, randomDeck.length-1);
        v = randomDeck[r_i];
        randomDeck[r_i] = randomDeck[randomDeck.length-1];
        randomDeck[randomDeck.length-1] = v;
    }
    return randomDeck;
}
var Cards = randomCards(deck);

function viewCards(deck) {
    for(var i = 0; i < 18; i++){
        $('.game-page_field').append('<div class="card"><img src="img/cards/'+Cards[i]+'.png" alt=""></div>');
    }
}
viewCards(deck);

