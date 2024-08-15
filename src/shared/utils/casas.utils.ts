import {LocalType} from "../enum/local-type.enum";
import {Sites} from "../models/sites.model";

export class Casas {
    static readonly Landel: Sites = {
        url: 'https://www.landelimobiliaria.com.br/api/listings/a-venda/casa/jales',
        urlBase: 'https://www.landelimobiliaria.com.br',
        type: LocalType.CASA,
        classes: {
            list: '.listing-results .box-align',
            neighborhood: '.link-all .card-title',
            info: '.link-all .value p',
            price: '.info-left .h-money',
            link: '.card-listing a',
        },
    };

    static readonly Imperial: Sites = {
        url: 'https://www.imobimperial.com.br/p-casa-jales-.html',
        urlBase: 'https://www.imobimperial.com.br',
        type: LocalType.CASA,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: 'ul .small-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly Caiquecorretor: Sites = {
        url: 'https://www.caiquecorretor.com.br/p-casa-jales.html',
        urlBase: 'https://www.caiquecorretor.com.br',
        type: LocalType.CASA,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: 'ul .small-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly Imobglobo: Sites = {
        url: 'https://www.imobglobo.com.br/p-casa-jales-.html',
        urlBase: 'https://www.imobglobo.com.br',
        type: LocalType.CASA,
        classes: {
            list: '.box-result-properties',
            neighborhood: '.col-sm-8 > p:first',
            info: 'ul .small-item',
            price: '.col-sm-4 p',
            link: '.link',
        },
    };

    static readonly AllCasas: Sites[] = [
        Casas.Imperial,
        Casas.Caiquecorretor,
        Casas.Imobglobo,
    ];
}
