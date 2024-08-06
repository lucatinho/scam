import {Request, Response} from "express";
import axios, {AxiosError} from "axios";
import cheerio from 'cheerio';
import {JSDOM} from 'jsdom';

interface RealEstateOffer {
    neighborhood: string;
    info: string;
    price: string;
    link: string;
}

class ScamController {
    public async scam(req: Request, res: Response): Promise<any> {
        try {
            const url = 'https://www.caiquecorretor.com.br/p-terreno-jales.html';
            const response = await axios.get(url);
            const html = response.data;
            const $ = cheerio.load(html);


            const offers: RealEstateOffer[] = [];
            $('.box-result-properties').each((index, element) => {
                const neighborhood = $(element).find('.col-sm-8 > p:first').text();
                const info = $(element).find('.big-item').text();
                const price = $(element).find('.col-sm-4 p').text();
                const link = $(element).find('.link').attr('href');

                offers.push({
                    neighborhood,
                    info,
                    price,
                    link: link ? `${url}${link}` : ''
                });
            });

            return res.status(200).send({offers});
            // return res.send({html: new JSDOM(response.data).window.document.querySelectorAll('.singlepost').item(0).outerHTML});
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export default new ScamController()
