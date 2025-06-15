import React from 'react';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  Building
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { PaymentRecord } from '../../types';
import { format, parseISO } from 'date-fns';

interface PatientPaymentHistoryProps {
  payments: PaymentRecord[];
}

export function PatientPaymentHistory({ payments }: PatientPaymentHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'refunded':
        return <RotateCcw className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer':
        return <Building className="h-4 w-4" />;
      case 'cash':
        return <DollarSign className="h-4 w-4" />;
      case 'insurance':
        return <Building className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      case 'insurance':
        return 'Insurance';
      default:
        return method;
    }
  };

  const totalPaid = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const completedPayments = payments.filter(payment => payment.status === 'completed').length;
  const pendingPayments = payments.filter(payment => payment.status === 'pending').length;
  const failedPayments = payments.filter(payment => payment.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">₹{totalPaid.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedPayments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{failedPayments}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-primary-600" />
            Payment History
          </h2>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <div className="space-y-4">
              {payments
                .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())
                .map((payment) => (
                <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">Payment #{payment.id.toUpperCase()}</h3>
                          {payment.transactionId && (
                            <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                              {payment.transactionId}
                            </span>
                          )}
                        </div>
                        <div className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span className="capitalize">{payment.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Payment Date</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {format(parseISO(payment.paymentDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-medium text-lg text-gray-900">₹{payment.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment Method</p>
                          <p className="font-medium flex items-center">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span className="ml-1">{getPaymentMethodLabel(payment.paymentMethod)}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Invoice</p>
                          <p className="font-medium text-primary-600 hover:text-primary-800 cursor-pointer">
                            #{payment.invoiceId.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No payment history available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}