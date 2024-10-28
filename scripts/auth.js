document.getElementById("loginButton").onclick = () => {
    // Redirect to the Discord login URL
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1300474521270354000&redirect_uri=https%3A%2F%2FYOUR_NETLIFY_URL%2F.netlify%2Ffunctions%2Fauth-callback&response_type=code&scope=identify`;
};

document.getElementById("logoutButton").onclick = () => {
    // Logout user
    localStorage.removeItem("discordUser");
    location.reload();
};

async function fetchUser() {
    const user = JSON.parse(localStorage.getItem("discordUser"));
    if (user) {
        document.getElementById("login").style.display = "none";
        document.getElementById("user").style.display = "block";
        document.getElementById("userAvatar").src = user.avatar;
        document.getElementById("userName").textContent = user.username;
    } else {
        document.getElementById("login").style.display = "block";
        document.getElementById("user").style.display = "none";
    }
}

fetchUser();