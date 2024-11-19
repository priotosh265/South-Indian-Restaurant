// Switch between Sign In and Sign Up forms
function showForm(form) {
    document.getElementById('signInForm').classList.add('hidden');
    document.getElementById('signUpForm').classList.add('hidden');
    document.getElementById('signInTab').classList.remove('active');
    document.getElementById('signUpTab').classList.remove('active');

    if (form === 'signIn') {
        document.getElementById('signInForm').classList.remove('hidden');
        document.getElementById('signInTab').classList.add('active');
    } else {
        document.getElementById('signUpForm').classList.remove('hidden');
        document.getElementById('signUpTab').classList.add('active');
    }
}
// Handle Sign In
function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    if (email && password) {
        alert(`Welcome back, ${email}!`);
        // Redirect to index page
        window.location.href = "index.html"; // Replace "index.html" with the correct file path if different
    } else {
        alert('Please fill in all fields.');
    }
}


// Handle Sign Up
function handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (name && email && password && confirmPassword && address) {
        alert(`Welcome, ${name}! Your account has been created.`);
    } else {
        alert('Please fill in all fields.');
    }
}
