// function to format the given amount as a currency
export const formatCurrency = (amount, currency = 'EUR') => {
  return amount.toLocaleString('it-IT', {
    style: 'currency',
    currency: currency
  });
};
