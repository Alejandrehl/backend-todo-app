import { CreateTaskDto } from './create-task-dto';
import { TasksService } from './tasks.service';
import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';

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
}
