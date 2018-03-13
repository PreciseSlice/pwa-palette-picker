const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());
app.locals.projects = [];
app.locals.palettes = [];

app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} sever is running on port ${app.get('port')}.`
  );
});

app.get('/api/v1/projects/:id/palette', (request, response) => {
  const { id } = request.params;
  const projects = app.locals.projects.find(project => project.id === id);

  if (projects) {
    return response.status(200).json(projects);
  } else {
    return response.sendStatus(404);
  }
});

app.post('/api/v1/projects/:id/palette', (request, response) => {
  const id = Date.now();
  const { project } = request.body;

  if (project) {
    app.locals.projects.push({ id, project });
    response.status(201).json({ id, project });
  } else {
    return response.status(422).send({
      error: 'No project property provided'
    });
  }
});

app.delete('/api/v1/projects/:id/palette', (request, response) => {
  const { id } = request.params;

  if (id) {
    const index = app.locals.projects.indexOf(palette.id);
    app.locals.slice(index, 1);
  } else {
    return response.status(422).send({
      error: 'No project property provided'
    });
  }
});
