"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 Route --- /api/auth
*/
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map