var request = require('supertest');
var app = require('../app');

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();



describe('GET /tokens', function(){
  it('respond with json', function(done){
    request(app)
      .get('/tokens')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
				
				should.not.exist(err);
				

				var logger = require('../utils').logger;

				console.log(logger);
				
				logger.log(res.body.data);
				
				should.exist(res.body.data)
				res.body.status.code.should.be.equal(0)
				
				res.status.should.be.equal(200);
				
        done()
      });
  })
})