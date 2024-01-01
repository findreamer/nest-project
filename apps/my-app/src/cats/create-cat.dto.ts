import * as Joi from 'joi';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

export const createCartSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number(),
  breed: Joi.string(),
});
