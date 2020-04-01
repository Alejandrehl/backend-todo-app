import { CreateTaskDto } from './create-task-dto';
import { TasksService } from './tasks.service';
import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Res() response) {
    this.tasksService
      .create(createTaskDto)
      .then(task => response.status(HttpStatus.CREATED).json(task))
      .catch(err =>
        response.status(HttpStatus.FORBIDDEN).json({ message: err.message }),
      );
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId, @Res() response) {
    this.tasksService
      .findByUserId(userId)
      .then(tasks => response.status(HttpStatus.OK).json(tasks))
      .catch(err =>
        response.status(HttpStatus.BAD_GATEWAY).json({ message: err.message }),
      );
  }

  @Get('/:id')
  findById(@Param('id') id, @Res() response) {
    this.tasksService
      .findById(id)
      .then(task => response.status(HttpStatus.OK).json(task))
      .catch(err =>
        response.status(HttpStatus.BAD_GATEWAY).json({ message: err.message }),
      );
  }

  @Delete('/:id')
  delete(@Res() response, @Param('id') id) {
    this.tasksService
      .delete(id)
      .then(res => {
        if (!res) throw new NotFoundException();
        response.status(HttpStatus.OK).json(res);
      })
      .catch(err =>
        response.status(HttpStatus.FORBIDDEN).json({ message: err.message }),
      );
  }
}
