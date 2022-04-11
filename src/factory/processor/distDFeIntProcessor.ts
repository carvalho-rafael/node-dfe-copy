import * as schema from '../schema/index'
import { XmlHelper } from "../xmlHelper";
import { WebServiceHelper, WebProxy } from "../webservices/webserviceHelper";
import {  ServicosSefaz, EmpresaDistribuicao } from "../interface/nfe";
import * as Utils from "../utils/utils";
import { SefazNFCe } from "../webservices/sefazNfce";
import { SefazNFe } from "../webservices/sefazNfe";

/**
 * Classe para processamento do Status Servico
 */

export class DistDFeIntProcessor {

    constructor(
        private empresa: EmpresaDistribuicao,
        private ambiente: string,
        private modelo: string,
        private ultNSU: string,
        private webProxy?: WebProxy) { }

    async processarDocumento() {
        let xml = this.gerarXmlDistribuicao('1.01', this.ambiente, this.empresa.endereco.cUf, this.empresa, this.ultNSU);
        return await this.consultarDistribuicao(xml, this.empresa.certificado);
    }

    async consultarDistribuicao(xml: string, cert: any) {
        let Sefaz = this.modelo == '65' ? SefazNFCe : SefazNFe;
        let soap = Sefaz.getSoapInfo('SVAN', this.ambiente, ServicosSefaz.distribuicao);
        return await WebServiceHelper.makeSoapRequest(xml, cert, soap, this.webProxy, true);
    }

    gerarXmlDistribuicao(versao: string, ambiente: string, cUf: string, empresa: EmpresaDistribuicao, ultNSU: string) {
        let distDFeInt = {
            $: {
                xmlns: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe'
            },
            nfeDadosMsg: {
                $: {
                    xmlns: 'http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe'
                },
                distDFeInt: {
                    $: {
                        versao: versao,
                        xmlns: 'http://www.portalfiscal.inf.br/nfe'
                    },
                    tpAmb: Utils.getEnumByValue(schema.TAmb, ambiente),
                    cUFAutor: Utils.getEnumByValue(schema.TCodUfIBGE, cUf),
                    CNPJ: empresa.cnpj,
                    distNSU: {
                        ultNSU
                    },
                }
            }
        };

        return XmlHelper.serializeXml(distDFeInt, 'nfeDistDFeInteresse');
    }

}