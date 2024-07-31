export interface dataInterface {
  amount: number;
  trackId: number;
  status: number;
  paidAt: string;
  cardNumber: string;
}

export interface FormValuesInterface {
  settlementDestination: string;
  settlementAmount: string;
  description?: string;
}


export interface FormattedInputPropsInterface {
  value?: string;
  onChange?: (value: string) => void;
}
