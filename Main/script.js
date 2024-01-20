document.addEventListener("DOMContentLoaded", function() {
    const userFullNameElement = document.getElementById("user-full-name");

    const storedUserJSON = sessionStorage.getItem('currentUser');

    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);

        // Check if fullName is available
        if (storedUser && storedUser.fullName) {
            userFullNameElement.textContent = storedUser.fullName || "Undefined";
        } else {
            // Redirect to login page and display alert
            alert("You are logged out.");
            window.location.href = '../index.html';
        }
    } else {
        // Redirect to login page if user data is not available
        window.location.href = '../index.html';
    }

    // Handle navigation and content switching
    const contentDivs = document.querySelectorAll('.content > div');
    const navbarLinks = document.querySelectorAll('.navbar .nav-link');
    const logoLink = document.querySelector('.logo');

    function showContent(selectedContent) {
        contentDivs.forEach(function (div) {
            div.style.display = div.classList.contains(selectedContent) ? 'block' : 'none';
        });
    }

    function handleNavClick(event) {
        event.preventDefault();
        const selectedContent = this.textContent.toLowerCase().replace(/\s+/g, '-') + '-container';
        showContent(selectedContent);
    }

    navbarLinks.forEach(function (link) {
        link.addEventListener('click', handleNavClick);
    });

    logoLink.addEventListener('click', function (event) {
        event.preventDefault();
        showContent('home-container');
    });
    // Show only the 'home-container' initially
    showContent('home-container');
});

function signOut() {
    
    // Clear the user data from session storage
    sessionStorage.removeItem('currentUser');
    console.log("Sign-out successful");
    console.log("Session Storage after sign-out:", sessionStorage);
    window.location.href = '../index.html';

    // Display the session storage content after clearing
}

document.getElementById("logout-link").addEventListener('click', function(event) {
    event.preventDefault();
    signOut();
});