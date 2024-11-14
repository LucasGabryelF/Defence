function formatDateTime(date: Date | undefined, format: string = 'pt-BR', timezone: string = 'America/Sao_Paulo'): string {
    return new Date(date + "+00:00" ?? "0").toLocaleDateString(format, { timeZone: timezone }) + " " + new Date(date + "+00:00" ?? "0").toLocaleTimeString(format, { timeZone: timezone })
}

export default { formatDateTime }