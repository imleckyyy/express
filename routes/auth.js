import { Router } from 'express';
import authController from '../controllers/authController';
import { catchAsync } from '../middlewares/errors';

export default () => {
    const api = Router();

    api.post('/login/', catchAsync(authController.login));

    api.post('/register/', catchAsync(authController.registration));

    // api.post('/logout/', catchAsync(authController.logout));

    // api.post('/password/reset', catchAsync(authController.logout));

    // api.post('/password/reset/confirm', catchAsync(authController.logout));

    // api.post('/password/change', catchAsync(authController.logout));

    // api.get('/user/', catchAsync(authController.logout));

    return api;
}