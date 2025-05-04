export function formatarParaReais(centavos: number): string {
  return `R$ ${(centavos / 100).toFixed(2).replace('.', ',')}`
}

export function parseReaisParaCentavos(valor: string): number {
  return Math.round(parseFloat(valor.replace(',', '.')) * 100)
}

export function formatarDuracao(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return `${h}h${m.toString().padStart(2, '0')}min`
}
