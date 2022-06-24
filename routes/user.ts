/*
 Route --- /api/users
*/

import {application, Router} from 'express'
import { getUsers, getUser, postUser, putUser, deleteUser, setImage } from '../controllers/user';
const router = Router()

router.get('/',getUsers)
router.get('/:id',getUser)
router.post('/create',postUser)
router.post('/setImage',setImage)
router.put('/modify/:id',putUser)
router.delete('/delete/:id',deleteUser)


export default router