import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExist implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const prisma = new PrismaClient({
      log: ['query'],
    });

    const [tableName, column] = args?.constraints as string[];
    const dataExist = await prisma[tableName].findMany({
      where: { [column]: value },
    });

    return dataExist.length > 0 ? true : false;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property;

    return `${field} not exist`;
  }
}