import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.dto.user';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
