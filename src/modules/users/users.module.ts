import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { USER_MODEL } from './users.interface';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UsersService,

    {
      provide: USER_MODEL,
      useClass: UserRepository,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService, USER_MODEL],
})
export class UsersModule {}
