const doc = $(document);
const generateButton = $('.generate-button');
const mainColorSquares = $('.main-color-squares');
const savePaletteBtn = $('.save-palette-button');
const saveProjectBtn = $('.save-project-button');
const documentWindow = $(window);

const getRandomHex = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(-6)
  );
};

const setColors = () => {
  for (let i = 0; i < 5; i++) {
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

documentWindow.on('load', setColors);

generateButton.on('click', () => {
  setColors();
});

doc.keydown(event => {
  const focused = document.activeElement.tagName === 'INPUT';
  if (event.which === 32 && !focused) {
    event.preventDefault();
    setColors();
  }
});

mainColorSquares.on('click', event => {
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

savePaletteBtn.on('click', event => {
  event.preventDefault();
  const hexArray = $('.main-color-squares h3')
  .text()
  .match(/.{7}/g);

  console.log(hexArray);
  //console.log({colorOne: hexArray[0]});
  const paletteName = $('.generate-inputs input').val();
});

saveProjectBtn.on('click', event => {
  event.preventDefault();
  const projectName = $('.new-project-container input').val();
});
