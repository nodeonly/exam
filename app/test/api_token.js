var request = require('supertest');
var app = require('../app');

describe('GET /tokens', function(){
  it('respond with json', function(done){
    request(app)
      .get('/tokens')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
})