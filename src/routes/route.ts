import express from "express";
import { getIdValidator, bodyValidator } from "../validator/character";
import { createRoomService } from "../services/room";
import {
  getAllCharacterService,
  getOneCharacterService,
  modifyCharacterService,
  createCharacterService,
  deleteCharacterService,
} from "../services/character";
import { loginService, registerService } from "../services/authent";

const router = express.Router();

router.get("/character/:id", getIdValidator, getOneCharacterService);

router.get("/character", getAllCharacterService);

router.post("/character", bodyValidator, createCharacterService);

router.put(
  "/character/:id",
  getIdValidator,
  bodyValidator,
  modifyCharacterService
);

router.delete("/character/:id", getIdValidator, deleteCharacterService);

router.post("/login", loginService);

router.post("/register", registerService);

router.post("/room", createRoomService);

export default router;
