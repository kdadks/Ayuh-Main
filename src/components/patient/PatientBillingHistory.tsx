import React from 'react';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Invoice } from '../../types';
import { format, parseISO } from 'date-fns';

interface PatientBillingHistoryProps {
  invoices: Invoice[];
}

export function PatientBillingHistory({ invoices }: PatientBillingHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Billed</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">₹{paidAmount.toFixed(2)}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">₹{pendingAmount.toFixed(2)}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary-600" />
            Billing History
          </h2>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices
                .sort((a, b) => new Date(b.issuedDate).getTime() - new Date(a.issuedDate).getTime())
                .map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">Invoice #{invoice.id.toUpperCase()}</h3>
                        <div className={`px-2 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(invoice.status)}`}>
                          {getStatusIcon(invoice.status)}
                          <span className="capitalize">{invoice.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Issued Date</p>
                          <p className="font-medium">{format(parseISO(invoice.issuedDate), 'MMM d, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Due Date</p>
                          <p className="font-medium">{format(parseISO(invoice.dueDate), 'MMM d, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-medium text-lg">₹{invoice.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          {invoice.paidDate && (
                            <>
                              <p className="text-gray-600">Paid Date</p>
                              <p className="font-medium text-green-600">
                                {format(parseISO(invoice.paidDate), 'MMM d, yyyy')}
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Invoice Items */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                        <div className="space-y-1">
                          {invoice.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.description}</span>
                              <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No billing history available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}