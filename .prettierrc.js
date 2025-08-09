module.exports = {
  bracketSameLine: false,
  bracketSpacing: true,
  semi: true,
  singleQuote: true, // bắt buộc dấu nháy đơn
  jsxSingleQuote: false,
  trailingComma: 'all', // thêm dấu phẩy cuối object/array.
  singleAttributePerLine: true, // mỗi props sẽ nằm trên 1 hàng riêng biệt
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'], // Prettier sắp xếp class tailwindcss
};
