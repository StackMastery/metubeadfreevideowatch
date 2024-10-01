// Element Selector
const avtar = document.getElementById('avtar') // Avtar
const setting = document.getElementById('setting') // Setting
const logOut = document.getElementById('logOut') // Log Out
const userName = document.getElementById('userName') // userName
const account = document.getElementById('account') // Account Modal open
const userEmail = document.getElementById('userEmail') // Log Out
const userIdIaccountModalnfo = document.getElementById('accountModal') // Accoutn Info Modal
const closeAccountModal = document.getElementById('closeAccountModal') // Accoutn Modal Close Button

// LogOut 
logOut.addEventListener("click", function(){
    localStorage.setItem("Logged", "false");
    window.location.href = '/auth'
})

// geting User Info
const userId = localStorage.getItem("userId")
let getUser = users[userId]

// Avtar Icon Maker
let getUserName = getUser.name
getUserName = getUserName.trim()
getUserName = getUserName.toUpperCase() 
avtar.innerText = getUserName[0]

// Open Setting
avtar.addEventListener("click", function(){
    setting.classList.toggle('!flex')
})

// Account Modla Open
account.addEventListener("click", function(){
    userIdIaccountModalnfo.style.display = 'flex'
})
closeAccountModal.addEventListener("click", function(){
    userIdIaccountModalnfo.style.display = 'none'
})

// Setting Info
userName.innerText = `Name : ${getUser.name.trim().toUpperCase()}`
userEmail.innerText = `Email Address : ${getUser.email.trim().toLowerCase()}`

