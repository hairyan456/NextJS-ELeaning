
export const createOrderCode = () => {
    return `DH-${new Date().getTime().toString().slice(-6)}`;
}