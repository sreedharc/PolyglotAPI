var neo4j = require('neo4j');
var express = require('express');

var router = express.Router();

var db = new neo4j.GraphDatabase({
  // Specify database info via environment variables
  url: process.env['NEO4J_URL'] || process.env['GRAPHENEDB_URL'],
  auth: process.env['NEO4J_AUTH'],
});

/* GET meanings for a given word. */
router.get('/:word', function(req, res, next) {

  //console.log("Looking for " + req.params.word);

  //var query = 'MATCH (w:Word { text: "' + req.params.word + '" })-[r:USED_IN]->(s) RETURN s.text as usage, r.meaning as meaning;'
  var query = process.env['CQL_GET_MEANINGS_FOR_WORD_PRE'] + req.params.word + process.env['CQL_GET_MEANINGS_FOR_WORD_POST'];

  //console.log('Query is ' + query);

  db.cypher({
    query: query,
  }, function (err, results) {
    if (err) {
      console.log("RESULTS: " + JSON.stringify(err));
      res.json(err);
    } else {
      console.log("RESULTS: " + JSON.stringify(results));
      res.json(results);
    }
  });
});

module.exports = router;
