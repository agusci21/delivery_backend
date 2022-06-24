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
exports.deleteUser = exports.putUser = exports.setImage = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const check_if_params_exists_1 = require("../helpers/check_if_params_exists");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const path_1 = __importDefault(require("path"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({
        users,
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        res.json({
            user,
        });
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con id: ' + id,
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        const emailExists = yield (0, check_if_params_exists_1.checkIfEmailExists)(email);
        if (emailExists) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email: ' + body.email,
            });
        }
        const user = user_1.default.build(body);
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        yield user.save();
        res.status(201).json({
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno del servidor, hable con el administrador',
        });
    }
});
exports.postUser = postUser;
const setImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        return res.status(400).json({
            msg: 'No se enviaron archivos',
        });
    }
    const { image } = req.files;
    const newFileName = image.name.split('.');
    const extencion = newFileName[(newFileName.length - 1)];
    const validExtencions = ['jpg', 'png', 'jpeg'];
    if (!validExtencions.includes(extencion))
        return res.status(400).json({ msg: `La extención ${extencion} no es valida` });
    const uploadPath = path_1.default.join(__dirname, '../uploads/', image.name);
    console.log(uploadPath);
    return res.json({ extencion });
    /*image.mv(uploadPath, (error: Error) => {
      if (error) {
        console.log(error)
        return res.status(500).json({
          msg: 'Error interno del servidor',
        })
      }
    })*/
});
exports.setImage = setImage;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { email } = body;
    try {
        const idExist = yield (0, check_if_params_exists_1.checkIfIdExists)(id);
        const emailExist = yield (0, check_if_params_exists_1.checkIfEmailExists)(email);
        if (!idExist) {
            return res.status(404).json({
                msg: 'No existe usuario con el id: ' + id,
            });
        }
        if (emailExist) {
            return res.status(400).json({
                msg: 'El email: ' + email + ' ya esta en uso',
            });
        }
        const user = yield user_1.default.findByPk(id);
        user === null || user === void 0 ? void 0 : user.update(body);
        res.json({
            msg: 'Usuario modificado',
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno del servidor, hable con el administrador',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existUser = yield (0, check_if_params_exists_1.checkIfIdExists)(id);
    if (!existUser) {
        return res.status(404).json({
            msg: 'No existe usuario con el id: ' + id,
        });
    }
    const user = yield user_1.default.findByPk(id);
    yield (user === null || user === void 0 ? void 0 : user.destroy());
    res.json({
        msg: 'usuario eliminado',
        user,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map