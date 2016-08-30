$(document).ready(function(){
	var playerCharacter;
	var currentEnemy;
	var playerChosen = false;
	var enemyChosen = false; 
	var enemies = [];
	$('#atkbutton').hide()

 var characters = {
 	lukeSkywalker: {
 		name: "Luke Skywalker",
 		image: "<img src = 'assets/luke.jpg' class = 'img-responsive character' id = 'Luke' data-name = 'lukeSkywalker' alt = 'Luke Skywalker'>",
 		health: 100, 
 		attack: 20, 
 		counter: 5 
 	},
 	darthVader: {
 		name: "Darth Vader",
 		image: "<img src = 'assets/vader.jpg' class = 'img-responsive character' data-name = 'darthVader' id = 'Vader' alt = 'Darth Vader'>",
 		health: 150, 
 		attack: 10, 
 		counter: 15 
 	},
 	hanSolo: {
 		name: "Han Solo",
 		image: "<img src = 'assets/han.jpg' class = 'img-responsive character' id = 'Han' data-name = 'hanSolo' alt = 'Han Solo'>",
 		health: 120, 
 		attack: 10,
 		counter: 20
 	},
 	maceWindu: {
 		name: "Mace Windu",
 		image: "<img src = 'assets/mace.jpg' class = 'img-responsive character' data-name = 'maceWindu' id = 'Mace' alt = 'Mace Windu'>",
 		health: 200,
 		attack: 5,
 		counter: 15
 	}
 };

function sortChars () {
	$('#characters').empty();
	for (var key in characters) { 
		if (characters.hasOwnProperty(key)) { 
	 	// console.log(key + " -> " + characters[key]); 
	 		if (characters[key] == playerCharacter) {
	 		// console.log('player character' + playerCharacter)
	 		$('#player').append(playerCharacter.image);
	 			}else $('#enemy').append(characters[key].image)
		}
	}
}


function sortEnemy (){
	for (var key in characters){
		if (characters.hasOwnProperty(key)) {
			if (characters[key] == currentEnemy) {
				$('#fight').append(currentEnemy.image);
				$('#enemy > .selected_enemy').remove()	
			}
		}
	}
	$('#atkbutton').show();
}

function newAttacker (){
	$('#fight').empty();
	$('#fight').html($('<h2>').text("Select another enemy!"))
	$('.selected_enemy').removeClass('selected_enemy').addClass('defeated')
	enemyChosen = false;
}



function startGame () {
	$('#characters').append(characters.lukeSkywalker.image, characters.darthVader.image, characters.hanSolo.image, characters.maceWindu.image);
	$(document).on('click', '#characters > .character', function(){
		var playerName = $(this).data('name');
		playerCharacter = characters[playerName];
		playerChosen = true;
		sortChars();
	});
	$(document).on('click', '#enemy > .character', function(){
		if (enemyChosen) return;
		var enemy = $(this).data('name');
		currentEnemy = characters[enemy];
		$(this).addClass('selected_enemy');
		enemyChosen = true;
		sortEnemy();
	});
	$('#atkbutton').on('click', function(){
		// console.log("Yes")
		if (enemyChosen && currentEnemy.health > 0 && playerCharacter.health > 0){
			currentEnemy.health -= playerCharacter.attack
			playerCharacter.attack += playerCharacter.attack
			playerCharacter.health -= currentEnemy.counter
			// console.log(currentEnemy.health)
			// console.log(playerCharacter.attack)
			// console.log(playerCharacter.health)
		} else newAttacker()
	});
}
startGame();
});