const btn = document.querySelector('.btn');
const out1 = document.getElementById('out1');
const out2 = document.getElementById('out2');


btn.addEventListener('click', () => {
out1.textContent = 'Updated Value: ' + Math.floor(Math.random() * 100);
out2.textContent = 'Status OK';
});