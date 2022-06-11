"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid) => {
    return new Promise((resolve, reyect) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY || '', {
            expiresIn: '30d'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reyect('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate_jwt.js.map