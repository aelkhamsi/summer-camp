import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .getMany();
  }

  findOneById(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .getOne();
  }

  findOneByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.application', 'application')
      .leftJoinAndSelect('application.status', 'status')
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = hashPassword(updateUserDto.password);
    }
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
