// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const elasticsearch = require('elasticsearch')

module.exports = function (app) {
  return new elasticsearch.Client({
    host: 'http://LE34_CVR_I_SKYEN:33614fd2-976e-4e1a-af11-acaa0e1ec994@distribution.virk.dk',
    apiVersion: '1.7'
  })
}
