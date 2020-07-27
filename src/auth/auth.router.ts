import express from 'express';
import * as authController from './auth.controller';
import { validataLoginData } from './auth.middleware';

const router = express.Router();

/**
 * 用户登录
 */
router.post('/login', validataLoginData, authController.login);

/**
 * 导出路由
 */
export default router;
