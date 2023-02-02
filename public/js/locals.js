$(document).ready(function() {
    if (sessionStorage) {
        document.getElementById('formsub').addEventListener('submit', function() {
            var name = document.getElementById('user').value;
            sessionStorage.setItem('user', name);
        });
    }
})