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
exports.login = void 0;
const check_if_params_exists_1 = require("../helpers/check_if_params_exists");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generate_jwt_1 = require("../helpers/generate_jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!(yield (0, check_if_params_exists_1.checkIfEmailExists)(email))) {
            return res.status(404).json({
                msg: `No existe usuario con email: ${email}`,
            });
        }
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (!user)
            return;
        const isValidPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (isValidPassword) {
            const token = yield (0, generate_jwt_1.generateJWT)(user.id);
            res.json({
                user, token
            });
        }
        else
            res.status(400).json({
                msg: 'Contraseña invalida',
                email,
                password,
            });
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrio un error',
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map