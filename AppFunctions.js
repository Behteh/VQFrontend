const url = "http://54.176.18.170:8081";
var user_id, char_id;

async function createUser(name_in, pass_in){
	let endpoint = url+"/user/register";

	let pass = true;

	let uid = 0; //Temporarily store the uid without saving it

	//Create the user
	try{
		let response = await fetch(endpoint,
		{
			method: "POST",
			headers: new Headers({ "content-type": "application/x-www-form-urlencoded" }),
			body: jsonEncode({username: name_in, password: pass_in})
		});
		let data = await response.json();
		console.log("Create data: ");
		console.log(data);
		if (!data.hasOwnProperty("user_id"))
		{
			pass = false;
			console.log("Problem encountered while creating user");
			
		}
		else{
			uid = data.user_id;
		}
	}catch(error){
		console.error(`Error is ${error}`);
		pass = false;
	}

	endpoint = url+"/character/create"
	//Create the character
	try{
		let response = await fetch(endpoint,
		{
			method: "POST",
			headers: new Headers({ "content-type": "application/x-www-form-urlencoded" }),
			body: jsonEncode({name: name_in, user_id: uid})
		});
		let data = await response.json();
		console.log("Create data: ");
		console.log(data);
		if (!data.hasOwnProperty("user_id"))
		{
			pass = false;
			console.log("Problem encountered while creating character");
		}
	}catch(error){
		console.error(`Error is ${error}`);
		pass = false;
	}

	if(pass){
		setPage("LoginPage");
	}
	else{
		showElem("CreateError");
	}
	
}
setPage("LoginPage");

function jsonEncode(jsonObj){
	return Object.entries(jsonObj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

async function getCharById(uid){
	let endpoint = url+"/character/user?id="+uid;

	try{
		let response = await fetch(endpoint,
		{
			method: "GET",
			headers: new Headers({ "content-type": "application/x-www-form-urlencoded" })
		});
		let data = await response.json();
		console.log("Char by ID: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
}

async function getUserById(uid){
	let endpoint = url+"/user/"+uid;

	try{
		let response = await fetch(endpoint,
			{
				method: "GET",
				headers: new Headers({ "content-type": "application/x-www-form-urlencoded" })
			});
		let data = await response.json();
		console.log("User by ID: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
}


async function loginUser(name_in, pass_in){
	let endpoint = url+"/user/login";

	try{
		let response = await fetch(endpoint,
		{
			method: "POST",
			headers: new Headers({ "content-type": "application/x-www-form-urlencoded" }),
			body: jsonEncode({username: name_in, password: pass_in})
		});
		let data = await response.json();
		console.log("Login Data: ");
		console.log(data);
		if (data.hasOwnProperty("user_id"))
		{
			user_id = data.user_id;
			stored_char = await getCharById(user_id);
			if(user_id > 0){
				//stored_char.health = 50;
				char_id = stored_char.character_id;
				document.getElementById("chatUserId").value = user_id;
				stored_user = {
					user_id: user_id,
					username: data.username,
					avatar_url: data.avatar_url,
					user_title: data.user_title,
					admin: data.admin
				};
				fillGamePage();
			}
			else{
				showElem("LoginError");
			}
		}
		else {
			showElem("LoginError");
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}
	
}
async function getWeaponNameById(wid){
		let endpoint = url+"/weapon/"+wid;
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("Weapon data: ");
	console.log(data);
		if (data.hasOwnProperty("name"))
		{
			return data.name;
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return "Great Sword";
}
async function getWeaponCostById(wid){
		let endpoint = url+"/weapon/"+wid;
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("Weapon data: ");
	console.log(data);
		if (data.hasOwnProperty("cost"))
		{
			return data.cost;
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return 100;
}
async function getArmorNameById(aid){
	let endpoint = url+"/armor/"+aid;
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("Armor data: ");
	console.log(data);
		if (data.hasOwnProperty("name"))
		{
			return data.name;
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return 100;
}
async function getArmorCostById(aid){
	let endpoint = url+"/armor/"+aid;
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("Armor data: ");
	console.log(data);
		if (data.hasOwnProperty("cost"))
		{
			return data.cost;
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return "Chain Mail";
}
async function fillGamePage(){
	let endpoint = url+"/character/"+char_id;

	//Default values
	let weaponName = "Great Sword";
	let armorName = "Chain Mail";
	let health = 50;
	let gold = 10;

	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("Character Data: ");
	console.log(data);
		if (data.hasOwnProperty("character_id"))
		{
			weaponName = await getWeaponNameById(data.weapon_id);
			armorName = await getArmorNameById(data.armor_id);
			health = data.health;
			gold = data.gold;
		}
	}catch(error){
		console.error(`Error is ${error}`);
	}

	setElemContent("GameInvWeapon", "Weapon: "+weaponName);
	setElemContent("GameInvArmor", "Armor: "+armorName);
	setElemContent("GameInvHealth", "Health: "+health);
	setElemContent("GameInvGold", "Gold: "+gold);

	setPage("GamePage");
}
async function getAllWeapons(){
	let endpoint = url+"/weapon/view";
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("All weapons: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return [];
}
async function getAllArmors(){
	let endpoint = url+"/armor/view";
	try{
		let response = await fetch(
		endpoint,
		{
			method: "GET",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			})
		})
		let data = await response.json();
		console.log("All armors: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return [];
}

async function getAllCharacterWeapons()
{
	let endpoint = url + "/character/" + char_id + "/weapons";
	try{
		let response = await fetch(
			endpoint,
			{
				method: "GET",
				headers: new Headers({
					"content-type": "application/x-www-form-urlencoded"
				})
			})
		let data = await response.json();
		console.log("Character Weapons: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return [];
}

async function getAllCharacterArmors()
{
	let endpoint = url + "/character/" + char_id + "/armors";
	try{
		let response = await fetch(
			endpoint,
			{
				method: "GET",
				headers: new Headers({
					"content-type": "application/x-www-form-urlencoded"
				})
			})
		let data = await response.json();
		console.log("Character Weapons: ");
		console.log(data);
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}
	return [];
}

async function fillShopPage(){
	let weapons = document.getElementById("WeaponsTable");
	let armor = document.getElementById("ArmorTable");

	let contents = "<tr><th>Weapon Name</th><th>Strength</th><th>Cost</th><th></th></tr>";
	let allWeapons = await getAllWeapons();
	for(let a = 0; a < allWeapons.length; a ++){
		let name = allWeapons[a].name;
		let strength = allWeapons[a].strength;
		let cost = allWeapons[a].cost;
		contents += "<tr>" +
			"<td>"+name+"</td>" +
			"<td>"+strength+"</td>" +
			"<td>"+cost+"</td>" +
			"<td><button onClick='attemptBuy(\"w\", " + cost + ", " + allWeapons[a].weapon_id + ")'>Buy</button></td>" +
			"</tr>";
	}
	weapons.innerHTML = contents;

	contents = "<tr><th>Armor Name</th><th>Defense</th><th>Cost</th><th></th></tr>";
	let allArmors = await getAllArmors();
	for(let a = 0; a < allArmors.length; a ++){
		let name = allArmors[a].name;
		let def = allArmors[a].defense;
		let cost = allArmors[a].cost;
		contents += "<tr>" +
			"<td>"+name+"</td>" +
			"<td>"+def+"</td>" +
			"<td>"+cost+"</td>" +
			"<td><button onClick='attemptBuy(\"a\", " + cost +", " + allArmors[a].armor_id+")'>Buy</button></td>" +
			"</tr>";
	}
	armor.innerHTML = contents;

	hideElem("ShopPriceError");
	document.getElementById("ShopCoinDisplay").innerHTML = "Your coins: "+stored_char.gold;

	setPage("ShopPage");
}

async function fillCharacterWeaponsPage()
{
	let weaponTable = document.getElementById("CharacterWeaponTable");
	let content = "<tr><th>ID</th>" +
		"<th>Name</th>" +
		"<th>Strength</th>" +
		"<th>Equip</th>" +
		"</tr>";
	let allWeapons = await getAllCharacterWeapons();
	for(let x = 0; x < allWeapons.length; x++)
	{
		let name = allWeapons[x].name;
		let strength = allWeapons[x].strength;
		let weapon_id = allWeapons[x].weapon_id;

		content += "<tr><td>" + weapon_id + "</td>" +
			"<td>" + name + "</td>" +
			"<td>" + strength + "</td>" +
			"<td><button onclick='EquipWeapon(" + weapon_id + ")'>Equip</button></td>" +
			"</tr>";
	}
	weaponTable.innerHTML = content;
	setPage("CharacterWeaponsPage");
}

async function fillCharacterArmorsPage()
{
	let weaponTable = document.getElementById("CharacterArmorTable");
	let content = "<tr><th>ID</th>" +
		"<th>Name</th>" +
		"<th>Defense</th>" +
		"<th>Equip</th>" +
		"</tr>";
	let allArmors = await getAllCharacterArmors();
	for(let x = 0; x < allArmors.length; x++)
	{
		let name = allArmors[x].name;
		let defense = allArmors[x].defense;
		let armor_id = allArmors[x].armor_id;

		content += "<tr><td>" + armor_id + "</td>" +
			"<td>" + name + "</td>" +
			"<td>" + defense + "</td>" +
			"<td><button onclick='EquipArmor(" + armor_id + ")'>Equip</button></td>" +
			"</tr>";
	}
	weaponTable.innerHTML = content;
	setPage("CharacterArmorsPage");
}


async function EquipWeapon(weapon_id)
{
	stored_char.weapon_id = weapon_id;
	updateChar();
}

async function EquipArmor(armor_id)
{
	stored_char.armor_id = armor_id;
	updateChar();
}

async function fillBattlePage(){
	//We don't have battle endpoints as far as I'm aware
	//All of this will be filled with default values
	let player_name = stored_char.name;
	let player_health = stored_char.health;
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
	//We don't have history endpoints as far as I'm aware
	//All of this will be filled with default values

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
async function deleteFriend(id){
	endpoint = url+"/friends/"+id+"/delete";
	response = await fetch(
	endpoint,
	{
		method: "DELETE",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		}),
		body: ""
	});
	fillFriendsPage(); 
}
async function deleteFriendRequest(fid){
	endpoint = url+"/friends/"+user_id+"/requests/delete";
	response = await fetch(
	endpoint,
	{
		method: "DELETE",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		}),
		body: jsonEncode({id: fid})
	});
	fillFriendsPage(); 
}
async function acceptFriendRequest(req_id, other_id){
	//Add friend from your id to other_id
	let endpoint = url+"/friends/"+user_id+"/add";
	let response = await fetch(
	endpoint,
	{
		method: "PUT",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		}),
		body: jsonEncode({id: other_id})
	});

	deleteFriendRequest(req_id);
	fillFriendsPage(); 
}
async function getNameById(id){
	let endpoint = url+"/character/"+id;
	let response = await fetch(
	endpoint,
	{
		method: "GET",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		})
	})
	let data = await response.json();
	return data.name;
}

async function sendFriendRequest(){
	let other_id = document.getElementById("friendAddField").value;

	//Send from user_id to other_id;
	
	let endpoint = url+"/friends/"+user_id+"/requests/add";
	let response = await fetch(
	endpoint,
	{
		method: "PUT",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		}),
		body: jsonEncode({id: other_id})
	})
	let data = await response.json();
	console.log("Friend request data: ");
	console.log(data);
	fillFriendsPage(); 
}


async function fillFriendsPage(){
	//Get all friends
	let endpoint = url+"/friends/"+user_id;
	let response = await fetch(
	endpoint,
	{
		method: "GET",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		})
	});
	let data = await response.json();
	console.log("All friends: ");
	console.log(data);

	//Add friends to friend table
	let content = "";
	for(let a = 0; a < data.length; a ++){
		let friendName = await getNameById(data[a].user2);
		content += "<tr><td>"+friendName+"</td><td><button onClick=\"deleteFriend("+data[a].friend_id+")\">Un-friend</button></td></tr>";
	}
	document.getElementById("FriendsTable").innerHTML = content;

	//Get all requests
	endpoint = url+"/friends/"+user_id+"/requests/view";
	response = await fetch(
	endpoint,
	{
		method: "GET",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		})
	});
	data = await response.json();
	console.log("All requests: ");
	console.log(data);

	//Add requests to table
	content = "";
	for(let a = 0; a < data.length; a ++){
		let reqName = await getNameById(data[a].sender_id);
		content += "<tr><td>"+reqName+"</td><td><button onClick=\"acceptFriendRequest("+data[a].request_id+", "+data[a].sender_id+")\">Accept</button></td><td><button onClick=\"deleteFriendRequest("+data[a].request_id+")\">Deny</button></td></tr>";
	}
	document.getElementById("FriendRequestTable").innerHTML = content;

	document.getElementById("friendPageID").innerHTML = "My id: "+user_id;

	setPage("FriendsPage");
}
async function updateChar(){
	//Upate stored_char before calling this function!

	let endpoint = url+"/character/"+char_id+"/update";
	try{
		let response = await fetch(
		endpoint,
		{
			method: "PUT",
			headers: new Headers({
				"content-type": "application/x-www-form-urlencoded"
			}),
			body: jsonEncode({user_id: user_id, weapon_id: stored_char.weapon_id, armor_id: stored_char.armor_id, name: stored_char.name, gold:stored_char.gold, health: stored_char.health})
		})
		let data = await response.json();
		return data;
	}catch(error){
		console.error(`Error is ${error}`);
	}

	fillGamePage();
}
async function startBattle(){
	//We don't have battle endpoints as far as I'm aware
	//All of this will be filled with default values

	//Initiate a battle
	//Change health, add to battle history, whatever

	fillBattlePage();
}
async function attemptBuy(type, cost, id){
	let deltaGold = 0;
	if(type === "w")
	{
		console.log("Buying weapon");
		deltaGold = Math.floor(await getWeaponCostById(stored_char.weapon_id)*0.8);
	}
	else if(type === "a")
	{
		console.log('Buying armor');
		deltaGold = Math.floor(await getArmorCostById(stored_char.armor_id)*0.8);
	}
	if(stored_char.gold + deltaGold >= cost){
		hideElem("ShopPriceError");
		if(type === "w"){
			stored_char.gold += deltaGold;
			stored_char.gold -= cost;
			stored_char.weapon_id = id;
		}
		else if(type === "a"){
			stored_char.gold += deltaGold;
			stored_char.armor_id = id;
			stored_char.gold -= cost;
		}
		document.getElementById("ShopCoinDisplay").innerText = "Gold: " + stored_char.gold;
		updateChar();
	}
	else{
		showElem("ShopPriceError");
	}
}

async function deleteChar(){
	//Delete char_id and user_id
	//Char_id first:
	await fetch( url+"/character/"+char_id+"/delete",
	{
		method: "DELETE",
		headers: new Headers({
			"content-type": "application/x-www-form-urlencoded"
		}),
		body: ""
	});
	//We don't have an endpoint to delete users, but deleting the char should be enough
}

setPage("LoginPage");