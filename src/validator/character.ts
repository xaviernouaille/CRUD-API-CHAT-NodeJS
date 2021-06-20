import { body, param, ValidationError } from "express-validator";
import IResponse from "../interfaces/response";
import Character from "../model/Character";

export const errorFormatter = ({
  msg,
  param,
  value,
}: ValidationError): IResponse => {
  return [{ rType: "error", msg: msg, value: value, param: param }];
};

export const getIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isMongoId()
    .withMessage("Must be an Mongo ID")
    .custom((id) => {
      return Character.findById(id).then((c) => {
        if (!c) {
          return Promise.reject(
            "Character with the id " + id + " doesn't exist"
          );
        }
      });
    }),
];

export const bodyValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Cannot be empty")
    .isString()
    .withMessage("Name has to be a string"),
  body("age")
    .optional()
    .notEmpty()
    .withMessage("Cannot be empty")
    .isInt()
    .withMessage("Age has to be a number"),
];
