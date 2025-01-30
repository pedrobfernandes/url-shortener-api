// Takes care of auxiliary functions

const saveUrlToHistory = (originalUrl, shortenedUrl) =>
{
    const urlObject = {originalUrl, shortenedUrl};
    let urlHistory = JSON.parse(localStorage.getItem('urlHistory')) || [];

    if (urlHistory.length > 10)
    {
        localStorage.removeItem('urlHistory');
        urlHistory = [];
    }
    
    urlHistory.push(urlObject);
    localStorage.setItem('urlHistory', JSON.stringify(urlHistory));
};

const createCopyButtons = copyButtons =>
{
    copyButtons.forEach(button =>
    {
        button.addEventListener('click', event =>
        {
            const urlToCopy = event.target.getAttribute('data-url');
            copyToClipboard(urlToCopy, button);
            button.style.backgroundColor = 'rgb(59, 48, 84)';
            button.style.color = 'rgb(255, 255, 255)';
            button.textContent = 'Copied!';
        });
    });
};

const copyToClipboard = async (url) =>
{
    try
    {
        await navigator.clipboard.writeText(url);
    }
    catch (error)
    {
        alert(`Error copying Url to clipboard: ${error}`);
    }
};

const calculateStatisticsPadding = (urls, parentContainer) =>
{
    const containerHeight = parentContainer.offsetHeight;

    // times 10 because in html we have font-size: 62.5% 
    return(urls === 0 ? 12 : (containerHeight / 10) + 8);
};


const updatePadding = (numberUrls, statisticsSection, linksOutput) =>
{
    const newPaddingTop = calculateStatisticsPadding(numberUrls, linksOutput);
    statisticsSection.style.paddingTop = `${newPaddingTop}rem`;
};
