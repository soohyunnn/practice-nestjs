import { UserFactory } from './user.factory';
import { Test } from '@nestjs/testing';
import { User } from './user';
import { EventBus } from '@nestjs/cqrs';

describe('UserFactory', () => {
  let userFactory: UserFactory;
  let eventBus: jest.Mocked<EventBus>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    eventBus = module.get(EventBus);
    userFactory = module.get(UserFactory);
  });

  describe('create', () => {
    it('should create user', () => {
      //Given  //1.

      //When  //2.
      const user = userFactory.create(
        'user-id',
        'YOUR_NAME',
        'YOUR_EMAIL@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      //Then  //3.
      const expected = new User(
        'user-id',
        'YOUR_NAME',
        'YOUR_EMAIL@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      expect(expected).toEqual(user); //4.
      expect(eventBus.publish).toBeCalledTimes(1); //5.
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute user', () => {
      //Given
      //When
      const user = userFactory.reconstitute(
        'user-id',
        'YOUR_NAME',
        'YOUR_EMAIL@gmail.com',
        'pass1234',
        'signup-verify-token',
      );
      //Then
      const expected = new User(
        'user-id',
        'YOUR_NAME',
        'YOUR_EMAIL@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      expect(expected).toEqual(user);
    });
  });
});
