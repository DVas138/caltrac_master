import joi from 'joi';
import {foodSchema} from "./foodSchema";

export const recipeSchema = joi.object({
    name: joi.string().min(4).max(30).required(),
    foods: joi.array().items(foodSchema).required(),
    servings: joi.number().integer().positive().required(),
    allCalories: joi.number().integer().positive().required(),
    //user may need to be added
})