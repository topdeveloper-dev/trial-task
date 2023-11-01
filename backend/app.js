'use strict';

const path = require('node:path');
const AutoLoad = require('@fastify/autoload');
const db = require('@fastify/mysql');

const options = {};

module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });

  fastify.register(require('@fastify/multipart'), {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 20 * 1024 * 1024, //20mb, For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
      parts: 1000, // For multipart forms, the max number of parts (fields + files)
    },
    attachFieldsToBody: true, //Add fields to body so that it can be accessed
  });

  fastify.register(db, {
    connectionString: `${process.env.DB_SERVER}://${process.env.DB_USERNAME}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;
