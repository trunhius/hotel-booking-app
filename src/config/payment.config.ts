export const PAYMENT_CONFIG = {
    endpoint: 'https://sandbox2.nganluong.vn/vietcombank-checkout/vcb/api/web/checkout/version_1_0',
    merchantSiteCode: '7', // Example Merchant Site Code
    merchantPasscode: '123456789', // Example Merchant Passcode
    returnUrl: 'http://localhost:3000/payment-success',
    cancelUrl: 'http://localhost:3000/payment-fail',
    notifyUrl: 'http://localhost:3000/payment-notify',
    language: 'vi',
};