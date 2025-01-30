// Takes care of displaying the shortened urls on screen 

const linksOutput = document.getElementById('links-output');
const statisticsSection = document.getElementById('statistics');

const displayUrlHistory = () =>
{
    const urlHistory = JSON.parse(localStorage.getItem('urlHistory')) || [];

    linksOutput.innerHTML = '';

    urlHistory.forEach(urlObject =>
    {
        const linkElement = document.createElement('div');
        linkElement.classList.add('shortened-link-item');

        const originalLinkContainer = document.createElement('div');
        originalLinkContainer.classList.add('original-link-container');

        const shortenedLinkContainer = document.createElement('div');
        shortenedLinkContainer.classList.add('shortened-link-container');

        const originalLink = document.createElement('a');
        originalLink.classList.add('original-link');

        const cleanOriginalLink = urlObject['originalUrl'].replace(/^https?:\/\//i, '');
        
        originalLink.href = urlObject['originalUrl'];
        originalLink.target = '_blank';
        originalLink.textContent = cleanOriginalLink;;

        const shortenedLink = document.createElement('a');
        shortenedLink.classList.add('shortened-link');
        shortenedLink.href = urlObject['shortenedUrl'];
        shortenedLink.target = '_blank';
        shortenedLink.textContent = urlObject['shortenedUrl'];

        const copyButton = document.createElement('button');
        copyButton.classList.add('copy-button');
        copyButton.textContent = 'Copy';
        copyButton.dataset.url = urlObject['shortenedUrl'];

        originalLinkContainer.appendChild(originalLink);
        shortenedLinkContainer.appendChild(shortenedLink);
        shortenedLinkContainer.appendChild(copyButton);

        linkElement.appendChild(originalLinkContainer);
        linkElement.appendChild(shortenedLinkContainer);

        linksOutput.appendChild(linkElement);
    });

    createCopyButtons(document.querySelectorAll('.copy-button'));

    const numberUrls = urlHistory.lenght;

    updatePadding(numberUrls, statisticsSection, linksOutput);
    window.addEventListener('resize', () => updatePadding(numberUrls, statisticsSection, linksOutput));
};
