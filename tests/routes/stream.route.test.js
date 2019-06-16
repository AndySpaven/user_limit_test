import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('Stream', () => {
  describe('GET /user/:name/steam/:id', () => {
    it('Should accept calls with name and id', () => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          const { user, stream, running } = res.body;
          user.should.equal('alice');
          stream.should.equal('123');
          running.should.equal(true);
        });
    });
  });
});
