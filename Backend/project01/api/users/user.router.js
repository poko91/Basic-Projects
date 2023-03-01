const { createUser, getUserById, getUsers, updateUser, deleteUser, login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", createUser);
router.get('/:id',checkToken, getUserById);
router.get('/',checkToken, getUsers);
router.put('/:id',checkToken, updateUser);
router.delete('/:id',checkToken, deleteUser);
router.post('/login', login);

module.exports = router;