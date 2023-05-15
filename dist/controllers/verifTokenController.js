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
exports.tokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const history_1 = __importDefault(require("../models/history"));
const tokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '').trim();
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_CODE_TOKEN);
    console.log(decodedToken);
    try {
        const userToken = yield checkToken(token, decodedToken);
        yield checkLimit(res, userToken, req.body.text);
        next();
    }
    catch (e) {
        res.status(401).json({ 'error': 'You are not authentified' });
    }
});
exports.tokenMiddleware = tokenMiddleware;
const checkToken = (token, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const userToken = yield user_1.default.findOne({ email: decodedToken, 'token': token });
    if (!userToken)
        throw new Error();
    return userToken;
});
const checkLimit = (res, userToken, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_user = userToken._id.toString();
        const userHistory = yield history_1.default.findOne({ id_user: id_user, date: getDate() });
        if (!userHistory) {
            const date = getDate();
            const newHistory = new history_1.default({
                id_user: id_user,
                date: date,
                words: 0,
            });
            const savedHistory = yield newHistory.save();
        }
        const newUserHistory = yield history_1.default.findOne({ id_user: id_user, date: getDate() });
        const canUpdateWords = yield checkWords(text, newUserHistory.words);
        if (canUpdateWords) {
            const newWords = newUserHistory.words + text.split(' ').length;
            const updateWords = yield history_1.default.findOneAndUpdate({ id_user: id_user, date: getDate() }, { words: newWords });
        }
        else {
            res.status(402).json({ 'error': 'Payment Required' });
        }
    }
    catch (error) {
        throw error;
    }
});
const getDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
const checkWords = (text, userHistory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userHistory + text.split(' ').length > 80000) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (err) {
        throw err;
    }
});
//# sourceMappingURL=verifTokenController.js.map