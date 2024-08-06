import {LocalType} from "../enum/local-type.enum";
import {Sites} from "../models/sites.model";

export class Terrenos {
    static readonly Imperial: Sites = {
        url: 'https://www.imobimperial.com.br/p-terreno-jales-.html',
        type: LocalType.TERRENO,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: '.big-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly Caiquecorretor: Sites = {
        url: 'https://www.caiquecorretor.com.br/p-terreno-jales.html',
        type: LocalType.TERRENO,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: '.big-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly Imobglobo: Sites = {
        url: 'https://www.imobglobo.com.br/p-terreno-jales-.html',
        type: LocalType.TERRENO,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: '.big-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly AllTerreno: Sites[] = [
        Terrenos.Imperial,
        Terrenos.Caiquecorretor,
        Terrenos.Imobglobo,
    ];
}
