import {Terrenos} from "./terrenos.utils";
import {Casas} from "./casas.utils";
import {Sites} from "../models/sites.model";

export class Locais {
    static readonly AllSites: Sites[] = Terrenos.AllTerreno.concat(Casas.AllCasas);
}
