export const formatRub = amount => amount || amount === 0
    ? Intl.NumberFormat('Ru-ru', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(amount)
    : '';
