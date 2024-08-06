import {Router} from 'express';
import ScamController from "../app/controllers/ScamController";

const scamRoutes = Router();
const route_fix = '/scam';


scamRoutes.get(`${route_fix}`, ScamController.scam);

export default scamRoutes;
