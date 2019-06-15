import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../../src/app';

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
  describe('root', () => {
    it('Should provide the express landing page ', () => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.contain('<title>Express</title>');
        });
    });
    it('Should not leak x-powered-by header ', () => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.header.should.not.have.header('x-powered-by');
        });
    });
  });
});
