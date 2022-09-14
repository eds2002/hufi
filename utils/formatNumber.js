
export function formatNumber(number,currencyCode,locale){

  const getCurrencySymbol = (locale, currencyCode) => (0).toLocaleString(locale, { style: 'currency', currency:currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim()
  const num = `${getCurrencySymbol(locale,currencyCode)}${Math.trunc(number)}`

  return num
}