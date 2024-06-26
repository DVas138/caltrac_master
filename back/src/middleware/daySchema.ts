import joi from 'joi';
import {foodSchema} from "./foodSchema";

export const daySchema = joi.object({
    date: joi.date().required(),
    foods: joi.array().items(foodSchema.required()).required(),
    user: joi.string(),
    calories: joi.number().integer().positive().required(),
    weight: joi.number().positive().required(),
})