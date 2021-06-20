import Character from "../model/Character";
import { ICharacter } from "../model/Character";
import jwt from "jsonwebtoken";
import IResponse from "../interfaces/response";
import { Response, Request } from "express";

export const loginService = (req: Request, res: Response) => {
  const { name, age } = req.body;
  Character.findOne({ name, age }, (err: any, data: ICharacter) => {
    if (err) return res.status(404).json(err);
    else if (!data) {
      return res.status(404).json({ msg: "not found!" });
    } else {
      jwt.sign(
        { _id: data._id, name: data.name, age: data.age },
        "SECRET",
        (err: any, token: any) => {
          if (err) return res.status(404).json(err);
          else {
            const response: IResponse = {
              rType: "success",
              msg: "You are successfully logged",
              data: token,
            };
            return res.status(200).json(response);
          }
        }
      );
    }
  });
};

export const registerService = (req: Request, res: Response) => {
  const { name, age } = req.body,
    newCharacter = new Character({ name, age });
  newCharacter.save((err) => {
    let response: IResponse = {
      rType: "success",
      msg: "Character successfully registered !",
      data: newCharacter,
    };
    return err ? res.status(403).json(err) : res.status(200).json(response);
  });
};
