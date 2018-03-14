const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());
app.locals.projects = [{ id: 1, name: 'first project' }];
app.locals.palettes = [
  {
    projectId: 1,
    id: 3,
    name: 'pallet name',
    colors: ['#848f5b', '#21fe01', '#76789c', '#6c63d3', '#f0f759']
  }
];

app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} sever is running on port ${app.get('port')}.`
  );
});

app.get('/api/v1/projects/:id/palette', (request, response) => {
  const { id } = request.params;
  const requestID = parseInt(id)
  const palette = app.locals.palettes.filter(palette => palette.projectId === requestID);

  if (palette) {
    return response.status(200).json(palette);
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
