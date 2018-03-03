var gameField = $('.game-page_field');
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
    pairsOnField: 9,
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
                gameField.append('<div data-tid="Card" class="card"><img class="card_img" style="z-index:0" src="img/back.png" alt=""></div>');
            }
        }
        var position = $('body').offset();
        gameField.find('img').animate({'top':position.top,'left':position.left},0);
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
            var position = gameField.children('.card').eq(i).offset();
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
        $(firstCard).parent().find('.card_img').animate({'opacity': 0},0);
        $(secondCard).parent().find('.card_img').animate({'opacity': 0},0);
        var left = $('body')[0].clientWidth - $(firstCard)[0].clientWidth-20;
        $(firstCard).css({'position':'absolute', 'z-index':1}).animate({opacity : 0, top: 0 + 'px', left : left + 'px'},400,function () {
            firstCard.remove();
        }).clearQueue();
        $(secondCard).css({'position':'absolute','z-index':1}).animate({opacity : 0, top:0 + 'px', left : left + 'px'},400,function () {
            secondCard.remove();
            $('html').css({'pointer-events':'auto'});
        }).clearQueue();
    },
    HideThisFalseCards: function (firstCard, secondCard) {
        $(secondCard).parent().find('.card_img').fadeIn(400);
        $(firstCard).parent().find('.card_img').fadeIn(400);
        $('.card_front').fadeOut(400,function () {
            $('.card_front').remove();
            $('html').css({'pointer-events':'auto'});
        });
    },
    Timer: function () {
        $('.timer').show();
        $('.timer_line').animate({width:0},5000,function () {
            $('.timer').hide();
            $('.timer_line').css({'width':'100%'});
        });
    },
    ViewScores: function () {
        $('[data-tid="Menu-scores"]').html(Score.Scores);
    },
    ViewEnd : function () {
        $('.game-page').fadeOut(700).clearQueue().slideUp(700);
        $('.end-page').fadeIn(700).css({'display':'flex'});
    },
    ViewGame : function () {
        $('.end-page').fadeOut(700).slideUp(700).clearQueue();
        $('.game-page').fadeIn(700).slideDown(700).css({'display':'flex'});
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
            var card = $('.card');
            var left = $('body')[0].clientWidth - card[0].clientWidth-20;
            card.children('img').css({'display':'block'}).animate({'opacity' : '0', 'top':'0px', 'left' : left + 'px'},400);
            $('.card_front').remove();
            Score.Scores = 0;
            Cards.pairsOnField = 9;
            Animation.ViewScores();
            Deck = Cards.randomCards(Cards.deck);
            Cards.Deck = Cards.randomAll(Deck);
            Cards.SetCardsBack();
            Animation.SetCardsBack(0);
        });
        $('[data-tid="EndGame-retryGame"]').click(function () {
            Score.Scores = 0;
            Cards.pairsOnField = 9;
            Animation.ViewGame();
            Animation.ViewScores();
            Cards.SetCardsBack();
            $('.start-page').fadeOut(700).clearQueue().slideUp(700);
            $('.game-page').fadeIn(700,"linear",function () {
                Deck = Cards.randomCards(Cards.deck);
                Cards.Deck = Cards.randomAll(Deck);
                Animation.SetCardsBack(0);
            });
        });
    },
    clickCard: function () {
        $(document).on('click', function (event) {
            var object = event.target;
            if ($(object).hasClass('card_img')) {
                var number = $(event.target).parent().index();
                var cardName = Cards.ReturnCard(number,Cards.Deck);
                if($(object).parent().children()[1] == undefined){
                    Animation.ViewCard($(event.target),cardName);
                }
                var pairBool = Controller.OnlyTwo();
                Controller.CheckPair(pairBool);
                if (Cards.pairsOnField == 0){
                    Animation.ViewEnd();
                }
            }
        });
    }
};
Controller = {
    OnlyTwo : function () {
        var Pair = gameField.find('.card_front').eq(1)[0];
        if(Pair != undefined) return true;
        else return false;
    },
    CheckPair : function (bool) {
        if(bool){
            var object = gameField;
            Controller.firstCard = object.find('.card_front').eq(0)[0];
            Controller.secondCard = object.find('.card_front').eq(1)[0];
            var nameFirstCard  = Controller.firstCard.src;
            var nameSecondCard = Controller.secondCard.src;
            if (nameFirstCard == nameSecondCard){
                $('html').css({'pointer-events':'none'});
                setTimeout('Animation.HideThisTrueCards(Controller.firstCard, Controller.secondCard)',400);
                Cards.pairsOnField--;
                Score.ScoresPlus();
                Animation.ViewScores();
                console.log(Score.Scores);
            }
            else {
                $('html').css({'pointer-events':'none'});
                setTimeout('Animation.HideThisFalseCards(Controller.firstCard, Controller.secondCard)',400);
                Score.ScoresMinus();
                Animation.ViewScores();
                console.log(Score.Scores);
            }
        }
    }
};
Score = {
    Scores : 0,
    ScoresPlus: function () {
        Score.Scores += Cards.pairsOnField * 42;
    },
    ScoresMinus: function () {
        Score.Scores -= (9 - Cards.pairsOnField) * 42;
    }
};
$(window).resize(function () {
    for(var i=0;i<18;i++){
        var position = gameField.children('.card').eq(i).offset();
        var card = $('.card').children('img').eq(i);
        if(card.css('opacity') == 1){
            card.animate({'top':position.top,'left':position.left,'opacity' : '1', 'position':'relative'},0);
        }
    }
});
UserControll.StartGame();
UserControll.restartGame();
UserControll.clickCard();