import express from 'express';
import { addTeamToDbHandler } from '../controllers/api.controller';

const apiRouter = express.Router();

apiRouter.post('/teams/:teamid', addTeamToDbHandler);

export default apiRouter;
