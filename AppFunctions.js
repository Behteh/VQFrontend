async function createUser(username, password){
	//Create a user
	//No return required
	//If success, call setPage("LoginPage");
	//If fail, call showElem("CreateError");

	setPage("LoginPage");
}
async function loginUser(name_in, pass_in){
	//Log-in a user
	//No return required
	//If success, call fillGamePage();
	//If fail, call showElem("LoginError");
const url = "http://54.176.18.170:8080/project_2-0.0.1-SNAPSHOT/user/login";


	let loginObj = {
		username: name_in,
		password: pass_in
	};

	try{
		let response = await fetch(
		url,
		{
			method: "POST",
			mode: 'cors',
			headers: new Headers({
				'content-type':'application/json'
			}),
			body: JSON.stringify(loginObj)}
		)
		let data = await response.json();
		console.log(data);

	}catch(error){
		console.error(`Error is ${error}`);
	}
	fillGamePage();
}
async function fillGamePage(){
	let weaponName = "newWeapon";
	let armorName = "newArmor";
	let health = 50;
	let gold = 0;

	setElemContent("GameInvWeapon", "Weapon: "+weaponName);
	setElemContent("GameInvArmor", "Armor: "+armorName);
	setElemContent("GameInvHealth", "Health: "+health);
	setElemContent("GameInvGold", "Gold: "+gold);

	setPage("GamePage");
}
async function fillShopPage(){
	let weapons = document.getElementById("WeaponsTable");
	let armor = document.getElementById("ArmorTable");

	let contents = "<tr><th>Weapon Name</th><th>Strength</th><th>Cost</th><th></th></tr>";
	for(let a = 0; a < 3; a ++){
		let name = "Weapon "+a;
		let strength = 100;
		let cost = 100;
		contents += "<tr><td>"+name+"</td><td>"+strength+"</td><td>"+cost+"</td><td><button>Buy</button></td></tr>"
	}
	weapons.innerHTML = contents;


	contents = "<tr><th>Armor Name</th><th>Defense</th><th>Cost</th><th></th></tr>";
	for(let a = 0; a < 3; a ++){
		let name = "Armor "+a;
		let def = 100;
		let cost = 100;
		contents += "<tr><td>"+name+"</td><td>"+def+"</td><td>"+cost+"</td><td><button>Buy</button></td></tr>"
	}
	armor.innerHTML = contents;

	setPage("ShopPage");
}
async function fillBattlePage(){
	let player_name = "player1";
	let player_health = 50;
	let player_weapon = "sword";
	let player_str = 50;
	let player_armor = "steel armor";
	let player_def = 50;

	let enemy_name = "enemy1";
	let enemy_health = 40;
	let enemy_weapon = "axe";
	let enemy_str = 40;
	let enemy_armor = "iron armor";
	let enemy_def = 40;

	setElemContent("PlayerStatsName", "Name: "+player_name);
	setElemContent("PlayerStatsHealth", "Health: "+player_health);
	setElemContent("PlayerStatsWeapon", "Weapon: "+player_weapon+" (Str: "+player_str+")");
	setElemContent("PlayerStatsArmor", "Armor: "+player_armor+" (Def: "+player_def+")");

	setElemContent("BattleTopLine", "You battled "+enemy_name);
	setElemContent("EnemyStatsName", "Name: "+enemy_name);
	setElemContent("EnemyStatsHealth", "Health: "+enemy_health);
	setElemContent("EnemyStatsWeapon", "Weapon: "+enemy_weapon+" (Str: "+enemy_str+")");
	setElemContent("EnemyStatsArmor", "Armor: "+enemy_armor+" (Def: "+enemy_def+")");

	setPage("BattlePage");
}
async function fillHistoryPage(){
	let beat = document.getElementById("EnemiesBeatDiv");
	let lost = document.getElementById("EnemiesLostDiv");
	
	beat.innerHTML = "";
	for(let a = 0; a < 3; a ++){
		let newElem = document.createElement('p');
		newElem.innerHTML = "enemy"+a;
		beat.appendChild(newElem);
	}

	lost.innerHTML = "";
	for(let a = 3; a < 6; a ++){
		let newElem = document.createElement('p');
		newElem.innerHTML = "enemy"+a;
		lost.appendChild(newElem);
	}
	setPage("HistoryPage");
}
async function fillFriendsPage(){

	setPage("FriendsPage");
}
async function updateChar(){
	//Update the character's attributes

	fillGamePage();
}
async function startBattle(){
	//Initiate a battle
	//Change health, add to battle history, whatever

	fillBattlePage();
}

setPage("LoginPage");