import chai from 'chai';
import chaiHttp from 'chai-http';
import { beforeEach, describe, it } from 'mocha';
import app from '../../src/app';
import {
  startStreaming,
} from '../../src/lib/user.stream.service';
import { purge } from '../../src/lib/user.stream.store';

chai.use(chaiHttp);
chai.should();

const alice = 'alice';
const aliceAndAStream = { name: alice, id: '123' };

const aliceStartsAStream = () => startStreaming(aliceAndAStream);

describe('Stream', () => {
  describe('GET /user/:name/steam/:id', () => {
    beforeEach(() => {
      purge();
    });

    it('Should accept calls with name and id', (done) => {
      chai.request(app)
        .get('/user/alice/stream/123')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          const { user, stream, running } = res.body;
          user.should.equal('alice');
          stream.should.equal('123');
          running.should.equal(true);
          done();
        });
    });
    it('Should reject calls when the user already has 3 streams open', (done) => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();

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
