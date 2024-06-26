import joi from "joi";

const userSchema = joi.object({
  email: joi.string().email().trim().required(),
  username: joi.string().min(4).max(30).required(),
  password: joi
    .string()
    .min(4)
    .max(30)
    .pattern(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[A-Z]).+$/,
      "containSpecialSymbols",
    )
    .message(
      "Password should contain at least a uppercase, a special symbol and a number!",
    )
    .required(),
  passwordRep: joi.ref("password"),
  age: joi.number().integer().min(12).required(),
  weight: joi.number().positive().required(),
  height: joi.number().positive().required(),
  sex: joi.number().integer().required(),
  calGoal: joi.number().required(),
  activity: joi.number().positive().required(),
});
// Make one without the passwordRep or change logic

export default userSchema;
