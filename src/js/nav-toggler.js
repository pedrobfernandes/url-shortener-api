// Tales care of the mobile nav 

const toggleButton = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const authButtons = document.getElementById('auth-buttons');

const showMenu = () =>
{
    menu.classList.add('show');
    authButtons.classList.add('show');
}

const hideMenu = () =>
{
    menu.classList.remove('show');
    authButtons.classList.remove('show');
}


toggleButton.addEventListener('click', event =>
{
    event.stopPropagation();

    if (menu.classList.contains('show'))
    {
        hideMenu();
    }
    else
    {
        showMenu();
    }
});

document.addEventListener('click', event =>
{
    if (!menu.contains(event.target) && !authButtons.contains(event.target) &&
        !toggleButton.contains(event.target))
    {
        hideMenu();
    }
});
