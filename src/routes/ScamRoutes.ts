import {Router} from 'express';
import ScamController from "../app/controllers/ScamController";

const scamRoutes = Router();
const route_fix = '/scam';


scamRoutes.get(`${route_fix}/all`, ScamController.scamAll);
scamRoutes.get(`${route_fix}/excel`, ScamController.scamExcel);
scamRoutes.get(`${route_fix}`, ScamController.scam);
scamRoutes.get(`${route_fix}/landel`, ScamController.landelScam);

export default scamRoutes;
