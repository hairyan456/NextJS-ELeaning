import { InputAttributes, NumericFormat, NumericFormatProps } from 'react-number-format';

const InputFormatCurrency = (props: NumericFormatProps<InputAttributes>) => {
    return (
        <NumericFormat
            className={`flex outline-none h-10 rounded-md px-3 w-full text-sm border border-gray-200 focus:!border-primary focus:!transition-all 
        dark:border-opacity-10 dark:bg-grayDarker focus-primary`}
            {...props}
            thousandSeparator
        />
    );
};

export default InputFormatCurrency;