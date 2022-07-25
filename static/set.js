const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('X-CSRFToken');

async function signup_educator() {
    document.getElementById('reg').disabled = true
    let response = await fetch('/signup/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'f_name': document.getElementById('f_name').value,
            'l_name': ' ',
            'user_name': document.getElementById('u_name').value,
            'mmail': document.getElementById('mmail').value,
            'pass': document.getElementById('pass').value,
            'pass1': document.getElementById('pass1').value,
            'type': 'Educator',
        })
    })
    if (response.ok) {
        let json = await response.json();
        let message = json["message"]
        if(message=='Success'){
            document.getElementById('f_name').innerText =""
            document.getElementById('u_name').innerText = ""
            document.getElementById('mmail').innerText = ""
            document.getElementById('pass').innerText = "" 
            document.getElementById('pass1').innerText = ""
            document.getElementById('usertype').innerHTML = "Successfully registered!! Please Login"
            document.getElementById('reg').disabled = false
        }
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}


async function login_educator() {
    let response = await fetch('/login/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'username': document.getElementById('ul_name').value,
            'password': document.getElementById('lpass').value,
            'type': 'Educator'
        })
    })
    if (response.ok) {
        let json = await response.json();
        let message = json["message"]
        console.log(message)
        if(message=='success'){
            window.location.replace('/');
        }
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}


async function user_signup() {
    document.getElementById('reg').disabled = true
    let response = await fetch('/signup/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'f_name': document.getElementById('f_name').value,
            'l_name': document.getElementById('l_name').value,
            'user_name': document.getElementById('u_name').value,
            'mmail': document.getElementById('mmail').value,
            'pass': document.getElementById('pass').value,
            'pass1': document.getElementById('pass1').value,
            'type': 'User',
        })
    })
    if (response.ok) {
        let json = await response.json();
        let message = json["message"]
        if (message == 'Success') {
            document.getElementById('f_name').innerText =""
            document.getElementById('l_name').innerText = ""
            document.getElementById('u_name').innerText = ""
            document.getElementById('mmail').innerText = ""
            document.getElementById('pass').innerText = "" 
            document.getElementById('pass1').innerText = ""
            document.getElementById('usertype').innerHTML = "Successfully registered!! Please Login"
            document.getElementById('reg').disabled = false
        }
        else{
            document.getElementById('usertype').innerHTML = message
        }
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}

async function user_login() {
    let response = await fetch('/login/', {
        credentials: 'include',
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            'username': document.getElementById('ul_name').value,
            'password': document.getElementById('lpass').value,
            'type': 'User'
        })
    })
    if (response.ok) {
        let json = await response.json();
        let message = json["message"]
        if(message=='success'){
            window.location.replace('/');
        }
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}

