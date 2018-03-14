const getRandomHex = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(-6)
  );
};

const setColors = () => {
  for (let i = 1; i < 6; i++) {
    const randomColor = getRandomHex();
    const image = $(`#square-${i} img`);

    if (image[0].className === 'open') {
      $(`#square-${i}`).css({
        backgroundColor: randomColor
      });
      $(`#square-${i} h3`).text(randomColor);
    }
  }
};

$(window).on('load', setColors);

$('.generate-button').on('click', () => {
  setColors();
});

$(document).keydown(event => {
  const focused = document.activeElement.tagName === 'INPUT';
  if (event.which === 32 && !focused) {
    event.preventDefault();
    setColors();
  }
});

$('.main-color-squares').on('click', event => {
  event.preventDefault();
  const image = $(`#${event.target.id} img`);

  if (image[0].className === 'open') {
    image.attr('src', './assets/closed-padlock.svg');
    image.attr('alt', 'closed padlock');
    image.attr('class', 'closed');
  } else {
    image.attr('src', './assets/open-padlock.svg');
    image.attr('alt', 'open padlock');
    image.attr('class', 'open');
  }
});
