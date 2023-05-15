"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    id_user: String,
    date: {
        type: String,
        required: true
    },
    words: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model('History', historySchema);
//# sourceMappingURL=history.js.map