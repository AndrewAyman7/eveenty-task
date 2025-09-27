import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from '../../BL/Auth/Service/AuthService';
import { SignupDto } from '../../BL/Auth/DTOs/SignupDto';
import { LoginDto } from '../../BL/Auth/DTOs/LoginDto';


const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  const dto = plainToClass(SignupDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    const token = await authService.signup(dto.email, dto.password, dto.name);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const dto = plainToClass(LoginDto, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map(e => Object.values(e.constraints || {})) });
  }

  try {
    const token = await authService.login(dto.email, dto.password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};