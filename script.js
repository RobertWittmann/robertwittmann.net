var menu_active = false;

$('#burger').click(function(){
    menu_switch(menu_active);
});

function menu_switch(active){
    if(window.matchMedia('(max-width: 767px)').matches){
        if(!active){
            console.log("check");
            $('#burger_icon').animate({  borderSpacing: 90 }, {
                step: function(now,fx) {
                  $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                  $(this).css('-moz-transform','rotate('+now+'deg)');
                  $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'fast'
            },'linear');
            menu_active = true;
            $('.menu_items').css('top', '15rem');
        }
        else{
            $('#burger_icon').animate({  borderSpacing: 0 }, {
                step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'fast'
            },'linear');
            menu_active = false;
            $('.menu_items').css('top', '-0px');
        }
    }
}


$('input').click(function(e) {
    $(this).css("border-color", "#3C448E");
});

$('textarea').click(function(e) {
    $(this).css("border-color", "#3C448E");
});


function validateForm(){
    $(".status").css("color", "#EA5257");
    var name = $("#name").val();
    if (name == "") {
        $('.status').html("Name cannot be empty");
        $("#name").css("border-color", "#EA5257");
        return false;
    }
    var email = $("#mail").val();
    if (email == "") {
        $('.status').html("Email cannot be empty");
        $("#mail").css("border-color", "#EA5257");
        return false;
    } else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            $('.status').html("Email format invalid");
            $("#mail").css("border-color", "#EA5257");
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
        $("textarea").css("border-color", "#EA5257");
        return false;
    }
    $("#name").css("border-color", "#3C448E");
    $("#mail").css("border-color", "#3C448E");
    $("textarea").css("border-color", "#3C448E");
    $(".status").css("color", "#3C448E");
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