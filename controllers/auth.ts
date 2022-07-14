import { Request, Response } from 'express'
import { checkIfEmailExists } from '../helpers/check_if_params_exists'
import bcryptjs from 'bcryptjs'
import User from '../models/user'
import { generateJWT } from '../helpers/generate_jwt'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    if (!(await checkIfEmailExists(email))) {
      return res.status(404).json({
        msg: `No existe usuario con email: ${email}`,
      })
    }
    const user = await User.findOne({ where: { email: email } })
    if(!user) return 
    const isValidPassword = bcryptjs.compareSync(password, user.password)

    if (isValidPassword) {
      const token = await generateJWT(user.id)
     res.json({
      user, token
      })}

    else res.status(400).json({
      msg: 'Contraseña invalida',
      email,
      password,
    })

    const token = await generateJWT(user.id)
   
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Ocurrio un error',
    })
  }
}
