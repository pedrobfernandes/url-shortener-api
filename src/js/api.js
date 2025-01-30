// API code (requisition) 

const API_URL = 'https://spoo.me/';

const getShortenUrl = async (toShorten, errorMessage) =>
{
    const validUrl = isValidUrl(toShorten);
    
    if (!validUrl)
    {
        errorMessage.textContent = 'Please enter a valid URL';
        return;
    }
    
    const data = new URLSearchParams();
    data.append('url', validUrl);
    
    try
    {
        const response = await fetch(API_URL,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: data
        });

        if (response.ok)
        {
            const result = await response.json();

            if (result['short_url'])
            {
                saveUrlToHistory(validUrl, result['short_url']);
                displayUrlHistory();
            }
            else
            {
                throw new Error('API response did not include a shortened URL.');
            }
        }
        else
        {
            const errorDetails = await response.text()
            throw new Error(`Failed to shorten URL. Status: ${response.status}, Details: ${errorDetails}`);
        }
    }
    catch (error)
    {
        console.error('Error: ', error.message || error);
        errorMessage.textContent = 'Error: Invalid URL';
    }
};


const isValidUrl = url =>
{
    if (!/^https?:\/\//i.test(url))
    {
        url = `https://${url}`;
    }

    try
    {
        new URL(url);
        return(url);
    }
    catch (error)
    {
        return(false);
    }
}
