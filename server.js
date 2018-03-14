const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.use(bodyParser.json());

app.locals.projects = [{ projectId: 1, projectName: 'first project' }];
app.locals.palettes = [
  {
    project_id: 1,
    palette_id: 1,
    palette_name: 'pallet one',
    color_one: '#848f5b',
    color_two: '#21fe01',
    color_three: '#76789c',
    color_four: '#6c63d3',
    color_five: '#f0f759'
  },
  {
    project_id: 1,
    palette_id: 2,
    palette_name: 'pallet two',
    color_one: '#847f5c',
    color_two: '#51fe21',
    color_three: '#96285c',
    color_four: '#1c66d3',
    color_five: '#f2f621'
  }
];

app.use(express.static('public'));

app.listen(app.get('port'), () => {
  console.log(
    `${app.locals.title} sever is running on port ${app.get('port')}.`
  );
});

app.get('/api/v1/projects/:projectId', (request, response) => {
  const { projectId } = request.params;
  const requestId = parseInt(projectId);
  const project = app.locals.projects.filter(project => project.projectId === requestId)
  const palette = app.locals.palettes.filter(palette => palette.projectId === requestId);

  if (project && palette) {
    return response.status(200).json({project, palette});
  } else {
    return response.sendStatus(404);
  }
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const requestId = parseInt(id);
  const palette = app.locals.palettes.filter(palette => palette.paletteId === requestId);

  if (palette) {
    return response.status(200).json(palette);
  } else {
    return response.sendStatus(404);
  }
});

app.post('/api/v1/projects/', (request, response) => {
  const { paletteName, projectName, colors } = request.body;
  const projectId = app.locals.projects.length + 1;
  const paletteId = app.locals.palettes.length + 1;

  if (projectName) {
    app.locals.projects.push({ projectId, projectName });
    app.locals.palettes.push({ paletteName, colors })
    response.status(201).json({ projectId, paletteId, projectName, colors });
  } else {
    return response.status(422).send({
      error: 'No name property provided'
    });
  }
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const requestId = parseInt(id);

  if (requestId) {
    const itemToDelete = app.locals.palettes.find( palette => palette.paletteId === requestId)
    const index = app.locals.palettes.indexOf(itemToDelete);
    console.log(index);
    app.locals.palettes.slice(index, 1);
    return response.status(202).json(itemToDelete);
  } else {
    return response.status(422).send({
      error: 'No paletteId property provided'
    });
  }
});
