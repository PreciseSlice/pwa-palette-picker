const doc = $(document);
const generateButton = $('.generate-button');
const mainColorSquares = $('.main-color-squares');
const savePaletteBtn = $('.save-palette-button');
const saveProjectBtn = $('.save-project-button');
const documentWindow = $(window);
const select = $('.projects-select');
const hexCode = $('.main-color-squares h3');
const paletteNameInput = $('.generate-inputs input');
const projectNameInput = $('.new-project-container input');

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

const fetchFromApi = async url => {
  const initialFetch = await fetch(url);

  return await validateResponce(initialFetch);
};

const validateResponce = initialFetch => {
  if (initialFetch.status <= 200) {
    return initialFetch.json();
  } else {
    throw new Error('Status code > 200');
  }
};

const getProjects = async () => {
  const projects = await fetchFromApi('http://localhost:3000/api/v1/projects/');

  projects.forEach(project => {
    select.append($(`<option value="${project.id}" >${project.name}</option>`));
  });
};

documentWindow.on('load', getProjects);

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
  const hexArray = hexCode.text().match(/.{7}/g);
  const paletteName = paletteNameInput.val();
  const id = select.val();

  //console.log({colorOne: hexArray[0]});
});

saveProjectBtn.on('click', event => {
  event.preventDefault();
  const projectName = projectNameInput.val();
});
