var deck = {
    'King'  : [ 'KC', 'KD', 'KH', 'KS' ],
    'Ten'   : [ '0C', '0D', '0H', '0S' ],
    'Two'   : [ '2C', '2D', '2H', '2S' ],
    'Three' : [ '3C', '3D', '3H', '3S' ],
    'Four'  : [ '4C', '4D', '4H', '4S' ],
    'Five'  : [ '5C', '5D', '5H', '5S' ],
    'Six'   : [ '6C', '6D', '6H', '6S' ],
    'Seven' : [ '7C', '7D', '7H', '7S' ],
    'Eight' : [ '8C', '8D', '8H', '8S' ],
    'Nine'  : [ '9C', '9D', '9H', '9S' ],
    'Ace'   : [ 'AC', 'AD', 'AH', 'AS' ],
    'Jack'  : [ 'JC', 'JD', 'JH', 'JS' ],
    'Queen' : [ 'QC', 'QD', 'QH', 'QS' ]
};
function randomKeys(deckLocal,max) {
    var keys = Object.keys(deckLocal);
    var randomKeys = [];
    for (var i = 0; i < max; i++){
        randomKeys[i] = CheckMatch(keys, randomKeys, 13);
    }
    return randomKeys;
}
function CheckMatch(keys, randomKeys, max) {
    var nowElement = keys[Math.floor(Math.random()*max)];
    if(randomKeys.indexOf(nowElement) == -1){
        return nowElement;
    }
    else {
        return CheckMatch(keys, randomKeys, max);
    }
}
function CheckMatchCards(keys, randomKeys, max) {
    var nowElementReturn = Math.floor(Math.random()*max);
    var nowElement = keys[nowElementReturn];
    if(randomKeys.indexOf(nowElement) == -1){
        return nowElementReturn;
    }
    else {
        return CheckMatchCards(keys, randomKeys, max);
    }
}
function randomCards(deck,keys,max) {
    var randomDeck = [];
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 2; j++){
            randomDeck.push(deck[keys[i]][CheckMatchCards(deck[keys[i]],randomDeck,max)]);
        }
    }
    return randomDeck;
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
var Keys = randomKeys(deck,9);
var Cards = randomCards(deck,Keys,2);
var randomDeck = randomAll(Cards);
function display(randomDeck) {
    for (var i=0; i<=randomDeck.length; i++){
        $('.game-page_field').append('<div class="card"><img src="img/cards/'+randomDeck[i]+'.png" alt=""></div>');
    }
}
display(randomDeck);
console.log(randomDeck);