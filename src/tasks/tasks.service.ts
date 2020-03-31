import { CreateTaskDto } from './create-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(newTask: CreateTaskDto): Promise<Task> {
    console.log(newTask);
    return;
  }
}
