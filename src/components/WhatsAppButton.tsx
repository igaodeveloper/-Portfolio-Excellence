import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({ phoneNumber, message = "Olá! Vim através do seu portfólio." }: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-green-600 text-white p-3 md:px-5 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-all duration-300"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-5 h-5 md:mr-2" />
      <span className="hidden md:inline font-medium">Chame no Whatsapp</span>
    </motion.button>
  );
} 