import express from "express";
import {
    getUsers,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from  "../middleware/auth.js";

const router = express.Router();


// ========== CRUD: READ ROUTES ==========
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);



// ========== CRUD: UPDATE ROUTES ==========
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;