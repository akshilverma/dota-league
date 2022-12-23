import express from 'express';
import { getAllTeamsHandler } from '../controllers/v1.controller';

const v1Router = express.Router();

v1Router.get('/teams', getAllTeamsHandler);

export default v1Router;
