export function getContentType(uf: string): string {
    switch (uf) {
        case 'GO':
            return "application/soap+xml;charset=utf-8";
        default:
            return "application/soap+xml;charset=utf-8";
    }
}

