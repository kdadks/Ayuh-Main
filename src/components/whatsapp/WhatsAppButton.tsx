import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '919050471087'; // Remove + and spaces for the URL
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <Button
      onClick={() => window.open(whatsappUrl, '_blank')}
      className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg"
    >
      <Phone className="h-5 w-5" />
      Chat on WhatsApp
    </Button>
  );
};
