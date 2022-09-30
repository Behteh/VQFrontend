const baseUrl = "http://54.176.18.170:8081/project_2-0.0.1-SNAPSHOT";
let cachedusers = [];
let guestUser = {
    id: 0,
    name: "Guest"
};
cachedusers.push(guestUser);

let sendMessageButton = document.getElementById("messageSenderButton");
sendMessageButton.addEventListener("click", function () {
    let message = document.getElementById("messageSenderMessage").value;
    let userid = document.getElementById("chatUserId").value;
    document.getElementById("messageSenderMessage").value = "";
    sendMessage(userid, message).then(r => console.log(r));
})

let reloadChatButton = document.getElementById("reloadChatButton");
reloadChatButton.addEventListener("click", function() {
    reloadChat();
})

function reloadChat()
{
    beginLoadingMessages();
    getMessages().then((res) => console.log("Reloading messages"));
}

function generateColorSelector(element, defaultColor)
{
    let colors = ["Black", "White", "Red", "Orange", "Yellow", "Green", "Indigo", "Violet"];
    for(let x = 0; x < colors.length; x++)
    {
        let option = document.createElement("option");
        option.value = colors[x];
        option.innerText = colors[x];
        if(colors[x] === defaultColor)
        {
            option.selected = true;
        }
        element.appendChild(option);
    }
}

async function fetchCharacterById(character_id)
{
    let url = baseUrl + "/character/" + character_id;

    return await fetch(url, {
        method: "GET"
    }).then((response) => response.json()).then((data) => data);
}

// Userid, Time, Message
async function renderMessage(json)
{
    if(!json.hasOwnProperty("character_id"))
    {
        json.character_id = 0;
    }
    let user;
    if(!cachedusers.find(users => users.id === json.character_id))
    {
        user = await fetchCharacterById(json.character_id);
        console.log(user);
        let newUser = {
            id: user.character_id,
            name: user.name
        }
        cachedusers.push(newUser);
    }
    else
    {
        user = cachedusers.find(users => users.id === json.character_id);
    }
    let textColor = document.getElementById("textColorSelector").value;
    let backgroundColor = document.getElementById("backgroundColorSelector").value;

    let row = document.createElement("div");
        row.setAttribute("class", "row");

        let nameElement = document.createElement("div");
        nameElement.setAttribute("class", "col-3 border");
        nameElement.style.color = textColor;
        nameElement.innerText = user.name;
        nameElement.style.backgroundColor = backgroundColor;
        row.appendChild(nameElement);

        let timeElement = document.createElement("div");
        timeElement.setAttribute("class", "col-3 border");
        let time = new Date(json.timestamp);
        let month = time.getMonth();
        if(month < 10)
        {
            month = "0" + month;
        }
        let day = time.getDate();
        if(day < 10)
        {
            day = "0" + day;
        }
        let hour = time.getHours();
        if(hour < 10)
        {
            hour = "0" + hour;
        }
        let minutes = time.getMinutes();
        if(minutes < 10)
        {
            minutes = "0" + minutes;
        }
        timeElement.style.color = textColor;
        timeElement.innerText = month + "-" + day + " " + hour + ":" + minutes;
        timeElement.style.backgroundColor = backgroundColor;
        row.appendChild(timeElement);

        let messageElement = document.createElement("div");
        messageElement.setAttribute("class", "col-6 border");
        messageElement.style.backgroundColor = backgroundColor;
        messageElement.style.color = textColor;
        messageElement.innerText = json.message;
        row.appendChild(messageElement);

        document.getElementById("chatMessages").appendChild(row);
}

function beginLoadingMessages()
{
    let chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";
}

async function sendMessage(userid, message)
{
    let messageObject = {
        id: userid,
        message: message
    }
    console.log(JSON.stringify(messageObject));
    let formEncoded = Object.entries(messageObject)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    let url = baseUrl + "/message/add";
    await fetch(url, {
        method: "PUT",
        headers: new Headers({
            "content-type": "application/x-www-form-urlencoded"
        }),
        body: formEncoded}
        )
    .then((response) => response.json())
        .then((data) => renderMessage(data)),
        (error) =>
        {
            console.error(error)
        }
}

async function getMessages()
{
    let url = baseUrl + "/message/view";
    fetch(url,
        {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            renderMessages(data);
        })
        ,
        (error) => {
        console.error(error);
    }
}

async function pageLoad()
{
    beginLoadingMessages();
    await getMessages();
    generateColorSelector(document.getElementById("textColorSelector"), "Black");
    generateColorSelector(document.getElementById("backgroundColorSelector"), "White");
}

async function renderMessages(data)
{
    for(let x = 0; x < data.length; x++)
    {
        await renderMessage(data[x]);
    }
}

document.onload
{
    pageLoad().then(r => console.log("Loading data..."));
}