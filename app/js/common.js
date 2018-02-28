var Deck = new Object();
Cards = {
    deck : [
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
    ],
    randomCards: function (deck) {
        var Cards = [];
        for (var i=0; i<9; i++){
            var nowElement = this.CheckMatch(deck,Cards);
            Cards.push(nowElement);
            Cards.push(nowElement);
        }
        return this.randomAll(Cards);
    },
    CheckMatch: function (deck, Cards) {
        var nowElement = deck[Math.floor(Math.random()*deck.length)];
        if(Cards.indexOf(nowElement) == -1){
            return nowElement;
        }
        else {
            return this.CheckMatch(deck, Cards);
        }
    },
    random: function (min, max) {
        var range = max - min + 1;
        return Math.floor(Math.random()*range) + min;
    },
    randomAll: function (randomDeck) {
        var r_i;
        var v;
        for (var i = 0; i < randomDeck.length-1; i++) {
            r_i = this.random(0, randomDeck.length-1);
            v = randomDeck[r_i];
            randomDeck[r_i] = randomDeck[randomDeck.length-1];
            randomDeck[randomDeck.length-1] = v;
        }
        return randomDeck;
    },
    SetCardsBack: function () {
        for(var i=0; i<18; i++){
            $('.game-page_field').append('<div data-tid="Card" tr="'+ i +'"class="card"><img src="img/back.png" alt=""></div>');
            $('.card').children('img').offset({top:0, left:0});
        }
    },
    setCardsBackAnimation: function (i) {
        Cards.i = i;
        if(i<18){
            var position = $('.game-page_field').children('.card').eq(Cards.i).offset();
            $('.game-page_field').find('img').eq(Cards.i).animate({'opacity' : '1'},0).offset(position);
            Cards.i++;
            return setTimeout('Cards.setCardsBackAnimation(Cards.i)',100);
        }
    }
};
UserControll = {
    StartGame: function () {
        $('[data-tid="NewGame-startGame"]').click(function () {
            Cards.SetCardsBack();
            $('.start-page').fadeOut(700).clearQueue();
            $('.start-page').slideUp(700);
            $('.game-page').fadeIn(700,"linear",function () {
                Deck = Cards.randomCards(Cards.deck);
                Deck = Cards.randomAll(Deck);
                Cards.setCardsBackAnimation(0);
            });
        });
    },
    restartGame: function () {
        $('[data-tid="Menu-newGame"]').click(function () {
            $('.game-page_field').html('');
            Cards.SetCardsBack(0);
            Deck = Cards.randomCards(Cards.deck);
            Deck = Cards.randomAll(Deck);
            Cards.setCardsBackAnimation(0);
        });
    }
};
UserControll.StartGame();
UserControll.restartGame();