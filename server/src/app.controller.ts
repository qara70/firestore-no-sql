import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateStatusDto } from './dto/update-status-dto';
import { UpdateQuestionDto } from './dto/update-question-dto';
import { DeleteQuestionDto } from './dto/delete-question-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put()
  updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    this.appService.updateStatus(updateStatusDto);
    return 'Success update status.';
  }

  @Get('/user')
  getStatusList() {
    return this.appService.getUserStatusList();
  }

  @Put('/question')
  updateQuestion(@Body() updateQuestionDto: UpdateQuestionDto) {
    this.appService.updateQuestion(updateQuestionDto);
    return 'Success update question.';
  }

  @Delete('/question')
  deleteQuestion(@Body() deleteQuestionDto: DeleteQuestionDto) {
    this.appService.deleteQuestion(deleteQuestionDto);
    return 'Success delete question';
  }
}
