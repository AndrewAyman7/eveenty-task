import { Request, Response } from 'express';
import { AdminService } from '../../BL/Auth/Service/AdminService';

const adminService = new AdminService();

export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const { from, to, user_name } = req.query;
    const report = await adminService.getSalesReport(from as string, to as string, user_name as string);
    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};