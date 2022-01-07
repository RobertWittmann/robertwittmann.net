var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var circleY = [];

var scrollSpeed = 800;
var currentScrollState = 0;
var scrollReady = true;

var animationspeed = 300;
var animationReady = true;

var projectState = 0;
var currentProjectIndex = 1;

var position = 0;

$(document).ready(function(){
    if(isMobile.any()){
        $("body").css("overflow-y", "scroll");
        $("#personalmenu>ul>li>a").css("color", "#F6BD60");
        $("#personalmenu>ul>li>a").css("float", "left");
        $("#personalmenu>ul>li>.underline").css("background-color", "#F6BD60");
        $("#personalmenu>ul>li>.underline").css("float", "left");
    }

    $(".circle").each(function(){
        var size = getRndInteger(10, 300);
        var x = getRndInteger(0, 100);
        var y = getRndInteger(0, 100);
        $(this).css("width", size);
        $(this).css("height", size);
        $(this).css("left", x + "%");
        $(this).css("top", y + "%");
        circleY.push(y);
    });

    var containerheight = $(document).height() / 3;
    var startScroll = $(document).scrollTop();
    if(startScroll < containerheight + 50 && startScroll > containerheight - 50){
        currentScrollState = 1;
    }
    else if(startScroll <= containerheight * 2 + 50 && startScroll >= containerheight * 2 - 50){
        currentScrollState = 2;
    }
});

$("#popup").click(function(e){
    if(!isMobile.any()){
        if(e.target.id == "popup"){
            $(this).css("display", "none");
        };
    }
});

$('a').click(function(e) {
    if($(this).is(".sociallink") || $(this).is(".outgoing") || $(this).is(".projectlink") || 
        $(this).is(".constructionlink") && isMobile.any()){
        return;
    }
    e.preventDefault();
    if($(this).is(".contactlink")){
        currentScrollState = 2;
        scrollAnimation("#contact");
    }
    if($(this).is(".schoollink")){
        projectState = 0;
        currentProjectIndex = 1;
        currentScrollState = 1;
        setProjectGroup(projectState);
        scrollAnimation("#projects");
    }
    if($(this).is(".personallink")){
        projectState = 1;
        currentProjectIndex = 1;
        currentScrollState = 1;
        setProjectGroup(projectState);
        scrollAnimation("#projects");
    }
    if($(this).is("#toplink")){
        currentScrollState = 0;
        scrollAnimation("#landing");
    };
    if(!isMobile.any()){
        if($(this).is(".constructionlink")){
            $("#popup").css("display", "block")
        };
        if($(this).is(".closelink")){
            $("#popup").css("display", "none")
        };
    }
});

$(".projectselector").click(function(e){
    if(($(this).parent().index()+1) != currentProjectIndex) setProject($(this).parent());
});

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    for(var i = 0; i < circleY.length; i++){
        $(".circle:eq("+i+")").css("top", circleY[i] - (scroll / 50) + "%");
    }
});

$(window).bind('mousewheel DOMMouseScroll', function(event) {
    if(!isMobile.any()){
        if (scrollReady){
            if(event.type == "mousewheel"){
                if (event.originalEvent.wheelDelta >= 0) {
                    switch(currentScrollState){
                        case 1:
                            scrollAnimation("#landing");
                            currentScrollState = 0;
                            break;
                        case 2:
                            scrollAnimation("#projects");
                            currentScrollState = 1;
                            break;
                        default:
                            break;
                    }
                }
                else {
                    switch(currentScrollState){
                        case 0:
                            scrollAnimation("#projects");
                            currentScrollState = 1;
                            break;
                        case 1:
                            scrollAnimation("#contact");
                            currentScrollState = 2;
                            break;
                        default:
                            break;
                    }
                }
            }
            else if(event.type == "DOMMouseScroll"){
                if (event.originalEvent.detail <= 0) {
                    switch(currentScrollState){
                        case 1:
                            scrollAnimation("#landing");
                            currentScrollState = 0;
                            break;
                        case 2:
                            scrollAnimation("#projects");
                            currentScrollState = 1;
                            break;
                        default:
                            break;
                    }
                }
                else {
                    switch(currentScrollState){
                        case 0:
                            scrollAnimation("#projects");
                            currentScrollState = 1;
                            break;
                        case 1:
                            scrollAnimation("#contact");
                            currentScrollState = 2;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
});

function setProjectGroup(state){
    $(".activeprojectlink").removeClass("activeprojectlink");
    $(".projecttext>a").css("font-size","2.5vh");
    if(!isMobile.any()){
        setTimeout(function(){
            $(".active").removeClass("active"); 
            $(".activeprojectlink").removeClass("activeprojectlink");
            $("#schoolprojects>div").first().css("top", "0");
            $("#personalprojects>div").first().css("top", "0");
        }, animationspeed/2);
        
        if(state == 0){
            $("#projects>.leftblock").css("background-color", "#264653");
            $("#projects>.leftblock").animate({
                left: "0",
            }, animationspeed, "swing", function() {
                
            });
            setTimeout(function(){
                $("#schoolprojects>div").first().addClass("active");
                $("#schoolmenu>ul>li").first().addClass("activeprojectlink");
                $("#schoolprojects").css("display", "block");
                $("#personalprojects").css("display", "none");
                $("#projects>.rightblock").css("border", "none");
                $("#projects>.leftblock").css("border-right", "4px solid #F6BD60");
                $(".projecttext").css("color", "#F6BD60");
                $(".projecttext>.schoollink").css("font-size", "3.5vh");
            }, animationspeed/2);
            $("#projects>.rightblock").animate({
                left: "50vw",
            }, animationspeed, "swing", function() {
                
            });
            $("#projectselection").animate({
                left: "0",
            }, animationspeed, "swing", function() {
            });
        }
        else{
            $("#projects>.leftblock").css("background-color", "#F6BD60");
            $("#projects>.leftblock").animate({
                left: "50vw",
            }, animationspeed, "swing", function() {
                
            });
            setTimeout(function(){
                $("#personalprojects>div").first().addClass("active");
                $("#personalmenu>ul>li").first().addClass("activeprojectlink");
                $("#schoolprojects").css("display", "none");
                $("#personalprojects").css("display", "block");
                $("#projects>.leftblock").css("border", "none");
                $("#projects>.rightblock").css("border-right", "4px solid #264653");
                $(".projecttext").css("color", "#264653");
                $(".projecttext>.personallink").css("font-size", "3.5vh");
            }, animationspeed/2);
            
            $("#projects>.rightblock").animate({
                left: "0",
            }, animationspeed, "swing", function() {
    
            });
            $("#projectselection").animate({
                left: "-50vw",
                }, animationspeed, "swing", function() {
            });
        }
    }
    else{
        $(".active").removeClass("active"); 
        if(state == 0){
            $("#schoolmenu").css("display", "block");
            $("#personalmenu").css("display", "none");
            $("#schoolprojects>div").first().addClass("active");
            $("#schoolmenu>ul>li").first().addClass("activeprojectlink");
            $("#schoolprojects").css("display", "block");
            $("#personalprojects").css("display", "none");
            $(".projecttext>.schoollink").css("font-size", "3.5vh");
        }
        else{
            $("#schoolmenu").css("display", "none");
            $("#personalmenu").css("display", "block");
            $("#personalprojects>div").first().addClass("active");
            $("#personalmenu>ul>li").first().addClass("activeprojectlink");
            $(".projecttext>.personallink").css("font-size", "3.5vh");
            $("#schoolprojects").css("display", "none");
            $("#personalprojects").css("display", "block");
        }
        $(".active").css("top", "0");
    }
}

function setProject(project){
    var currentActive;
    var newActive;
    var newProjectIndex = project.index()+1;
    if(currentProjectIndex != newProjectIndex && animationReady){
        animationReady = false;
        currentActive = $(".active");
        if(projectState == 0){
            newActive = $("#schoolprojects>div:nth-child("+newProjectIndex+")");
        }
        else{
            newActive = $("#personalprojects>div:nth-child("+newProjectIndex+")");
        }
        if(currentProjectIndex < newProjectIndex){
            newActive.css("top","100vh");
            newActive.addClass("newActive");
            newActive.animate({
                top: "0",
                }, animationspeed, "swing", function() {
                newActive.addClass("active");
                newActive.removeClass("newActive");
            });
            currentActive.css("top", "0");
            currentActive.animate({
                top: "-100vh",
                }, animationspeed, "swing", function() {
                currentActive.removeClass("active");
                animationReady = true;
            });
        }
        if(currentProjectIndex > newProjectIndex){
            newActive.css("top","-100vh");
            newActive.addClass("newActive");
            newActive.animate({
                top: "0",
            }, animationspeed, "swing", function() {
                newActive.addClass("active");
                newActive.removeClass("newActive");
            });
            currentActive.css("top", "0");
            currentActive.animate({
                top: "+100vh",
            }, animationspeed, "swing", function() {
                currentActive.removeClass("active");
                animationReady = true;
            });
            
        }
        $(".activeprojectlink").removeClass("activeprojectlink");
        project.addClass("activeprojectlink");

        currentProjectIndex = newProjectIndex;
    }
    if(isMobile.any()) scrollAnimation("#projectdisplay");
}

function scrollAnimation(dest){
    scrollReady = false;
    $.scrollTo(dest, scrollSpeed, {onAfter:function(){scrollReady = true}});
}

$('input').click(function(e) {
    $(this).css("border-color", "#264653");
});
$('textarea').click(function(e) {
    $(this).css("border-color", "#264653");
});

function validateForm(){
    $(".status").css("color", "#ec5766");
    var name = $("#name").val();
    if (name == "") {
        $('.status').html("Name cannot be empty");
        $("#name").css("border-color", "#ec5766");
        return false;
    }
    var email = $("#mail").val();
    if (email == "") {
        $('.status').html("Email cannot be empty");
        $("#mail").css("border-color", "#ec5766");
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            $('.status').html("Email format invalid");
            $("#mail").css("border-color", "#ec5766");
            return false;
        }
    }
    var subject =  $("#subject").val();
    if (subject == "") {
        subject = "Subject: N/A";
    }
    var message =  $('textarea').val();
    if (message == "") {
        $('.status').html("Message cannot be empty");
        $("textarea").css("border-color", "#ec5766");
        return false;
    }
    $("#name").css("border-color", "#264653");
    $("#mail").css("border-color", "#264653");
    $("textarea").css("border-color", "#264653");
    $(".status").css("color", "#264653");
    $('.status').html("aaaand...");
    var formData = {
        'name'     : name,
        'email'    : email,
        'subject'  : subject,
        'message'  : message
    };
    $.ajax({
        url : "mail.php",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR){
            $('.status').text(data.message);
            if (data.code) {
                $("textarea").attr("placeholder", "Anything else?");
                $("textarea").val("");
                $("#subject").val("");
            }
        },
        error: function (jqXHR, textStatus, errorThrown){
            $('#status').text(jqXHR);
        }
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}