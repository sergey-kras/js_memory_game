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
        if($('.card').html() == undefined){
            for(var i=0; i<18; i++){
                $('.game-page_field').append('<div data-tid="Card" class="card"><img class="card_img" src="img/back.png" alt=""></div>');
            }
        }
        var position = $('body').offset();
        $('.game-page_field').find('img').animate({'top':position.top,'left':position.left},0);
    },
    ReturnCard: function (number, desc) {
        return desc[number];
    }
};
Animation = {
    SetCardsBack: function (i) {
        if(i==18){
            Animation.ViewAllCards();
        }
        if(i<18){
            var position = $('.game-page_field').children('.card').eq(i).offset();
            if(i<17){
                $('html').css({'pointer-events':'none'});
            }
            else {
                $('html').css({'pointer-events':'auto'});
            }
            $('.card').children('img').eq(i).css({'display':'block'}).animate({'top':position.top,'left':position.left,'opacity' : '1', 'position':'relative'},200, function () {
                i++;
                return Animation.SetCardsBack(i);
            });
        }
    },
    ViewAllCards: function () {
        $('.card_img').fadeOut(500);
        for(var i = 0; i < 18; i++){
            $('.card').eq(i).append('<img class="card_front" src="img/cards/'+Cards.Deck[i]+'.png" alt="">').fadeIn(500);
        }
        Animation.Timer();
        setTimeout(Animation.HideAllCards, 5000);
    },
    ViewCard: function (object,cardname) {
        $(object).parent().append('<img class="card_front" src="img/cards/'+cardname+'.png" alt="">').fadeIn(500);
        $(object).parent().find('.card_img').fadeOut(500);
    },
    HideAllCards: function () {
        $('.card_img').fadeIn(500);
        $('.card_front').remove();
    },
    HideThisTrueCards: function (firstCard, secondCard) {
        var firstCard = $(firstCard).parent().find('.card_front');
        var secondCard = $(secondCard).parent().find('.card_front');
        $(firstCard).parent().find('.card_img').css({'opacity': 0});
        $(secondCard).parent().find('.card_img').css({'opacity': 0});
        var left = $('body')[0].clientWidth - $(firstCard)[0].clientWidth-20;
        $(firstCard).css({'position':'absolute'}).animate({opacity : 0, top: 0 + 'px', left : left + 'px'},400,function () {
            firstCard.remove();
        }).clearQueue();
        $(secondCard).css({'position':'absolute'}).animate({opacity : 0, top:0 + 'px', left : left + 'px'},400,function () {
            secondCard.remove();
        }).clearQueue();
    },
    HideThisFalseCards: function (firstCard, secondCard) {
        var firstCardFront = $(firstCard).parent().find('.card_front');
        var secondCardFront = $(secondCard).parent().find('.card_front');
        setTimeout(firstCardFront.remove(),1000);
        setTimeout(secondCardFront.remove(),1000);
    },
    Timer: function () {
        $('.timer').show();
        $('.timer_line').animate({width:0},5000,function () {
            $('.timer').hide();
            $('.timer_line').css({'width':'100%'});
        });
    }
};
UserControll = {
    StartGame: function () {
        $('[data-tid="NewGame-startGame"]').click(function () {
            Cards.SetCardsBack();
            $('.start-page').fadeOut(700).clearQueue().slideUp(700);
            $('.game-page').fadeIn(700,"linear",function () {
                Deck = Cards.randomCards(Cards.deck);
                Cards.Deck = Cards.randomAll(Deck);
                Animation.SetCardsBack(0);
            });
        });
    },
    restartGame: function () {
        $('[data-tid="Menu-newGame"]').click(function () {
            var left = $('body')[0].clientWidth - $('.card')[0].clientWidth-20;
            $('.card').children('img').css({'display':'block'}).animate({'opacity' : '0', 'top':'0px', 'left' : left + 'px'},400);
            $('.card_front').remove();
            Deck = Cards.randomCards(Cards.deck);
            Cards.Deck = Cards.randomAll(Deck);
            Cards.SetCardsBack();
            Animation.SetCardsBack(0);
        });
    },
    clickCard: function () {
        $(document).on('click', function (event) {
            if ($(event.target).hasClass('card_img')) {
                var number = $(event.target).parent().index();
                var cardName = Cards.ReturnCard(number,Cards.Deck);
                if($(event.target).parent().children()[1] == undefined){
                    Animation.ViewCard($(event.target),cardName);
                }
                var pairBool = Controller.OnlyTwo();
                Controller.CheckPair(pairBool);
            }
        });
    }
};
Controller = {
    OnlyTwo : function () {
        var Pair = $('.game-page_field').find('.card_front').eq(1)[0];
        if(Pair != undefined) return true;
        else return false;
    },
    CheckPair : function (bool) {
        if(bool){
            var firstCard = $('.game-page_field').find('.card_front').eq(0)[0];
            var secondCard =$('.game-page_field').find('.card_front').eq(1)[0];

            var nameFirstCard  = firstCard.src;
            var nameSecondCard = secondCard.src;
            if (nameFirstCard == nameSecondCard){
                Animation.HideThisTrueCards(firstCard, secondCard);
            }
            else {
                //Animation.HideThisFalseCards(firstCard, secondCard);
            }
        }
    }
};
UserControll.StartGame();
UserControll.restartGame();
UserControll.clickCard();