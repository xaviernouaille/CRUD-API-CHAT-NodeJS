import { Request, Response } from "express";
import IResponse from "../interfaces/response";
import Room from "../model/Room";

export const createRoomService = (req: Request, res: Response) => {
  const { name, users } = req.body,
    newRoom = new Room({ name, users });
  newRoom.save((err) => {
    let response: IResponse = {
      rType: "success",
      msg: "Room successfully created !",
      data: newRoom,
    };
    return err ? res.status(403).json(err) : res.status(200).json(response);
  });
};
