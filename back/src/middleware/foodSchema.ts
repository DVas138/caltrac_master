import joi from 'joi';

export const foodSchema = joi.object({
    barcode: joi.string().trim(),
    name: joi.string().required(),
    calories: joi.number().positive().required(),
    amount: joi.number().positive().required(),
    //add macro nutrients and elements
});
