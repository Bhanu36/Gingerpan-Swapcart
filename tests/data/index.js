/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// const should = chai.should();
chai.use(chaiHttp);
const server = require('../../app');

// Our parent block
describe('Podcast', () => {
  describe('/GET media', () => {
    it('it should GET all the podcast', (done) => {
      chai.request(server)
        .get('/get_data?success=1')
        // .send({'success': true})
        .end((_err, res) => {
          // console.log(res.body.success)
          (res).should.have.status(200);
          (res.body).should.be.a('object');
          (res.body.success).should.be.eql(true);
          done();
        });
    });
  });
  describe('/POST message', () => {
    it('it should Post data and get a message', (done) => {
      chai.request(server)
        .post('/get_data')
        .send({ success: 1 })
        .end((_err, res) => {
          (res).should.have.status(200);
          (res.body).should.be.a('object');
          done();
        });
    });
  });
});
