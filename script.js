$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	// this loops 4 times
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		// this is push an object of each card in each suit. you will have 13 hears , 13 diamonds , 13 spades etc
		for (var j = 0; j<13; j++) {
			// this is an object with a number from 1 to 13 and and value of the type of suite based on value of i
			deck.push({number: j+1, suit: suit});
		}
	}

	//what does this do?
	var shuffle = function(array) {
		// creating empty array
		var copy = [];
		// n is the value of length of the passed in array
		var n = array.length;
		var i;
		// this will run will n is true but will decrease for each loop, stopping loop when it hits 0
		// i will become a random number between 0 the length of the array
		while (n) { i = Math.floor(Math.random() * array.length);
			// test to see if i is in array if true it will push number into copy array and delete it from the passed in array
			if (i in array) {
		 		copy.push(array[i]);
		 		delete array[i];
		 		n--;
		 	}
		}
		return copy;
	}

	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);


	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players
	var deal = function(deck) {
		for(var i = 0; i < deck.length; i++ ) {
			if (i % 2 === 0) {
				cards_player_1.push(deck[i]);
			} else {
				cards_player_2.push(deck[i]);
			};
		};
	};

	deal(deck);

	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function (card1, card2) {

		if (card1 > card2) {
			return card1;
		} else if (card2 > card1) {
			return card2;
		} else {
			return false;
		};

	}

	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);

		}
	}


	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
		var card1 = cards_player_1[0];
		var card2 = cards_player_2[0];
		var play1card4 = cards_player_1[3];
		var play2card4 = cards_player_2[3];

		var winner = war(card1,card2); // card1 or card2 or false
		//this function (defined below) will continue to the next turn
		// card1
		if (winner === card1) {
			cards_player_1 = cards_player_1.concat(cards_player_1.splice(0, 1));
			cards_player_1 = cards_player_1.concat(cards_player_2.splice(0, 1));
		} else if (winner === card2) {
			cards_player_2 = cards_player_2.concat(cards_player_1.splice(0, 1));
			cards_player_2 = cards_player_2.concat(cards_player_2.splice(0, 1));
		} else {
			if (play1card4 > play2card4 ) {
				cards_player_1 = cards_player_1.concat(cards_player_1.splice(0, 4));
				cards_player_1 = cards_player_1.concat(cards_player_2.splice(0, 4));
			} else {
				cards_player_2 = cards_player_2.concat(cards_player_1.splice(0, 4));
				cards_player_2 = cards_player_2.concat(cards_player_2.splice(0, 4));
			}
		}
		advance();
	}


	advance();

	$(".btn").click(function() {
		play();
	});
});
