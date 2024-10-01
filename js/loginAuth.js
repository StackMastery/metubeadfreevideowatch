if (!localStorage.getItem("Logged")) {
    localStorage.setItem("Logged", "false");
}
let getLoginValidty = localStorage.getItem("Logged");

const preloader = document.getElementById('preloader');
const signInUpWarraper = document.querySelectorAll('.signInUpWarraper');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const signUpTabBtns = document.querySelectorAll('.signUpTabBtn');
const emailInputs = document.querySelectorAll('.email');
const passwordInputs = document.querySelectorAll('.password');
const nameInput = document.getElementById('name');

window.onload = () => {
    if (getLoginValidty === "false" && window.location.pathname !== "/auth.html") {
        window.location.href = '/auth.html';
    } else if (getLoginValidty === "true" && window.location.pathname !== "/") {
        window.location.href = '/';
    }

    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3260);    
};

signUpTabBtns.forEach((items, index) => {
    items.addEventListener("click", function() {
        index === 0 
            ? (signInUpWarraper[1].style.display = 'flex', signInUpWarraper[0].style.display = 'none')
            : (signInUpWarraper[0].style.display = 'flex', signInUpWarraper[1].style.display = 'none');
    });
});

let users = JSON.parse(localStorage.getItem("users")) || [];

signinForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const signInEmail = emailInputs[0].value;
    const signInPass = passwordInputs[0].value;
    const userEmailFilter = users.find(user => user.email === signInEmail && user.password === signInPass);
    userEmailFilter 
        ? signSucces()
        : alert('User Name And Password Is Invalid')
        signinForm.reset();
});

const signSucces = () => {
    localStorage.setItem("Logged", "true");
    window.location.href = '/';
};

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newUser = {
        id: users.length,
        name: nameInput.value,
        email: emailInputs[1].value,
        password: passwordInputs[1].value
    };
    localStorage.setItem("userId", `${newUser.id}`)
    const emailExists = users.some(user => user.email === newUser.email);
    if (emailExists) {
        alert("Email already exists");
        return;
    }
    signupForm.reset();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = '/auth.html'
});
