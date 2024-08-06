import {Request, Response} from "express";
import axios, {AxiosError} from "axios";
import {JSDOM} from 'jsdom';

class RastreioController {
    public async rastreioId(req: Request, res: Response): Promise<any> {
        try {
            if (!req.params.rastreioId) {
                return res.send({error: 'Informe o codigo'});
            }
            await axios.get(`https://www.linkcorreios.com.br/?id=${req.params.rastreioId}`).then(response => {
                return res.send({html: new JSDOM(response.data).window.document.querySelectorAll('.singlepost').item(0).outerHTML});
            }).catch((error: AxiosError) => {
                // console.error(`There was an error with ${error.config?.url}.`);
                // console.error(error.toJSON());
                return res.send(error.toJSON());
            });
        } catch (err) {
            return res.status(400).send({error: 'Erro interno'});
        }
    }
}

export default new RastreioController()
