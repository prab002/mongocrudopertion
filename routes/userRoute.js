import express from "express";
import { create, deleteuser, getAll, getOne, update } from "../controller/userController.js";

const route = express.Router();

route.post("/create", create);
route.get("/get", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteuser);

export default route;
