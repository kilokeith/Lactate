
var should  = require('should');
var Lactate = require('../lib/lactate');
var http    = require('./utils/http_utils');
var files   = require('./utils/get_files');

describe('Custom Response Headers', function() {

  const DIR = __dirname + '/files/';

  afterEach(http.stopServer);

  describe('#header(string, string)', function() {
    const dir = Lactate.dir(DIR, { headers: { testk: 'testv' } });
    const file = 'index.html';
    const size = files[file];
    const url = '/' + file;

    it('Should have test header', function(done) {
      http.server(dir.serve.bind(dir));
      http.client(url, function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('testk', 'testv');
        done();
      })
    })
  })
  
  describe('#header(string, function)', function() {
    const dir = Lactate.dir(DIR, { from:'files' });
    const file = 'index.html';
    const size = files[file];
    const url = '/files/' + file;

    dir.header('testk', function(req, res) {
      return 'testv';
    });

    it('Should have test header', function(done) {
      http.server(dir.serve.bind(dir));
      http.client(url, function(err, res, data) {
        should.not.exist(err);
        should.exist(res);
        should.exist(data);
        res.headers.should.have.property('testk', 'testv');
        done();
      })
    })
  })

})

