import { WebProxy } from "../webservices/webserviceHelper";
import { EmpresaDistribuicao } from "../interface/nfe";
/**
 * Classe para processamento do Status Servico
 */
export declare class DistDFeIntProcessor {
    private empresa;
    private ambiente;
    private modelo;
    private ultNSU;
    private webProxy?;
    constructor(empresa: EmpresaDistribuicao, ambiente: string, modelo: string, ultNSU: string, webProxy?: WebProxy | undefined);
    processarDocumento(): Promise<import("../interface/nfe").RetornoProcessamento>;
    consultarDistribuicao(xml: string, cert: any): Promise<import("../interface/nfe").RetornoProcessamento>;
    gerarXmlDistribuicao(versao: string, ambiente: string, cUf: string, empresa: EmpresaDistribuicao, ultNSU: string): string;
}
