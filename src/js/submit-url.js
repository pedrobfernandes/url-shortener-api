// Takes care of the submit url button 

const submitButton = document.getElementById('submit-button');
const urlInput = document.getElementById('shorten-url-input');
const errorMessage = document.getElementById('error-message');


urlInput.addEventListener('keydown', event =>
{
    if (event.key === 'Enter')
    {
        event.preventDefault();
        submitButton.click();
    }
});

submitButton.addEventListener('click', () =>
{
    errorMessage.textContent = '';
    
    if (urlInput.value.trim() === '')
    {
        errorMessage.textContent = 'Please enter a link'
        displayUrlHistory();
    }
    else
    {
        submitButton.disabled = true;
        submitButton.textContent = 'Shortening...';

        getShortenUrl(urlInput.value.trim(), errorMessage);
        
        urlInput.value = '';

        submitButton.disabled = false;
        submitButton.textContent = 'Shorten It!'
    }
});
