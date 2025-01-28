type Method = {
   label: string, // Paypal, RazorPay, Stripe
   currency: number | string
}

type Payment = {
    data: any,
    token: string,
    method: Method,
    amount: string | number,
    entity: any,
    term: number
}

type VerifyPayment = {
    id: string,
    payment: any
}

export type {
    Payment,
    Method,
    VerifyPayment
}