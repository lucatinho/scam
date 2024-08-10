import {Request, Response} from "express";
import axios from "axios";
import cheerio from 'cheerio';

import {Locais} from "../../shared/utils/locais.utils";
import {IRealEstateOffer} from "../../shared/interfaces/IRealEstateOffer.interface";


class ScamController {
    public async scam(req: Request, res: Response): Promise<any> {
        try {
            const offers: IRealEstateOffer[] = [];
            for (const site of Locais.AllSites) {
                const url = site.url;
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);


                $('.box-result-properties').each((index, element) => {
                    const neighborhood = $(element).find(site.classes.neighborhood).text();
                    const info = $(element).find(site.classes.info).text();
                    const price = Formatacao.formatarValor($(element).find(site.classes.price).text());
                    const link = $(element).find(site.classes.link).attr('href');

                    offers.push({
                        neighborhood,
                        info,
                        price,
                        link: link ? `${url}${link}` : '',
                        type: site.type,
                        date: new Date(),
                    });
                });
            }

            return res.status(200).send({offers});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export class Formatacao {
    static formatarValor(value: string): string {
        value = value.replace('VendaR$', '');
        value = value.replace(/\./g, '');
        value = value.replace(/\s/g, '');
        value = value.replace(',', '.');
        value = value.split('LocaçãoR$', 1)[0];
        return value;
    }
}

export default new ScamController()
