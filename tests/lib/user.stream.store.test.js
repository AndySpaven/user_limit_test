/* eslint no-unused-expressions: 0 */
import chai from 'chai';
import { beforeEach, describe, it } from 'mocha';
import DB from '../../src/lib/user.stream.store';

const { expect } = chai;

chai.should();

let db;
const userShouldNotExist = name => expect(db.findUser(name)).to.be.null;
const userShouldExist = name => expect(db.findUser(name)).not.to.be.null;

describe('User Stream Store', () => {
  beforeEach(() => {
    db = DB();
  });

  describe('purge', () => {
    it('should reset the database', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'bob', id: '123' });
      db.purge();
      userShouldNotExist('alice');
      userShouldNotExist('bob');
    });
  });

  describe('findUser', () => {
    it('should return an empty array for a non existant user', () => {
      userShouldNotExist('bob');
    });
  });

  describe('addStreamToUser', () => {
    it('should create a user record if none exist and include the id', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.findUser('alice').should.eql(['123']);
      userShouldNotExist('bob');
    });
    it('should add streams to an existing user record', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'alice', id: '234' });
      db.findUser('alice').should.eql(['123', '234']);
    });
    it('should create a second item for a user record if the user adds a stream a second time', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.findUser('alice').should.eql(['123', '123']);
      userShouldNotExist('bob');
    });
  });

  describe('removeStreamFromUser', () => {
    it('should remove an id from the given user only', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'alice', id: '234' });
      db.addStreamToUser({ name: 'alice', id: '345' });
      db.addStreamToUser({ name: 'bob', id: '123' });

      db.removeStreamFromUser({ name: 'alice', id: '123' });

      db.findUser('alice').should.eql(['234', '345']);
      userShouldExist('bob');
    });

    it('should remove the user from the DB if the id removed is the last one', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'bob', id: '123' });
      db.removeStreamFromUser({ name: 'alice', id: '123' });
      userShouldNotExist('alice');
    });
    it('should remove only one item if that id is being streamed twice or more', () => {
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.addStreamToUser({ name: 'alice', id: '123' });
      db.removeStreamFromUser({ name: 'alice', id: '123' });
      db.findUser('alice').should.eql(['123']);
    });
  });
});
