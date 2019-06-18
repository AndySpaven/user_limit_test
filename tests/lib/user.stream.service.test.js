/* eslint no-unused-expressions: 0 */
import chai from 'chai';
import { beforeEach, describe, it } from 'mocha';
import DB from '../../src/lib/user.stream.store';
import Service from '../../src/lib/user.stream.service';

const { expect } = chai;

chai.should();

const alice = 'alice';
const aliceAndAStream = { name: alice, id: '123' };

let db;
let service;

const aliceStartsAStream = () => service.startStreaming(aliceAndAStream);
const aliceClosesAStream = () => service.stopStreaming(aliceAndAStream);

describe('User Stream Service', () => {
  beforeEach(() => {
    db = DB();
    service = Service(db);
  });

  describe('canOpenMoreStreams', () => {
    it('should allow a new user to open more streams', () => {
      expect(service.canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 1 stream to open more streams', () => {
      aliceStartsAStream();
      expect(service.canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 2 streams to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      expect(service.canOpenMoreStreams(alice)).to.be.true;
    });
    it('should not allow a user with 3 streams to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      expect(service.canOpenMoreStreams(alice)).to.be.false;
    });
    it('should allow a user with 3 streams, who closes one, to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      aliceClosesAStream();
      expect(service.canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 3 streams, who closes them all, to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      aliceClosesAStream();
      aliceClosesAStream();
      aliceClosesAStream();
      expect(service.canOpenMoreStreams(alice)).to.be.true;
    });
  });
});
