const signInBtn = document.getElementById('sign-in-btn');

signInBtn.addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        
        window.location.href = 'mainpage.html'; 
    } else {
        alert('please give your correct username and password!');
    }
});