import chai from 'chai';
import chaiHttp from 'chai-http';
import { beforeEach, describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

function checkStartResultIsOkay(res) {
  res.should.have.status(200);
  res.body.should.be.a('object');
  const { user, stream, running } = res.body;
  user.should.equal('alice');
  stream.should.equal('123');
  running.should.equal(true);
}

describe('Stream', () => {
  describe('GET /user/:name/steam/:id', () => {
    beforeEach(() => {
    });

    it('Should accept calls with name and id', (done) => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          checkStartResultIsOkay(res);
          done();
        });
    });
    it('Should accept another call with name and id', (done) => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          checkStartResultIsOkay(res);
          done();
        });
    });
    it('Should accept a third call with name and id', (done) => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          checkStartResultIsOkay(res);
          done();
        });
    });
    it('Should reject calls when the user already has 3 streams open', (done) => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          const { user, error } = res.body;
          user.should.equal('alice');
          error.should.contain('cannot open another stream');
          done();
        });
    });
  });
  describe('DELETE /user/:name/steam/:id', () => {
    it('Should accept calls with name and id', (done) => {
      chai.request(app)
        .delete('/user/alice/stream/123')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
