const navLinks = document.querySelectorAll('.nav-link');
const sub = document.querySelector('.submenu');
const navbar = document.querySelector('.navbar');

const submenu = () => {
  navLinks.forEach((link) => {
    link.addEventListener('mouseover', (e) => {
      {
        const elementText = e.currentTarget.textContent;
        if (elementText === 'Shop') {
          const element = e.currentTarget.getBoundingClientRect();
          const elementHeight = element.height;
          const center = (element.left + element.right - 240) / 2;
          const bottom = element.bottom - 3;
          sub.classList.add('show');
          sub.style.left = `${center}px`;
          sub.style.top = `${bottom}px`;
        } else {
          sub.classList.remove('show');
        }
      }
    });
  });
  navbar.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('nav-link')) {
      sub.classList.remove('show');
    }
  });
};

export default submenu;
