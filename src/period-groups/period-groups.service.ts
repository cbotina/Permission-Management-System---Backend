import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { Group } from 'src/groups/entities/group.entity';
import { Period } from 'src/periods/entities/period.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeriodGroupsService {
  constructor(
    @InjectRepository(Period)
    private readonly periodsRepository: Repository<Period>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async getPeriodGroups(
    options: IPaginationOptions,
    periodId: number,
    search?: string,
  ): Promise<Pagination<Group>> {
    const queryBuilder = this.groupsRepository.createQueryBuilder('g');
    queryBuilder.where('g.periodId = :periodId', { periodId });
    queryBuilder.orderBy('g.name', 'ASC');
    if (search) {
      queryBuilder.where('g.name LIKE :search', { search: `%${search}%` });
    }

    return paginate<Group>(queryBuilder, options);
  }

  async addGroupToPeriod(createGroupDto: CreateGroupDto, periodId: number) {
    const period = await this.periodsRepository.findOneByOrFail({
      id: periodId,
    });

    return this.groupsRepository.save({
      ...createGroupDto,
      period: period,
    });
  }
}
