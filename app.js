
let baseUrl = 'http://localhost:3000'



$(document).ready(function () {
    console.log('ready')

    defaultLogout()

    if (localStorage.getItem('token')) {
        Auth()
    }

});

function defaultLogout() {
    $("#loginForm").show()
    $("#registerForm").hide()
    $("#mainMenu").hide()
    $("#loginError").hide()
    $("#loginNotif").hide()
    $("#registerError").hide()

    $("#mainMenu").hide()
    $("#menuWelcome").hide()
}

function defaultHome() {
    $("#loginForm").hide()
    $("#loginError").hide()
    $("#registerForm").hide()
    $("#registerError").hide()

    $("#mainMenu").show()
    $("#menuWelcome").show()
}

$("#toRegister").click(() => {
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#toLogin").click(() => {
    $("#loginForm").show()
    $("#registerForm").hide()
})

$("#register").click((e) => {
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


$("#login").click((e) => {
    e.preventDefault()


    // login succeed
    defaultHome()
})

//FUNCTION GOOGLE SIGN IN
function onSignIn(googleUser) {
    var id_token = googleUSer.getAuthResponse().id_token
    console.log(id_token);

    $.ajax({
        url: baseUrl + 'user/googlelogin',
        method: 'POST',
        data: {
            googleToken: id_token
        }
    })
        .done((response) => {
            localStorage.setItem('acces_token', response.access_token)
            auth()
        })
        .fail((err) => {
            console.log(err);
        })
}

function login() {
    const email = $('#emailInput').val()
    const password = $('#passwordInput').val()
    $.ajax({
        url: baseUrl + 'user/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem('access_token', response.acces_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
        .always(_ => {
            $('#loginForm').trigger('reset')
        })
}

function logout() {
    localStorage.removeItem('access_token')
    auth()
}