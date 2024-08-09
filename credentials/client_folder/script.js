document.getElementById('create-cookie').addEventListener('click', () => {
    fetch("http://localhost:3000/set-cookie", {
        method: 'POST',
        credentials:'include'
    });
});

document.getElementById('show-cookie').addEventListener('click', () => {
    fetch("http://localhost:3000/send-cookie", {
        method: 'GET',
        credentials:'include'
    })
});