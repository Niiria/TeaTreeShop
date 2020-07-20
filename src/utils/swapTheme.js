let theme = 0;

const swapTheme = () => {
  switch (theme) {
    case 0:
      document.documentElement.setAttribute('data-theme', 'honisie');
      theme += 1;
      break;
    case 1:
      document.documentElement.setAttribute('data-theme', 'dark');
      theme += 1;
      break;
    default:
      document.documentElement.setAttribute('data-theme', 'normal');
      theme = 0;
      break;
  }
};

export default swapTheme;
