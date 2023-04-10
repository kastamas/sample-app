export enum CardFormat {
  Standard = 'standard',
  Corporate = 'corporate',
}

export const formatCardNumber = (
  cardNumber: string | undefined,
  format: CardFormat
) => {
  if (!cardNumber) return '';

  switch (format) {
    case CardFormat.Standard:
      return cardNumber.match(/(\d{3})|(\d{2})|(\d{1})/g).join(' ');

    case CardFormat.Corporate:
      return cardNumber.match(/(\d{3})|(\d{2})|(\d{1})/g).join(' ');
  }
};
