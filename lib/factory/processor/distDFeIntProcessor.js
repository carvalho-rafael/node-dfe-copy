"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistDFeIntProcessor = void 0;
const schema = require("../schema/index");
const xmlHelper_1 = require("../xmlHelper");
const webserviceHelper_1 = require("../webservices/webserviceHelper");
const nfe_1 = require("../interface/nfe");
const Utils = require("../utils/utils");
const sefazNfce_1 = require("../webservices/sefazNfce");
const sefazNfe_1 = require("../webservices/sefazNfe");
/**
 * Classe para processamento do Status Servico
 */
class DistDFeIntProcessor {
    constructor(empresa, ambiente, modelo, ultNSU, webProxy) {
        this.empresa = empresa;
        this.ambiente = ambiente;
        this.modelo = modelo;
        this.ultNSU = ultNSU;
        this.webProxy = webProxy;
    }
    async processarDocumento() {
        let xml = this.gerarXmlStatusServico('1.01', this.ambiente, this.empresa.endereco.cUf, this.empresa, this.ultNSU);
        return await this.consultarStatusServico(xml, this.empresa.certificado);
    }
    async consultarStatusServico(xml, cert) {
        let Sefaz = this.modelo == '65' ? sefazNfce_1.SefazNFCe : sefazNfe_1.SefazNFe;
        let soap = Sefaz.getSoapInfo('SVAN', this.ambiente, nfe_1.ServicosSefaz.distribuicao);
        return await webserviceHelper_1.WebServiceHelper.makeSoapRequest(xml, cert, soap, this.webProxy, true);
    }
    gerarXmlStatusServico(versao, ambiente, cUf, empresa, ultNSU) {
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
        return xmlHelper_1.XmlHelper.serializeXml(distDFeInt, 'nfeDistDFeInteresse');
    }
}
exports.DistDFeIntProcessor = DistDFeIntProcessor;
