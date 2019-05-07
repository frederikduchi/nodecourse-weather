const form  = document.querySelector('form');
const search = document.querySelector('input');
form.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.error').textContent = '';
    document.querySelector('.forecast').textContent = '';
    
    fetch(`http://localhost:3000/weather?address=${search.value}`).then(response => {
    response.json().then(data => {
        if(data.error){
            document.querySelector('.error').textContent = data.error;
        }else{
            document.querySelector('.forecast').innerHTML = `${data.forecast} (${data.location})`;
        }
    });
});
});