import express from 'express'
import {findAction, createAction} from '../controllers/action.controller.js'
import { body, query } from 'express-validator'

export const userRouter = express.Router();

userRouter.get('/'
    , query('user_id').optional({checkFalsy: true}).isInt()
    , query('page').optional({checkFalsy: true}).isInt()
    , query('perPage').optional({checkFalsy: true}).isInt(),
     findAction);
userRouter.post('/'
    , body('user_id').notEmpty()
    , body('action_type').notEmpty()
    , createAction);

