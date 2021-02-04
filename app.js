
let baseUrl = 'http://localhost:3000'



$(document).ready(function(){
    console.log('ready')

    defaultLogout()

    if(localStorage.getItem('token')){
        Auth()
    }

});

function defaultLogout(){
    $("#loginForm").show()
    $("#registerForm").hide()
    $("#mainMenu").hide()
    $("#loginError").hide()
    $("#loginNotif").hide()
    $("#registerError").hide()

    $("#mainMenu").hide()
    $("#menuWelcome").hide()
}

function defaultHome(){
    $("#loginForm").hide()
    $("#loginError").hide()
    $("#registerForm").hide()
    $("#registerError").hide()

    $("#mainMenu").show()
    $("#menuWelcome").show()
}

$("#toRegister").click(()=>{
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#toLogin").click(()=>{
    $("#loginForm").show()
    $("#registerForm").hide()
})

$("#register").click((e)=>{
    e.preventDefault()


    // register succeed

    $("#loginForm").show()
    $("#registerForm").hide()

    $("#loginNotifMessage").text('Account telah dibuat, mohon Log In untuk masuk')
    $("#loginNotif").show()

    setTimeout(() => {
        $("#loginNotif").hide()
    }, 3000);
;
})


$("#login").click((e)=>{
    e.preventDefault()


    // login succeed
    defaultHome()
})

