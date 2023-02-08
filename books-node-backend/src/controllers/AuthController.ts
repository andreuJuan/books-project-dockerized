import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../entity/User';
import config from '../config/auth_config';
import { AppDataSource } from '../data-source';

/**
 * Controller that takes care of the user login process
 */
class AuthController {
  // Login with the user and return JWT if successful
  static login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    // Check if username and password are set
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
      return;
    }

    // Check if encrypted password matches
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sign a JWT valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {
      expiresIn: '1h',
    });

    // Send the JWT in the response
    res.status(200).send({ accessToken: token });
  };
}
export default AuthController;
