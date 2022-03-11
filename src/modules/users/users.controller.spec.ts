import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceMock } from './users-service-mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('ProductController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useClass: UsersServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    })
      .overrideProvider(UsersService)
      .useClass(UsersServiceMock)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a user', async () => {
    const mockedUser = {
      name: 'Santiaguito testiando',
    };
    expect(await controller.createUser(mockedUser)).toEqual({
      id: expect.any(Number),
      ...mockedUser,
    });
  });
  it('shoud update an user', async () => {
    const updateUser = {
      name: 'santiaguito test 2',
    };
    const userId = 1;

    expect(await controller.updateUser(userId, updateUser)).toEqual({
      id: userId,
      ...updateUser,
    });
    const updateSpy = jest.spyOn(service, 'updateUser');
    controller.updateUser(userId, updateUser);
    expect(updateSpy).toHaveBeenCalledWith(userId, updateUser);
  });
});
