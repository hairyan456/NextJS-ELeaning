import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from 'react-number-format';

const InputFormatCurrency = (props: NumericFormatProps<InputAttributes>) => {
  return (
    <NumericFormat
      className={
        'focus-primary flex h-10 w-full rounded-md border border-gray-200 px-3 text-sm outline-none focus:!border-primary focus:!transition-all dark:border-black/10 dark:bg-grayDarker'
      }
      {...props}
      thousandSeparator
    />
  );
};

export default InputFormatCurrency;
