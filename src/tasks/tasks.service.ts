import { CreateTaskDto } from './create-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async create(newTask: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.findById(newTask.userId);
    if (!user) return null;

    const task = new Task();
    task.user = user;
    task.title = newTask.title;
    task.description = newTask.description;

    return await this.taskRepository.save(task);
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const user = await this.usersService.findById(userId);
    return await this.taskRepository.find({ where: { user } });
  }
}
