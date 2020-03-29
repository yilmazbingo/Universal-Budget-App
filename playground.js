const Joi = require("@hapi/joi");

schema = Joi.object({
  description: Joi.string()
    .min(10)
    .alphanum()
    .label("Description")
    .required(),
  amount: Joi.string()
    .max(10)
    .required()
    .label("Amount"),
  note: Joi.string()
    .min(5)
    .max(100)
    .label("Note")
});

const options = { abortEarly: false };

form = {
  description: "dddd",
  note: "",
  amount: ""
};
// console.log(schema.validate(form, options).error);

// console.log(schema.description());

const a = schema.description;

console.log(a.validate());
