const loginbtn = document.getElementById("loginbtn");
loginbtn.addEventListener("click", function(e) {
    var display = document.getElementById("Nav").style.display = "block";
    var display = document.getElementById("ChtBtn").style.display = "block";
    var remove = document.getElementById("Login").style.display ="none";

console.log(display)});

const shopbtn = document.getElementById("shopbtn");
shopbtn.addEventListener("click", function(e) {
    var display = document.getElementById("Shop").style.display = "block";
    var remove = document.getElementById("Nav").style.display ="none";
console.log(display)});

const weaponsbtn = document.getElementById("weaponsbtn");
weaponsbtn.addEventListener("click", function(e) {
    var display = document.getElementById("Weapons").style.display = "block";
    var remove = document.getElementById("Armor").style.display = "none";
    var remove = document.getElementById("Shop").style.display ="none";
console.log(display)});

const armorbtn = document.getElementById("armorbtn");
armorbtn.addEventListener("click", function(e) {
    var display = document.getElementById("Armor").style.display = "block";
    var remove = document.getElementById("Weapons").style.display = "none";
    var remove = document.getElementById("Shop").style.display ="none";
console.log(display)});

const battlebtn = document.getElementById("battlebtn");
battlebtn.addEventListener("click", function(e) {
    var display = document.getElementById("Battle").style.display = "block";
    var remove = document.getElementById("Nav").style.display ="none";
console.log(display)});

const socialbtn = document.getElementById("socialbtn");
socialbtn.addEventListener("click", function(e) {
    var display = document.getElementById("Social").style.display = "block";
    var remove = document.getElementById("Nav").style.display ="none";
console.log(display)});

const chatbtn = document.getElementById("chatbtn");
chatbtn.addEventListener("click", function(e) {
    var display = document.getElementById("wrapper").style.display = "block";
    var display = document.getElementById("ChtBtn").style.display = "none";
console.log(display)});

const exitbtn = document.getElementById("exitbtn");
exitbtn.addEventListener("click", function(e) {
    var display = document.getElementById("ChtBtn").style.display = "block";
    var remove = document.getElementById("wrapper").style.display ="none";
console.log(display)});

async function asyncLogin(){
    let userInput = document.querySelector("#username").value;
    let passInput = document.querySelector("#password").value;

    const url = "http://54.176.18.170:8080/project_2-0.0.1-SNAPSHOT/user/login";
    

    let loginObj = {
        username: userInput,
        password: passInput
    };
    console.log(loginObj);
    try{
        let response = await fetch(
            url,
            {
                method: "POST",
                mode: 'no-cors',
                headers: new Headers({
                    'content-type':'application/json'
                }),
                
                body: JSON.stringify(loginObj)}
        )

        let data = await response.json();
    }catch(error){
        console.error(`Error is ${error}`);
    }
}

