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
	//Difficulty is 1/2/3
	//Scavenging logic
	//Use updateChar() to update values
	//This should also update the game page
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
function deleteButton(){
	switchLoginButton();
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