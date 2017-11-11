$(document).ready(function(){

	var characters = {
		'obi': {
			name: 'obi',
			attack: 8,
			hp: 120,
			counter: 10
		},
		'luke': {
			name: 'luke',
			attack: 7,
			hp: 100,
			counter: 5
		},
		'siddious': {
			name: 'siddious',
			attack: 10,
			hp: 150,
			counter: 15
		},
		'vader': {
			name: 'vader',
			attack: 12,
			hp: 180,
			counter: 20
		}
	};

	var charSelected = false;
	var charId = "";
	var enemies = [];
	var defenderSelected = false;
	var currentAttack = 0;
	var currentDefender = "";
	var message = "";
	var winCounter = 0;

	function selectDefender(){
		$('#message').text(message + 'Choose an enemy to attack by clicking on it.')
		$('.enemy').click(function(){
			$('.defender-container').append($(this));
		});
	}

	function capitalize(string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function reset(){
		$('#reset').append('<button id="reset-button" class="sw-font spaced-out">Reset</button>');
		$('#reset-message').text("Click on 'Reset' to play again!");
		$('#reset-button').click(function(){
			location.reload();
		});
	}

	$('.obi-hp').text(characters.obi.hp);
	$('.luke-hp').text(characters.luke.hp);
	$('.siddious-hp').text(characters.siddious.hp);
	$('.vader-hp').text(characters.vader.hp);

	if(!charSelected){
		$('#message').text("Choose a character to fight with by clicking on it.");
	} 

	if(!charSelected){
		$('.char').click(function(){
			if(!charSelected){
				// console.log(this);
				charSelected = $(this);
				charId = $(this).attr('id');
				$('.your-character-container').append($(this));
				$('.enemy-container').prepend($('.character-container'));
				$('.character-container').children().css('background', '#f77');
				$('.character-container').children().addClass('enemy');
			}
			charSelected = true;
			if (charSelected && !defenderSelected){
				$('#message').text("Choose an enemy to attack by clicking on it.");
			}
			// console.log(enemies);
			if(!defenderSelected){
				var enemyId = $('.enemy').click(function(){
					console.log("enemy clicked!");
					if (!defenderSelected){
						$(this).addClass('current-defender');
						$('.defender-container').append($('.current-defender'));
						$('.defender-container').children().css('background', '#000');
						$('.defender-container').children().css('color', '#fff');
					}
					console.log(enemyId);
					defenderSelected = true;
					if (charSelected && defenderSelected){
						$('#message').text('Press "Attack" to attack the enemy!');
					}
				});
			}
		});
	}

	$('#attack').click(function(){
		if (characters[charId]["hp"] != 0 || winCounter == 3){
			if (defenderSelected == true){
				currentAttack += characters[charId]["attack"];
			}
			console.log(currentAttack);
			currentDefender = $('.current-defender').attr('id');
			// console.log(currentDefender);
			characters[currentDefender]["hp"] -= currentAttack;
			if (characters[currentDefender]["hp"] < 0){
				characters[currentDefender]["hp"] = 0;
				var upperCaseName = capitalize(currentDefender);
				message = "You defeated " + upperCaseName + "! ";
				$('.defender-container').empty();
				defenderSelected = false;
				selectDefender();
			} else {
				characters[charId]["hp"] -= characters[currentDefender]["counter"];
			}
			var displayHP = characters[currentDefender]["hp"];
			console.log(displayHP);
			switch (currentDefender) {
				case 'obi':
				$('.obi-hp').text(displayHP);
				break;
				case 'luke':
				$('.luke-hp').text(displayHP);
				break;
				case 'siddious':
				$('.siddious-hp').text(displayHP);
				break;
				case 'vader':
				$('.vader-hp').text(displayHP);
				break;
			}
			// characters[charId]["hp"] -= characters[currentDefender]["counter"];
			if (characters[charId]["hp"] < 0) characters[charId]["hp"] = 0;
			displayHP = characters[charId]["hp"];
			console.log(characters[charId]["hp"]);
			switch (charId) {
				case 'obi':
				$('.obi-hp').text(displayHP);
				break;
				case 'luke':
				$('.luke-hp').text(displayHP);
				break;
				case 'siddious':
				$('.siddious-hp').text(displayHP);
				break;
				case 'vader':
				$('.vader-hp').text(displayHP);
				break;
			}
			if (characters[charId]["hp"] <= 0 && characters[currentDefender]["hp"] <= 0) {
				$('#message').text("You both lose!");
				reset();
			} else if (characters[charId]["hp"] <= 0){
				$('#message').text("You lose!");
				reset();
			} else if (characters[currentDefender]["hp"] <= 0){
				winCounter++;
				if (winCounter == 3) {
					$('#message').text("YOU WIN!!!");
					$('.defender-container').empty();
					reset();
				 } //else {
				// 	var upperCaseName = capitalize(currentDefender);
				// 	message = "You defeated " + upperCaseName + "! ";
				// 	$('.defender-container').empty();
				// 	defenderSelected = false;
				// 	selectDefender();
				// }
				console.log("winCounter = " + winCounter);
			}
		}
	});
});
