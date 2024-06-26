import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PeriodGroupsService } from './period-groups.service';
import { CreateGroupDto } from 'src/groups/dto/create-group.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/roles.decorator';
import { Roles } from 'src/users/entities/user.entity';
@Role(Roles.SECRETARY)
@ApiTags('Period Groups 🅿️👥')
@Controller('periods/:periodId/groups')
export class PeriodGroupsController {
  constructor(private readonly periodGroupsService: PeriodGroupsService) {}

  @Get()
  async getPeriodGroups(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
    @Query('search') search?: string,
  ) {
    const options: IPaginationOptions = {
      limit,
      page,
    };

    return await this.periodGroupsService.getPeriodGroups(
      options,
      periodId,
      search,
    );
  }

  @Post()
  async addGroupToPeriod(
    @Body() createGroupDto: CreateGroupDto,
    @Param('periodId', ParseIntPipe) periodId: number,
  ) {
    return await this.periodGroupsService.addGroupToPeriod(
      createGroupDto,
      periodId,
    );
  }
}
