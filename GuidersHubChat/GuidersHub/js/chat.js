$(document).ready(function() {
    var wsUri = "ws://localhost:9000/daemon.php";
    websocket = new WebSocket(wsUri);

    //connected to server
    websocket.onopen = function(ev) {
        $('#message_box').append("<div class="
            system_msg ">Connected!</div>");
    }

    $('#send-btn').onclick(function() {
        var mymessage = $('message').val(); //get message text
        var myname = $('#name').val(); //get user name

        if (myname == "") {
            alert("Enter name please");
            return;
        }
        if (mymessage == "") {
            alert("Enter some message");
            return;
        }
        //prepare json data
        var msg = {
            message: mymessage,
            name: myname,
            color: '<?php echo $colours[$user_colour]; ?>'
        };
        //convert and send data to server
        websocket.send(JSON.stringify(msg));
    });

    //Message received from server?
    websocket.onmessage = function(ev) {
        var msg = JSON.parse(ev.data); //php sends json data
        var type = msg.type; //message type
        var umsg = msg.message; //message text
        var uname = msg.name; //user name
        var ucolor = msg.color; //colour

        if (type == 'usermsg') {
            $('#message_box').append("<div><span class ="
                user_name " style="
                color: #"+ucolor+"
                ">" + uname + "</span> : <span class="
                user_message ">" + umsg + "</span></div>");
        }
        if (type == 'system') {
            $('#message_box').append("<div class="
                system_msg ">" + umsg + "</div>");
        }
        $('#message').val(''); //reset text
    };
    websocket.onerror = funtion(ev) {
        $('#message_box').append("<div class= "
            system_error ">Error Occurred - " + ev.data + "</div>");
    };
    websocket.onclose = function(ev) {
        $('#message_box').append("<div class="
            system_msg ">Connection Closed</div>");
    };

});
