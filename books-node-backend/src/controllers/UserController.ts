import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

/**
 * Controller that manages the creation of users
 */
class UserController {
  // Create a user to use to log in
  static createUser = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    console.log(`Received username ${username}`);
    let user = new User();
    user.username = username;
    user.password = password;
    console.log('Created User model');

    // Validate if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log('Validation error');
      res.status(400).send(errors);
      return;
    }

    console.log('Hash password');
    // Hash the password, to securely store on DB
    user.hashPassword();

    console.log('get User Repo');
    // Try to save. If fails, the username is already in use
    const userRepository = AppDataSource.getRepository(User);
    try {
      console.log('Save User');
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Username already in use');
      return;
    }

    // If all ok, send 201 response
    res.status(201).send('User created');
  };

  static test = async (req: Request, res: Response) => {
    res.json({ message: 'User Test successful' });
    return;
  };
}

export default UserController;
