import {Request, Response} from "express";
import axios from "axios";
import cheerio from 'cheerio';

import {Locais} from "../../shared/utils/locais.utils";
import {IRealEstateOffer} from "../../shared/interfaces/IRealEstateOffer.interface";
import {Sites} from "../../shared/models/sites.model";


class ScamController {
    public async scam(req: Request, res: Response): Promise<any> {
        try {
            const offers = await Scam.PegarInfoAllsites()

            return res.status(200).send({offers});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export class Scam {
    static async PegarInfoAllsites() {
        const offers: IRealEstateOffer[] = [];
        for (const site of Locais.AllSites) {
            const $ = await this.PegarPaginaRequest(site.url);
            await this.PegarInfo($, site, offers);
            await this.VerificarPaginas($, site, offers);
        }
        return offers;
    }

    static async PegarPaginaRequest(url: string) {
        // const url = site.url;
        const response = await axios.get(url);
        const html = response.data;
        return cheerio.load(html);
    }

    static async PegarInfo($: cheerio.Root, site: Sites, offers: IRealEstateOffer[]) {
        $('.box-result-properties').each((index, element) => {
            const neighborhood = $(element).find(site.classes.neighborhood).text();
            const info = $(element).find(site.classes.info).text();
            const price = Scam.formatarValor($(element).find(site.classes.price).text());
            const link = $(element).find(site.classes.link).attr('href');

            return offers.push({
                neighborhood,
                info,
                price,
                link: link ? `${site.urlBase}${link}` : '',
                type: site.type,
                date: new Date(),
            });
        });
    }

    static async VerificarPaginas($: cheerio.Root, site: Sites, offers: IRealEstateOffer[]) {
        let currentLi = $('ul li.active');
        while (currentLi.length > 0) {
            // Pegue a próxima tag <li> após a atual
            currentLi = currentLi.next('li');

            // Se a próxima <li> existir
            if (currentLi.length > 0) {
                // Pega o elemento <a> dentro da <li>
                const anchorTag = currentLi.find('a');

                if (anchorTag.length > 0) {
                    // Pega o valor do atributo href
                    const hrefValue = anchorTag.attr('href');
                    console.log('Valor do href:', hrefValue);
                    if (hrefValue) {
                        $ = await this.PegarPaginaRequest(hrefValue);
                        await this.PegarInfo($, site, offers);
                    }
                } else {
                    console.log('Não há tag <a> dentro deste <li>.');
                }
            }
        }
    }

    static formatarValor(value: string): string {
        value = value.replace('VendaR$', '');
        value = value.replace(/\./g, '');
        value = value.replace(/\s/g, '');
        // value = value.replace(',', '.');
        value = value.split('LocaçãoR$', 1)[0];
        return value;
    }
}

export default new ScamController()
