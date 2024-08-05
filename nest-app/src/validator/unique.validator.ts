import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Prisma, PrismaClient } from '@prisma/client';

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  //constructor(private readonly prisma: PrismaService) { }
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const prisma = new PrismaClient({
      log: ['query'],
    });

    const [tableName, column] = args?.constraints as string[];

    const dataExist = await prisma[tableName].findMany({
      where: { [column]: value },
    });

    // const dataExist = await prisma.$executeRaw(
    //   Prisma.sql`SELECT * FROM [${Prisma.raw(tableName)}] WHERE EXISTS (
    //             SELECT *
    //             FROM [${Prisma.raw(tableName)}]
    //             WHERE [${Prisma.raw(column)}] = '${Prisma.raw(value)}'
    //         )`,
    // );

    //return dataExist ? false : true;
    return dataExist.length > 0 ? false : true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const field = validationArguments.property;

    return `${field} already exist`;
  }
}
