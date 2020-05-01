

const input_server = document.getElementById("input_server");
const input_room = document.getElementById("input_room");
const input_name = document.getElementById("input_name");
input_server.value = "meet.jit.si";

const connect_screen  = document.getElementById("connect_screen");


const btn_connect = document.getElementById("btn-connect");




var current_layer;


addNavBtnListeners();



function openConnection(layer) {

    const domain = input_server.value;
    const room = input_room.value;
    const name = input_name.value;

    if (room === "") return;
    //Change layer
    changeLayer(layer.id);


    layer.button.style.display = "inline";
    layer.button.innerText = room;


    //Login
    const options = {
        roomName: room,
        width: screen.width - 40,
        height: screen.height - 190,
        parentNode: layer.container,
        userInfo: {},
        interfaceConfigOverwrite: interfaceConfig
    };
    if (name !== ""){
        options.userInfo = {displayName: name};
    }
    console.log("Connect...: Layer: " + layer.id);
    layer.api = new JitsiMeetExternalAPI(domain, options);
}


function closeConnection(layer) {
    layer.api.dispose();
    layer.api = null;
    layer.button.style.display = "none";
    changeLayer(layers.connect_layer.id);
}


function getNextLayer() {

    for (let layersKey in layers) {
        if (layers[layersKey].api == null && layersKey !== "connect_layer"){
            return layers[layersKey];
        }
    }

    $('#modal_max_con').modal();
}



function exec_btn_connect() {
    changeLayer(layers.connect_layer.id);
}

function exec_hangup_icon() {
    if (!(current_layer == null || current_layer === layers.connect_layer)) {
        closeConnection(current_layer);
    }
}





function addNavBtnListeners() {

    for (let i = 1; i <= 10; i++) {
        getNavButton(i).addEventListener("click",function () {
            console.log("exec " + i);
            changeLayer(i);
        });
        console.log("Add " + " " + i);
    }

    /*let id = 1;
    for (let layersKey in layers) {
        if (layersKey === "connect_layer") continue;
        layers[layersKey].button.addEventListener("click",function () {
            console.log("exec " + id);
            changeLayer(id);
        });
        console.log("Add " + layersKey + " " + id);
        id++;
    }*/
}


// Util
function changeLayer(newLayerId) {
    console.log("Change layer: " + newLayerId);
    for (let layersKey in layers) {
        if (layers[layersKey].id === newLayerId) {
            layers[layersKey].container.style.display = "inline";
            current_layer = layers[layersKey];
        }else {
            layers[layersKey].container.style.display = "none";
        }
    }
    /*switch (newLayer) {
        case layers.meet_layer:
            connect_screen.style.display = "none";
            meet_screen.style.display = "inline";
            current_layer = layers.meet_layer;
            break;
        case layers.connect_layer:
            meet_screen.style.display = "none";
            connect_screen.style.display = "inline";
            current_layer = layers.connect_layer;
            break;
    }*/
}

function getNavButton(meetingNumber) {
    return document.getElementById("btn-meet" + meetingNumber);
}

function getMeetingScreen(meetingNumber) {
    return document.getElementById("meet_screen" + meetingNumber);
}

function getLayer(meetingNumber) {
    for (let layersKey in layers) {
        if (layers[layersKey].id === meetingNumber){
            return layers[layersKey];
        }
    }
}

function getScreenByButton(button) {
    for (let layersKey in layers) {
        if (layers[layersKey].button == button) return layers[layersKey];
    }
    return null;
}