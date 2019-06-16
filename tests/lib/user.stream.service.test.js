import chai from 'chai';
import { beforeEach, describe, it } from 'mocha';
import {
  canOpenMoreStreams, startStreaming, stopStreaming,
  // startStreaming,
  // stopStreaming,
} from '../../src/lib/user.stream.service';
import { purge } from '../../src/lib/user.stream.store';

const { expect } = chai;

chai.should();

const alice = 'alice';
const aliceAndAStream = { name: alice, id: '123' };

const aliceStartsAStream = () => startStreaming(aliceAndAStream);
const aliceClosesAStream = () => stopStreaming(aliceAndAStream);

describe('User Stream Service', () => {
  beforeEach(() => {
    purge();
  });

  describe('canOpenMoreStreams', () => {
    it('should allow a new user to open more streams', () => {
      expect(canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 1 stream to open more streams', () => {
      aliceStartsAStream();
      expect(canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 2 streams to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      expect(canOpenMoreStreams(alice)).to.be.true;
    });
    it('should not allow a user with 3 streams to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      expect(canOpenMoreStreams(alice)).to.be.false;
    });
    it('should allow a user with 3 streams, who closes one, to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      aliceClosesAStream();
      expect(canOpenMoreStreams(alice)).to.be.true;
    });
    it('should allow a user with 3 streams, who closes them all, to open more streams', () => {
      aliceStartsAStream();
      aliceStartsAStream();
      aliceStartsAStream();
      aliceClosesAStream();
      aliceClosesAStream();
      aliceClosesAStream();
      expect(canOpenMoreStreams(alice)).to.be.true;
    });
  });
});
