const razorpay = require ("../Config/Razorpay_Client.js");
const orderService = require ("../Services/orderService.js");

const createPaymentLink =  async (orderId) =>{

    try {

        const order = await orderService.findOrderById(orderId);
        const paymentLinkRequest ={
            amount:order.totalPrice*100,
            currency:"INR",
            customer:{
                name:order.user.firstName +""+ order.user.lastName,
                contact:order.user.mobile,
                email:order.user.email
            },
            notify:{
                sms:true,
                email:true

            },
            reminder_enable:true,
            callback_url:`http://localhost:5173/payment/${orderId}`,
            callback_method:'get'

        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }
        return resData;
       
        
    } catch (error) {

        throw new Error(error.message)
        
    }

}

const updatePaymentInformation = async (reqData) =>{

    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";
            await order.save()
        }

        const resData = {message:"Your Order Is Placed",success:true}
         return resData;
    } catch (error) {
        throw new Error(error.message)

    }
}


module.exports ={
    createPaymentLink,
    updatePaymentInformation
}