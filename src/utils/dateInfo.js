const weekDays = [
  'Domingo', 
  'Segunda-Feira', 
  'Terça-Feira', 
  'Quinta-Feira', 
  'Sexta-Feira', 
  'Sabádo'
]

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const formatTimeUnit = unit => String(unit).length === 1 ? `0${unit}` : unit

const formatDateInfo = date => {
  const hours = formatTimeUnit(date.getHours()) 
  const minutes = formatTimeUnit(date.getMinutes())
  const weekDay = date.getDay()
  const monthDay = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${hours}:${minutes} - ${weekDays[weekDay]}, ${monthDay} de ${months[month]} de ${year}`
}

export {
  formatDateInfo
}