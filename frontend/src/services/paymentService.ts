import api from './api';

export interface PaymentOrderResponse {
    success: boolean;
    message: string;
    data: {
        orderId: string;
        amount: number; // in paise
        currency: string;
        keyId: string;
        isMock: boolean;
        courseDetails: {
            id: number;
            title: string;
            price: string;
            discountAmount: number;
            finalPrice: number;
        };
    };
}

export interface VerifyPaymentPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature?: string;
}

export interface VerifyPaymentResponse {
    success: boolean;
    message: string;
    data: {
        payment: {
            id: number;
            razorpay_order_id: string;
            razorpay_payment_id: string;
            amount: string;
            status: string;
        };
        enrollment: {
            id: number;
            status: string;
        };
        invoice: {
            id: number;
            invoice_number: string;
            total: string;
        };
    };
}

export interface PaymentHistoryItem {
    id: number;
    course_id: number;
    course_title: string;
    course_image: string | null;
    coupon_code: string | null;
    razorpay_order_id: string;
    razorpay_payment_id: string | null;
    amount: string;
    status: string;
    invoice_id: number | null;
    invoice_number: string | null;
    created_at: string;
}

export interface InvoiceDetail {
    id: number;
    payment_id: number;
    invoice_number: string;
    billing_details: {
        fullName: string;
        email: string;
        phone: string;
        courseTitle: string;
        verifiedAt: string;
    };
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
    created_at: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    amount: string;
    currency: string;
    payment_status: string;
    course_title: string;
    course_duration: string;
    course_original_price?: string;
    course_discount_price?: string;
    user_name: string;
    user_email: string;
}

export interface CouponResponse {
    success: boolean;
    message: string;
    data: {
        code: string;
        discountType: 'percentage' | 'flat';
        discountValue: number;
        discountAmount: number;
        finalPrice: number;
    };
}

export const paymentService = {
    /**
     * Creates a payment order for a specific course and optionally applies a coupon code.
     */
    createOrder: async (courseId: number | string, couponCode?: string): Promise<PaymentOrderResponse> => {
        const response = await api.post<PaymentOrderResponse>('/payment/create-order', {
            courseId: Number(courseId),
            couponCode
        });
        return response.data;
    },

    /**
     * Verifies the Razorpay payment signature and activates enrollment.
     */
    verifyPayment: async (payload: VerifyPaymentPayload): Promise<VerifyPaymentResponse> => {
        const response = await api.post<VerifyPaymentResponse>('/payment/verify', payload);
        return response.data;
    },

    /**
     * Retrieves the student's personal payment transactions list.
     */
    getHistory: async (): Promise<{ success: boolean; data: PaymentHistoryItem[] }> => {
        const response = await api.get<{ success: boolean; data: PaymentHistoryItem[] }>('/payment/history');
        return response.data;
    },

    /**
     * Retrieves detail information for an invoice receipt.
     */
    getInvoice: async (invoiceId: number | string): Promise<{ success: boolean; data: InvoiceDetail }> => {
        const response = await api.get<{ success: boolean; data: InvoiceDetail }>(`/payment/invoice/${invoiceId}`);
        return response.data;
    },

    /**
     * Validates and previews a coupon application.
     */
    applyCoupon: async (couponCode: string, courseId: number | string): Promise<CouponResponse> => {
        const response = await api.post<CouponResponse>('/coupon/apply', {
            couponCode,
            courseId: Number(courseId)
        });
        return response.data;
    }
};
