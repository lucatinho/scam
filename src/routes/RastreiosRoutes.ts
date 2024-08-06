import {Router} from 'express';
import RastreioController from "../app/controllers/RastreioController";

const rastreiosRoutes = Router();
const route_fix = '/rastreio';


rastreiosRoutes.get(`${route_fix}/:rastreioId`, RastreioController.rastreioId);

export default rastreiosRoutes;
