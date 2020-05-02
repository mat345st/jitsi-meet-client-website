

const input_server = document.getElementById("input_server");
const input_room = document.getElementById("input_room");
const input_name = document.getElementById("input_name");
input_server.value = "meet.jit.si";

const connect_screen  = document.getElementById("connect_screen");
const multi_window_screen = document.getElementById("multi_window_screen");


const btn_connect = document.getElementById("btn-connect");
const btn_multi_window = document.getElementById("btn-multi-window");

const btn_connect_mw = document.getElementById("mw_connect_btn");

const hangup_icon = document.getElementById("navbar_hangup_icon");




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

    input_room.value = "";

    login(layer, domain, room, name, layer.width,  layer.height);

}

function openMwConnection() {
    const domain = input_server.value;
    const room = input_room.value;
    const name = input_name.value;

    if (room === "") return;

    changeLayer(layers.multi_window_layer.id);


    const layer = getNextMwContainer();
    if (layer === undefined || layer == null) return;

    input_room.value = "";

    layer.hangup_icon.style.display = "inline";

    login(layer, domain, room, name, layer.width, layer.height);
}

function login(layer, domain, room, name, width, height) {
    //Login
    const options = {
        roomName: room,
        width: width,
        height: height,
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

function closeMwConnection(container) {
    container.api.dispose();
    container.api = null;
    container.hangup_icon.style.display = "none";
    //changeLayer(layers.connect_layer.id);
}


function getNextLayer() {
    for (let layersKey in layers) {
        if (layers[layersKey].meeting_layer){
            if (layers[layersKey].api == null /*&& layersKey !== "connect_layer" && layersKey !== "multi_window_layer" */){
                console.log("Next layer: " + layers[layersKey].id);
                return layers[layersKey];
            }
        }
    }
    $('#modal_max_con').modal();
}

function getNextMwContainer() {
    for (let layersKey in layers.multi_window_layer.sub_layers) {

            if (layers.multi_window_layer.sub_layers[layersKey].api == null /*&& layersKey !== "connect_layer" && layersKey !== "multi_window_layer" */){
                console.log("Next  mw layer: " + layers.multi_window_layer.sub_layers[layersKey].id);
                return layers.multi_window_layer.sub_layers[layersKey];
            }

    }
    $('#modal_max_con_mw').modal();
}



function exec_btn_connect() {
    changeLayer(layers.connect_layer.id);
}

function exec_hangup_icon() {
    if (!(current_layer == null || current_layer === layers.connect_layer)) {
        closeConnection(current_layer);
    }
}

function exec_btn_multi_window() {
    changeLayer(layers.multi_window_layer.id);
}


function addNavBtnListeners() {

    for (let i = 1; i <= 10; i++) {
        getNavButton(i).addEventListener("click",function () {
            console.log("exec " + i);
            changeLayer(i);
        });
        //console.log("Add listener " + i);
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


function setBtnActive(button) {
    console.log("Set active" + button);
    for (let layersKey in layers) {
        if (layers[layersKey].button === button) {
            button.style.backgroundColor = "rgb(180,180,180)";
        } else {
            layers[layersKey].button.style.backgroundColor = document.getElementById("navbar").style.backgroundColor;
        }
    }

}
// Util
function changeLayer(newLayerId) {
    console.log("Change layer: " + newLayerId);
    for (let layersKey in layers) {
        if (layers[layersKey].id === newLayerId) {
            layers[layersKey].container.style.display = "inline";
            current_layer = layers[layersKey];
            setBtnActive(layers[layersKey].button);
            if (layers[layersKey].meeting_layer){
                hangup_icon.style.opacity = "100%";
            } else{
                hangup_icon.style.opacity = "0%";
            }
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

function getMwIFrameContainer(meetingNumber) {
    return document.getElementById("mw_iframe_container" + meetingNumber);
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
        if (layers[layersKey].button === button) return layers[layersKey];
    }
    return null;
}