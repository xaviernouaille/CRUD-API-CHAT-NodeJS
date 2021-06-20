import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Character from "../model/Character";
import { errorFormatter } from "../validator/character";
import IResponse from "../interfaces/response";
import { ICharacter } from "../model/Character";

export const deleteCharacterService = (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array()[0]);
  }

  Character.findByIdAndRemove(id).then((character) => {
    const response: IResponse = {
      rType: "success",
      msg: "Character successfully deleted",
      data: character,
    };
    return res.status(200).json(response);
  });
};

export const modifyCharacterService = (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array()[0]);
  }

  Character.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) return res.status(404).json(err);
    else {
      const response: IResponse = {
        rType: "success",
        msg: "Character successfully updated",
        data: data,
      };
      return res.status(200).json(response);
    }
  });
};

export const createCharacterService = (req: Request, res: Response) => {
  const { name, age } = req.body,
    newCharacter = new Character({ name: name, age: age });
  newCharacter.save((err) => {
    let response: IResponse = {
      rType: "success",
      msg: "Character successfully created !",
      data: newCharacter,
    };
    return err ? res.status(403).json(err) : res.status(200).json(response);
  });
};

export const getAllCharacterService = (req: Request, res: Response) => {
  Character.find({}, (err: string, data: ICharacter) => {
    if (err) return res.status(404).json(err);
    else {
      let response: IResponse = {
        rType: "success",
        msg: "Characters successfully fetched !",
        data: data,
      };
      return res.status(200).json(response);
    }
  });
};

export const getOneCharacterService = (req: Request, res: Response) => {
  const { id } = req.params;
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(404).json(errors.array()[0]);
  }

  Character.findById(id, (err: string, data: ICharacter) => {
    if (err) return res.status(404).json(err);
    else {
      let response: IResponse = {
        rType: "success",
        msg: "Character successfully fetched !",
        data: data,
      };
      return res.status(200).json(response);
    }
  });
};
