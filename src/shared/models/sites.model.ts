import {LocalType} from "../enum/local-type.enum";

export class Sites {
    url: string;
    urlBase: string;
    type: LocalType;
    classes: {
        list: string;
        neighborhood: string;
        info: string;
        price: string;
        link: string;
    }

}
