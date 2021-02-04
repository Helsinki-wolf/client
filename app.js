
let baseUrl = 'http://localhost:3000'



$(document).ready(function(){
    console.log('ready')

    defaultLogout()

    if(localStorage.getItem('token')){
        defaultHome()
    }

});


function defaultLogout(){
    $("#loginForm").show()
    $("#registerForm").hide()
    $("#mainMenu").hide()
    $("#loginError").hide()
    $("#loginNotif").hide()
    $("#registerError").hide()
    $("#logout").hide()

    $("#mainMenu").hide()
    $("#menuWelcome").hide()
    $("#artHarvard").hide()
}

function defaultHome(){
    $("#loginForm").hide()
    $("#loginError").hide()
    $("#registerForm").hide()
    $("#registerError").hide()
    $("#logout").show()

    $("#mainMenu").show()
    $("#menuWelcome").show()
    $("#artHarvard").hide()
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

    $.ajax({
        url: baseUrl+'/register',
        method: 'post',
        data: {
            name: $("#registerName").val(),
            email: $("#registerEmail").val(),
            password: $("#registerPassword").val()
        }
    })
    .done((result)=>{
        
        $("#loginForm").show()
        $("#registerForm").hide()

        $("#loginNotifMessage").text(`Hi ${result.name}, account anda telah dibuat`)
        $("#loginNotif").show()

        setTimeout(() => {
            $("#loginNotif").hide()
        }, 3000);
    })
    .fail((err)=>{
        console.log(err.message)
        $("#registerError").show()
        $("#registerErrorMessage").text(JSON.stringify(err))
    })


;
})


$("#login").click((e)=>{
    e.preventDefault()


    $.ajax({
        url: baseUrl+'/login',
        method: 'post',
        data: {
            email: $("#loginEmail").val(),
            password: $("#loginPassword").val()
        }
    })
    .done((result)=>{
        console.log(result)

        localStorage.setItem('token', result.access_token)
        
        defaultHome()
    })
    .fail((err)=>{
        console.log(err.message)
        $("#registerError").show()
        $("#registerErrorMessage").text(JSON.stringify(err))
    })

})

$("#logout").click(()=>{
    console.log('logout')

    localStorage.removeItem('token')
    defaultLogout()
})

$("#publicApiArt").click(()=>{

    loadArts(1)

})


function loadArts(pageNum){
    $("#mainMenu").hide()
    $("#artHarvard").show()


    $("#arts").empty()
    $("#arts").append(`
        <div class="ui segment">
            <div class="ui active inverted dimmer">
            <div class="ui large text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
    `)

    $.ajax({
        url: `${baseUrl}/harvard/${pageNum}`,
        method: 'GET'
    })
    .done((result)=>{
        console.log(result)

        $("#arts").empty()

        result.records.forEach(art => {
            $("#arts").append(`
            <div class="ui card">
                <div class="image">
                <img src="${art.primaryimageurl}" onError="this.onerror=null;this.src='https://s3.amazonaws.com/speedsport-news/speedsport-news/wp-content/uploads/2018/07/01082232/image-not-found.png';">
                </div>
                <div class="content">
                <a class="header">${art.title}</a>
                <div class="meta">
                    <span class="date">${art.dated}</span>
                </div>
                <div class="description">
                    ${art.creditline}
                </div>
                </div>
                <div class="extra content">
                <a>
                    <i class="user icon"></i>
                    ${art.division}
                </a>
                </div>
            </div>
            `)

        })

        $("#arts").append(`
        <div id="artHarvardBtn" style="margin: 60px auto 30px; text-align:center; width: 100%;">
            <button onclick="defaultHome()" class="ui basic button">
            <i class="icon user"></i>
                Back to Menu
            </button>
            <button class="ui right labeled icon button" onclick="loadArts(${pageNum+1})">
            <i class="right arrow icon"></i>
                Next
            </button>
        </div>
        `)

    })
    .fail((err)=>{
        console.log(err)
    })
}














// GOOGLE

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}