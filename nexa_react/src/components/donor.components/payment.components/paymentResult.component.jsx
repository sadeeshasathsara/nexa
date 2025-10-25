import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentResult = ({ onBack }) => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const payment = searchParams.get('payment');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Simulate checking payment status
    const checkPaymentStatus = async () => {
      try {
        // In a real implementation, you would call your API to verify payment status
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPaymentStatus({
          success: payment === 'success',
          orderId: orderId,
          message: payment === 'success' 
            ? 'Your donation has been processed successfully!' 
            : payment === 'cancelled'
            ? 'Payment was cancelled. You can try again anytime.'
            : 'Payment failed. Please try again or contact support.'
        });
      } catch (error) {
        setPaymentStatus({
          success: false,
          orderId: orderId,
          message: 'Unable to verify payment status. Please contact support.'
        });
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [payment, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (paymentStatus.success) {
      return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
    } else if (payment === 'cancelled') {
      return <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />;
    } else {
      return <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
    }
  };

  const getStatusColor = () => {
    if (paymentStatus.success) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (payment === 'cancelled') {
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else {
      return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Payment Status</h1>
        </div>

        {/* Payment Result Card */}
        <div className={`rounded-xl border-2 p-8 text-center ${getStatusColor()}`}>
          {getStatusIcon()}
          
          <h2 className="text-2xl font-bold mb-4">
            {paymentStatus.success ? 'Payment Successful!' : 'Payment Issue'}
          </h2>
          
          <p className="text-lg mb-6">
            {paymentStatus.message}
          </p>

          {paymentStatus.orderId && (
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
              <p className="font-mono text-sm font-medium">{paymentStatus.orderId}</p>
            </div>
          )}

          {paymentStatus.success && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">What happens next?</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• You'll receive a confirmation email shortly</li>
                  <li>• Your donation will be processed within 24 hours</li>
                  <li>• You can track your impact in the dashboard</li>
                  <li>• Thank you for supporting student education!</li>
                </ul>
              </div>
            </div>
          )}

          {!paymentStatus.success && payment !== 'cancelled' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Need help?</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Check your payment method and try again</li>
                  <li>• Contact our support team for assistance</li>
                  <li>• Verify your payment details are correct</li>
                  <li>• Try using a different payment method</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={onBack}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
            
            {!paymentStatus.success && (
              <button
                onClick={() => window.location.href = '/donor/dashboard?action=donate'}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              SSL Encrypted
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              PCI DSS Compliant
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Secure Processing
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Data Protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
