import { Test, TestingModule } from '@nestjs/testing';
import { PeriodGroupsController } from './period-groups.controller';

describe('PeriodGroupsController', () => {
  let controller: PeriodGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriodGroupsController],
    }).compile();

    controller = module.get<PeriodGroupsController>(PeriodGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
