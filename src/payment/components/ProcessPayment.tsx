// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable react/prop-types */
// import * as Yup from 'yup';
// import Proptypes from 'prop-types';
// import { USD_TO_INR } from '../../utils/config';
// import { razorPay } from '../../utils/paymentFunctions';
// import { Grid, Modal, Text, FormWrapper } from '@helpdice/ui';
// import { getExchangeRates } from '../../utils/exchangeRates.js';
// import { toast } from 'react-toastify';

// const PAYMENT_SERVICE = [
//     { label: 'Razor Pay', currency: 'INR', enable: true },
//     { label: 'Paypal', currency: 'USD', enable: false },
//     { label: 'Stripe', currency: 'USD', enable: false }
// ];

// type ProcessPaymentProps = {
//     visible: boolean;
//     setVisible?: () => void;
//     currency: string;
//     amount: number;
//     entity?: string;
//     term?: string;
//     data?: any;
//     token?: string;
//     paymentFn?: () => void;
//     verifyFn?: () => void;
//     onComplete?: (result?: any) => void
// }

// function ProcessPayment({
//     visible = false,
//     setVisible = () => {},
//     currency,
//     amount = 0,
//     entity,
//     term,
//     data,
//     token,
//     paymentFn,
//     verifyFn,
//     onComplete = (result) => {}
// }: ProcessPaymentProps) {
//     return (
//         <FormWrapper
//             enableReinitialize
//             initialValues={{
//                 data: data,
//                 token: token ?? '',
//                 method: {
//                     label: 'Paypal',
//                     currency: currency
//                 },
//                 amount: amount,
//                 entity: entity,
//                 term: 1
//             }}
//             validationSchema={Yup.object().shape({
//                 method: Yup.object().shape({
//                     label: Yup.string().required('Please select Payment Service'),
//                     currency: Yup.string().required('Please select Payment Service'),
//                     enable: Yup.bool().required()
//                 }),
//                 term: Yup.string(),
//                 token: Yup.string(),
//                 data: Yup.object()
//             })}
//             onSubmit={async (values, { resetForm, setSubmitting }) => {
//                 // console.log('Process Payment');
//                 return toast.promise(paymentFn({ ...values, order: data?.order }), {
//                     pending: 'Processing Payment...',
//                     success: {
//                         render({ data }) {
//                             // const order = data.order;
//                             const options = data.options;
//                             options.handler = async (response) => {
//                                 toast.dismiss();
//                                 const body = {
//                                     id: values.data._id,
//                                     payment: response
//                                 };
//                                 toast
//                                     .promise(verifyFn(body), {
//                                         pending: 'Verifying Payment...',
//                                         success: {
//                                             render({ data }) {
//                                                 setVisible(null);
//                                                 return data.message;
//                                             }
//                                         },
//                                         error: {
//                                             render({ data }) {
//                                                 // When the promise reject, data will contains the error
//                                                 return data.message;
//                                             }
//                                         }
//                                     })
//                                     .then(() => {
//                                         cache.invalidateQueries('susbscriptions');
//                                     });
//                                 // const validateRes = await fetch('http://localhost:5000/order/validate', {
//                                 //     method: 'POST',
//                                 //     body: JSON.stringify(body),
//                                 //     headers: {
//                                 //         'Content-Type': 'application/json'
//                                 //     }
//                                 // });
//                                 // const jsonRes = await validateRes.json();
//                                 // console.log(jsonRes);
//                             };
//                             var rzp1 = new window.Razorpay(data.options);
//                             rzp1.on('payment.failed', function (response) {
//                                 toast.dismiss();
//                                 toast.error('Payment Failed, Please Try Again Later');
//                                 // alert(response.error.code);
//                                 // alert(response.error.description);
//                                 // alert(response.error.source);
//                                 // alert(response.error.step);
//                                 // alert(response.error.reason);
//                                 // alert(response.error.metadata.order_id);
//                                 // alert(response.error.metadata.payment_id);
//                             });
//                             rzp1.open();
//                             return data.message;
//                         },
//                         icon: '🟢'
//                     },
//                     error: {
//                         render({ data }) {
//                             // When the promise reject, data will contains the error
//                             return data.message;
//                         }
//                     }
//                 });
//             }}
//         >
//             {({ handleChange, handleSubmit, setFieldValue, isSubmitting, values, errors }) => {
//                 // console.log(values);
//                 console.log(errors);
//                 return (
//                     <form noValidate onSubmit={handleSubmit}>
//                         <Modal visible={visible}>
//                             <Modal.Title>Payment Information</Modal.Title>
//                             {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
//                             <Modal.Content>
//                                 <Grid.Container gap={1.5}>
//                                     <Grid xs={24}>
//                                         <InputLabel>Select Service</InputLabel>
//                                     </Grid>
//                                     {PAYMENT_SERVICE.map((mhd, inx) => (
//                                         <Grid key={`${inx}-payment-service`} xs={12} sm={8}>
//                                             <div
//                                                 onClick={async () => {
//                                                     setFieldValue('method', { ...mhd });
//                                                     const rate = await getExchangeRates(currency, mhd?.currency);
//                                                     setFieldValue('amount', (Number(amount) * rate).toFixed(2));
//                                                 }}
//                                                 style={{
//                                                     width: '100%',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                     height: 60,
//                                                     cursor: 'pointer',
//                                                     position: 'relative',
//                                                     border: `2px solid ${values.method?.label === mhd.label ? '#333' : '#dcdcdc'}`,
//                                                     borderRadius: '10px'
//                                                 }}
//                                             >
//                                                 <Text h6>{mhd.label}</Text>
//                                                 <Typography
//                                                     sx={{ position: 'absolute', bottom: 0, right: 0, mr: 1, mb: 0.3 }}
//                                                     variant="subtitle2"
//                                                 >
//                                                     {mhd.currency}
//                                                 </Typography>
//                                             </div>
//                                         </Grid>
//                                     ))}
//                                     {errors.method && (
//                                         <Grid xs={24}>
//                                             <Typography sx={{ mt: 0.5 }} color="error">
//                                                 {errors.method.label}
//                                             </Typography>{' '}
//                                         </Grid>
//                                     )}
//                                     {term && (
//                                         <Grid xs={24}>
//                                             <InputLabel>Payment Term</InputLabel>
//                                             <FormControl sx={{ mt: 2, width: 250 }} required>
//                                                 <Select
//                                                     inputProps={{
//                                                         name: 'term',
//                                                         id: 'payment_term'
//                                                     }}
//                                                     value={values.term}
//                                                     onChange={handleChange}
//                                                 >
//                                                     <MenuItem value="" disabled>
//                                                         Choose Term
//                                                     </MenuItem>
//                                                     {[
//                                                         { label: '1 Month', value: 1 },
//                                                         { label: '12 Month', value: 12 },
//                                                         { label: '24 Month', value: 24 },
//                                                         { label: '36 Month', value: 36 }
//                                                     ].map((term, inx) => (
//                                                         <MenuItem key={`id-term-${inx}`} value={term.value}>
//                                                             {term.label}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             </FormControl>
//                                         </Grid>
//                                     )}
//                                     <Grid xs={24}>
//                                         <div>
//                                             <InputLabel>Payment Amount</InputLabel>
//                                             <Typography sx={{ mt: 2 }}>
//                                                 {formatCurrency(values.amount, null, values.method?.currency)}
//                                             </Typography>
//                                         </div>
//                                     </Grid>
//                                 </Grid.Container>
//                                 {/* <Stack spacing={1}> */}
//                                 {/* <Typography sx={{ color: '#333' }} variant="subtitle2">
//                                     Card Holder Name
//                                 </Typography>
//                                 <TextField autoComplete="off" style={{ width: '100%' }} />
//                                 <br />
//                                 <CardElement options={CARD_ELEMENT_OPTIONS} />
//                                 <br />
//                                 {errors && (
//                                     <Typography variant="subtitle2" color="danger">
//                                         {errors}
//                                     </Typography>
//                                 )}
//                                 <button style={{ cursor: 'pointer' }} type="submit" className="button">
//                                     CheckOut
//                                 </button> */}
//                                 {/* </Stack> */}
//                             </Modal.Content>
//                             <Modal.Action
//                                 passive
//                                 onClick={() => {
//                                     setVisible(null);
//                                     toast.dismiss();
//                                 }}
//                             >
//                                 Cancel
//                             </Modal.Action>
//                             {/* {console.log(values.method)} */}
//                             <Modal.Action disabled={!values.method?.enable} onClick={handleSubmit} type="submit" loading={isSubmitting}>
//                                 Pay Now
//                             </Modal.Action>
//                         </Modal>
//                     </form>
//                 );
//             }}
//         </FormWrapper>
//     );
// }

// ProcessPayment.prototype = {
//     paymentFn: Proptypes.func.isRequired,
//     verifyFn: Proptypes.func.isRequired
// };

// export default ProcessPayment;
