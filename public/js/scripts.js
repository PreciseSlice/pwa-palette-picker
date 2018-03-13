const getRandomHex = () => {
  const randomHex =
    '#' +
    Math.random()
      .toString(16)
      .slice(-6);
  return randomHex;
};

const setColors = () => {
  $('#square-one').css({
    backgroundColor: getRandomHex()
  });
  $('#square-two').css({
    backgroundColor: getRandomHex()
  });
  $('#square-three').css({
    backgroundColor: getRandomHex()
  });
  $('#square-four').css({
    backgroundColor: getRandomHex()
  });
  $('#square-five').css({
    backgroundColor: getRandomHex()
  });
};

$('.generate-button').on('click', () => {
  setColors();
});
