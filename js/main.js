var player1ID = "mediaplayer";
var player1 = jwplayer('mediaplayer');
var playerbody = document.getElementById(player1ID);

var pauseStatus = true;

//setup jwplayer
player1.setup({
    // 'flashplayer': 'player.swf',
    'id': 'playerID',
    'width':'1280',
    'height': '960',
    'autostart': true,
    'file': 'https://www.youtube.com/watch?v=tIA_vrBDC1g',
    'controlbar': 'bottom'
});

//add the overlay div when everything's ready
jwplayer().onReady(function(evt){
    if (jwplayer().getRenderingMode() == "html5"){
        var theBody = document.getElementById(player1.id);
    } else {
        var theBody = document.getElementById(player1.id+"_wrapper");
    }

    var el = document.createElement('div');
    el.setAttribute('id', 'overlaycontent');
    theBody.appendChild(el);
});

//append it on time
jwplayer().onTime(function(evt) {

    //get overlay container
    
    var overlay = $("#"+player1ID).next();
    var content_holder = $("#"+player1ID+" #overlaycontent");

    //get time config container
    var timeSetting = overlay.find('.content');
    var timeMark = [];
    var content_Overlay = [];

    timeSetting.each(function(index,element){
        content_Overlay.push(element.innerHTML);
        timeMark.push($(element).attr("target"));
    });

    for(i = 0 ; i < timeMark.length; i++){
        var pinPoint = timeMark[i];
        // console.log(parseInt(evt.position), pinPoint);
        if(Math.floor(evt.position) == pinPoint && pauseStatus==true) {
            // //get pause in point
            this.pause();
            //form the data inside
            content_holder.html(content_Overlay[i]);
        }
    }
});

//get the action of onclick
function submit_answer(result){
    var alert_holder = $("#"+player1ID+" #overlaycontent .alert");
    var result_holder = $("#"+player1ID+" #overlaycontent .result");
    if(result!=undefined && result == true){
        alert_holder.html('You choose the right answer');  
        alert_holder.removeClass('wrong-ans');
        alert_holder.addClass('true-ans');

        result_holder.html("Proceed >>>");
    }
    else{
        alert_holder.html("Wrong !!!");
        alert_holder.removeClass('true-ans');
        alert_holder.addClass('wrong-ans');
    }
}

function proceed(){
    var content_holder = $("#"+player1ID+" #overlaycontent");
    content_holder.html('');
    player1.play();
    pauseStatus = false;
    setTimeout(function(){
        pauseStatus=true;
    },700);
}