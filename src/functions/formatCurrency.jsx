export const formatCurrency = (amount, currency = 'EUR') => {
  return amount.toLocaleString('it-IT', {
    style: 'currency',
    currency: currency
  });
};
