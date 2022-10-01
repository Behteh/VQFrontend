var stored_char;
var stored_user;

function hideElem(name){
	document.getElementById(name).style.display="none";
}
function showElem(name){
	document.getElementById(name).style.display="block";
}
function setElemContent(name, content){
	document.getElementById(name).innerHTML = content;
}
function hideAll(){
	hideElem("LoginPage");
	hideElem("CreatePage");
	hideElem("GamePage");
	hideElem("FriendsPage");
	hideElem("ShopPage");
	hideElem("HistoryPage");
	hideElem("BattlePage");
	hideElem("ChatPage");
	hideElem("CharacterWeaponsPage");
	hideElem("CharacterArmorsPage");
	hideElem("AdminPage");
}
function setPage(name){
	//Not needed but slightly convenient
	hideAll();
	showElem(name);
}
function createButton(){
	//Create the user
	let username = document.getElementById("CreateUsername").value;
	let pass1 = document.getElementById("CreatePass1").value;
	let pass2 = document.getElementById("CreatePass2").value;

	//Make sure the passwords match
	if(pass1 !== pass2){
		showElem("CreateMismatch");
		return;
	} else{
		hideElem("CreateMismatch");
	}
	
	createUser(username, pass1);
}
function loginButton(){
	//Log the user in
	let username = document.getElementById("LoginUsername").value;
	let password = document.getElementById("LoginPassword").value;

	loginUser(username, password);
}

async function adminButton()
{
	let userinfo = await getUserById(user_id);
	if(!userinfo.admin)
	{
		console.error("You do not have permission to access this resource.");
		document.getElementById("AdminNoPermission").style.display = "block";
	}
	else
	{
		console.log("You are clear to enter the admin panel");
		setPage("AdminPage");
	}
}

function switchLoginButton(){
	hideElem("LoginError");
	document.getElementById("LoginUsername").value = "";
	document.getElementById("LoginPassword").value = "";
	setPage("LoginPage");
}
function switchCreateButton(){
	hideElem("CreateError");
	hideElem("CreateMismatch");
	document.getElementById("CreateUsername").value = "";
	document.getElementById("CreatePass1").value = "";
	document.getElementById("CreatePass2").value = "";
	setPage("CreatePage");
}
function gameHub(){
	fillGamePage();
}
function scavenge(difficulty){
	// Do nothing if health is 0
	if(stored_char.health <= 0)
	{
		document.getElementById("scavengeError").style.display = "block";
		console.log("Can't scavenge with zero health.");
	}
	else
	{
		document.getElementById("scavengeError").style.display = "none";
		//Difficulty is 1/2/3
		if (difficulty === 1)
		{
			stored_char.gold += Math.floor(Math.random() * 10);
		}
		else if (difficulty === 2)
		{
			stored_char.health -= Math.floor(Math.random() * 10);
			stored_char.gold += Math.floor(Math.random() * 20);
		}
		else if (difficulty === 3)
		{
			stored_char.health -= Math.floor(Math.random() * 20);
			stored_char.gold += Math.floor(Math.random() * 50);
		}
		if(stored_char.health < 0)
		{
			stored_char.health = 0;
		}
		document.getElementById("GameInvGold").innerText = "Gold: " + stored_char.gold;
		document.getElementById("GameInvHealth").innerText = "Health: " + stored_char.health;
		updateChar().then((res) => console.log("Completed scavenge action"));
	}
}
function campButton()
{
	stored_char.health = 100;
	document.getElementById("GameInvHealth").innerText = "Health: " + stored_char.health;
	updateChar().then((res) => console.log("camping to restore hp."));
}
function shopButton(){
	fillShopPage();
}
function battleButton(){
	startBattle();
}
function historyButton(){
	fillHistoryPage();
}
function friendsButton(){
	fillFriendsPage();
}
function chatButton(){
	setPage("ChatPage");
}
function deleteButton(){
	deleteChar();
}
function logoutButton(){
	switchLoginButton();
}
function showWeapons(){
	hideElem("ArmorDiv");
	showElem("WeaponsDiv");
}
function showArmor(){
	hideElem("WeaponsDiv");
	showElem("ArmorDiv");
}

function viewCharacterWeaponsButton()
{
	fillCharacterWeaponsPage();
}

function viewCharacterArmorsButton()
{
	fillCharacterArmorsPage();
}

function InventoryButton()
{
	displayCharacterWeapons();
	displayCharacterArmors();
}