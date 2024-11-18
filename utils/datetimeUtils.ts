function formatDateTime(date: Date | undefined, offset: string = '+00:00', format: string = 'pt-BR', timezone: string = 'America/Sao_Paulo'): string {
    return new Date(date + offset ?? "0").toLocaleDateString(format, { timeZone: timezone }) + " " + new Date(date + offset ?? "0").toLocaleTimeString(format, { timeZone: timezone })
}

export default { formatDateTime }