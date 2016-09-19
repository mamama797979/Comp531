window.onload = function() {
    var logoutBtn = document.getElementById("Logoutbutton")
    logoutBtn.onclick = function() {
        window.location = "index.html"
    }
    
    var profileBtn = document.getElementById("Profilebutton")
    profileBtn.onclick = function() {
        window.location = "profile.html"
    }
}