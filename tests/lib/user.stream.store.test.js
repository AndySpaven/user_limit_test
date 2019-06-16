import chai from 'chai';
import { describe, it } from 'mocha';
import {
  purge,
  findUser,
  addStreamToUser,
  removeStreamFromUser,
} from '../../src/lib/user.stream.store';

const { expect } = chai;

chai.should();

const userShouldNotExist = name => expect(findUser(name)).to.be.null;
const userShouldExist = name => expect(findUser(name)).not.to.be.null;

describe('User Stream Store', () => {
  describe('purge', () => {
    it('should reset the database', () => {
      purge();
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
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      findUser('alice').should.eql(['123']);
      userShouldNotExist('bob');
    });
    it('should add streams to an existing user record', () => {
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      addStreamToUser({ name: 'alice', id: '234' });
      findUser('alice').should.eql(['123', '234']);
    });
    it('should create a second item for a user record if the user adds a stream a second time', () => {
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      addStreamToUser({ name: 'alice', id: '123' });
      findUser('alice').should.eql(['123', '123']);
      userShouldNotExist('bob');
    });
  });

  describe('removeStreamFromUser', () => {
    it('should remove an id from the given user only', () => {
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      addStreamToUser({ name: 'alice', id: '234' });
      addStreamToUser({ name: 'alice', id: '345' });
      addStreamToUser({ name: 'bob', id: '123' });

      removeStreamFromUser({ name: 'alice', id: '123' });

      findUser('alice').should.eql(['234', '345']);
      userShouldExist('bob');
    });

    it('should remove the user from the db if the id removed is the last one', () => {
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      addStreamToUser({ name: 'bob', id: '123' });
      removeStreamFromUser({ name: 'alice', id: '123' });
      userShouldNotExist('alice');
    });
    it('should remove only one item if that id is being streamed twice or more', () => {
      purge();
      addStreamToUser({ name: 'alice', id: '123' });
      addStreamToUser({ name: 'alice', id: '123' });
      removeStreamFromUser({ name: 'alice', id: '123' });
      findUser('alice').should.eql(['123']);
    });
  });
});
