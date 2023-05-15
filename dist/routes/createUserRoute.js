"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createTokenController_1 = require("../controllers/createTokenController");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(200).json({ token: existingUser.token });
        }
        else {
            const token = (0, createTokenController_1.generateToken)(email);
            const limit = 80000;
            const newUser = new user_1.default({
                email,
                token,
                limit
            });
            const savedUser = yield newUser.save();
            res.status(201).json({ token: savedUser.token });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not save user to database' });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=createUserRoute.js.map