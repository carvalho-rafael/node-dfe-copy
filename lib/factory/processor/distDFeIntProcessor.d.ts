import { WebProxy } from "../webservices/webserviceHelper";
import { Empresa } from "../interface/nfe";
/**
 * Classe para processamento do Status Servico
 */
export declare class DistDFeIntProcessor {
    private empresa;
    private ambiente;
    private modelo;
    private ultNSU;
    private webProxy?;
    constructor(empresa: Empresa, ambiente: string, modelo: string, ultNSU: string, webProxy?: WebProxy | undefined);
    processarDocumento(): Promise<import("../interface/nfe").RetornoProcessamento>;
    consultarStatusServico(xml: string, cert: any): Promise<import("../interface/nfe").RetornoProcessamento>;
    gerarXmlStatusServico(versao: string, ambiente: string, cUf: string, empresa: Empresa, ultNSU: string): string;
}
