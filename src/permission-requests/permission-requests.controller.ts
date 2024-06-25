import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PermissionRequestsService } from './permission-requests.service';
import { PermissionRequestDto } from './dto/permission-request.dto';

@Controller()
export class PermissionRequestsController {
  constructor(
    private readonly permissionRequestsService: PermissionRequestsService,
  ) {}

  @Post('students/:studentId/permissions')
  createPermissionRequest(
    @Body() permissionRequestDto: PermissionRequestDto,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.permissionRequestsService.createPermissionRequest(
      studentId,
      permissionRequestDto,
    );
  }
}
