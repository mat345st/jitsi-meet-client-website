const layers = {
    connect_layer: {
        id: -1,
        name: "connect",
        container: connect_screen,
        button: btn_connect,
        meeting_layer: false
    },
    multi_window_layer:{
        id: 0,
        name: "multi window",
        container: multi_window_screen,
        button: btn_multi_window,
        meeting_layer: false,
        sub_layers:{
            mw_meet_layer1: {
                id: 1,
                name: "mw_meet1",
                container: getMwMeetingScreen(1),
                api: null,
                meeting_layer: true
            },
            mw_meet_layer2: {
                id: 2,
                name: "mw_meet2",
                container: getMwMeetingScreen(2),
                api: null,
                meeting_layer: true
            },
            mw_meet_layer3: {
                id: 3,
                name: "mw_meet3",
                container: getMwMeetingScreen(3),
                api: null,
                meeting_layer: true
            },
            mw_meet_layer4: {
                id: 4,
                name: "mw_meet4",
                container: getMwMeetingScreen(4),
                api: null,
                meeting_layer: true
            }
        }
    },
    meet_layer1: {
        id: 1,
        name: "meet1",
        container: getMeetingScreen(1),
        button: getNavButton(1),
        api: null,
        meeting_layer: true
    },
    meet_layer2: {
        id: 2,
        name: "meet2",
        container: getMeetingScreen(2),
        button: getNavButton(2),
        api: null,
        meeting_layer: true
    },
    meet_layer3: {
        id: 3,
        name: "meet3",
        container: getMeetingScreen(3),
        button: getNavButton(3),
        api: null,
        meeting_layer: true
    },
    meet_layer4: {
        id: 4,
        name: "meet4",
        container: getMeetingScreen(4),
        button: getNavButton(4),
        api: null,
        meeting_layer: true
    },
    meet_layer5: {
        id: 5,
        name: "meet5",
        container: getMeetingScreen(5),
        button: getNavButton(5),
        api: null,
        meeting_layer: true
    },
    meet_layer6: {
        id: 6,
        name: "meet6",
        container: getMeetingScreen(6),
        button: getNavButton(6),
        api: null,
        meeting_layer: true
    },
    meet_layer7: {
        id: 7,
        name: "meet7",
        container: getMeetingScreen(7),
        button: getNavButton(7),
        api: null,
        meeting_layer: true
    },
    meet_layer8: {
        id: 8,
        name: "meet8",
        container: getMeetingScreen(8),
        button: getNavButton(8),
        api: null,
        meeting_layer: true
    },
    meet_layer9: {
        id: 9,
        name: "meet9",
        container: getMeetingScreen(9),
        button: getNavButton(9),
        api: null,
        meeting_layer: true
    },
    meet_layer10: {
        id: 10,
        name: "meet10",
        container: getMeetingScreen(10),
        button: getNavButton(10),
        api: null,
        meeting_layer: true
    },


};