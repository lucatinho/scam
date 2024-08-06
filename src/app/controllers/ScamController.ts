import {Request, Response} from "express";
import axios from "axios";
import cheerio from 'cheerio';
import {Locais} from "../../shared/utils/sites.utils";

interface RealEstateOffer {
    neighborhood: string;
    info: string;
    price: string;
    link: string;
    type: string;
    date: Date;
}

class ScamController {
    public async scam(req: Request, res: Response): Promise<any> {
        try {
            const offers: RealEstateOffer[] = [];
            for (const site of Locais.AllSites) {
                const url = site.url;
                const response = await axios.get(url);
                const html = response.data;
                const $ = cheerio.load(html);


                $('.box-result-properties').each((index, element) => {
                    const neighborhood = $(element).find(site.classes.neighborhood).text();
                    const info = $(element).find(site.classes.info).text();
                    const price = $(element).find(site.classes.price).text();
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

export default new ScamController()
