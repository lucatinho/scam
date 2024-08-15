import {Request, Response} from "express";
import axios from "axios";
import cheerio from 'cheerio';

import {Locais} from "../../shared/utils/locais.utils";
import {IRealEstateOffer} from "../../shared/interfaces/IRealEstateOffer.interface";
import {Sites} from "../../shared/models/sites.model";
import {Terrenos} from "../../shared/utils/terrenos.utils";
import {Casas} from "../../shared/utils/casas.utils";


class ScamController {
    public async scamAll(req: Request, res: Response): Promise<any> {
        try {
            const offers = await Scam.PegarInfoAllsites()

            return res.status(200).send({offers});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async scam(req: Request, res: Response): Promise<any> {
        try {
            const offers = await Scam.PegarInfoSite(Terrenos.Imperial);

            return res.status(200).send({offers});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }

    public async landelScam(req: Request, res: Response): Promise<any> {
        try {
            const offers: IRealEstateOffer[] = [];
            await Scam.LandelInfo(Terrenos.Landel, offers);
            await Scam.LandelInfo(Casas.Landel, offers);

            return res.status(200).send({offers});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export class Scam {
    static async PegarInfoAllsites() {
        const offers: IRealEstateOffer[] = [];
        await Scam.LandelInfo(Terrenos.Landel, offers);
        await Scam.LandelInfo(Casas.Landel, offers);
        for (const site of Locais.AllSites) {
            const $ = await this.PegarPaginaRequest(site.url);
            await this.PegarInfo($, site, offers);
            await this.VerificarPaginas($, site, offers);
        }
        return offers;
    }

    static async LandelInfo(site: Sites, offers: IRealEstateOffer[]) {
        let loop = true
        let pageNumber = 1

        while (loop) {
            const siteRequest = await axios.get(`${site.url}?ordenar=recentes&pagina=${pageNumber}`);
            const sitePayload = siteRequest.data;
            if (sitePayload.data[0]?.neighborhood) {
                sitePayload.data.forEach((element: any) => {
                    offers.push({
                        neighborhood: element.neighborhood,
                        info: element?.area[0],
                        price: element?.sale_price[0],
                        link: `${Terrenos.Landel.urlBase}${element.url}`,
                        type: site.type,
                        date: new Date(),
                    });
                });
                pageNumber = pageNumber + 1;
            } else {
                loop = false;
            }
        }
        return offers;
    }

    static async PegarInfoSite(site: Sites) {
        const offers: IRealEstateOffer[] = [];
        const $ = await this.PegarPaginaRequest(site.url);
        await this.PegarInfo($, site, offers);
        await this.VerificarPaginas($, site, offers);

        return offers;
    }

    static async PegarPaginaRequest(url: string) {
        const response = await axios.get(url);
        const html = response.data;
        return cheerio.load(html);
    }

    static async PegarInfo($: cheerio.Root, site: Sites, offers: IRealEstateOffer[]) {
        $(site.classes.list).each((index, element) => {
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
            if (currentLi.length > 0) {

                const anchorTag = currentLi.find('a');
                if (anchorTag.length > 0) {
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

    static formatarValor(value: string): number {
        value = value.replace('VendaR$', '');
        value = value.replace(/\./g, '');
        value = value.replace(/\s/g, '');
        // value = value.replace(',', '.');
        value = value.split(',', 1)[0];
        value = value.split('LocaçãoR$', 1)[0];
        return Number(value);
    }
}

export default new ScamController()
