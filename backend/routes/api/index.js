async function routes(fastify, options) {
  // Handle POST request Add Data

  fastify.post('/create', (request, reply) => {
    const data = {
      lat: request.body.latitude,
      lng: request.body.longitude,
      notes: `DMS Latitude: ${request.body.dmslatitude}, DMS Longitude: ${request.body.dmslongitude}`,
    };

    fastify.mysql.query(`INSERT INTO coords_data SET ?`, data, function onResult(err, result) {
      reply.send(err || result);
    });
  });

  //Handle GET request Get Data

  fastify.get('/getAll', function (req, reply) {
    fastify.mysql.query(`SELECT * FROM coords_data`, function onResult(err, result) {
      reply.send(err || result);
    });
  });

  //Handle PUT request to Update Data
  fastify.put('/update/:id', function (req, reply) {
    const { id } = req.params;

    const data = {
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      notes: `DMS Latitude: ${request.body.dmslatitude}, DMS Longitude: ${request.body.dmslongitude}`,
    };

    fastify.mysql.query(`UPDATE coords_data SET ? WHERE id = ? LIMIT 1`, [data, id], function onResult(err, result) {
      reply.send(err || result);
    });
  });

  //Handle Delete request Delete Data

  fastify.delete('/delete/:id', function (req, reply) {
    const { id } = req.params;
    fastify.mysql.query(`DELETE FROM coords_data WHERE id = ?`, id, function onResult(err, result) {
      reply.send(err || result);
    });
  });
}

module.exports = routes;
