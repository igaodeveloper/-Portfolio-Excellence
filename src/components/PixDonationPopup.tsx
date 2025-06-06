import { useEffect, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';

const PIX_KEY = '11982928508';

// Função para calcular CRC16-CCITT (XModem)
function crc16(str: string) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
      crc &= 0xFFFF;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function gerarPayloadPix(chave: string, nome: string, cidade: string) {
  // Remove espaços extras e limita nome/cidade conforme padrão Pix
  const nomeLimpo = nome.trim().toUpperCase().slice(0, 25);
  const cidadeLimpa = cidade.trim().toUpperCase().slice(0, 15);
  // Monta o campo 26 (Merchant Account Information)
  const gui = 'BR.GOV.BCB.PIX';
  const campo26 = [
    '00' + gui.length.toString().padStart(2, '0') + gui,
    '01' + chave.length.toString().padStart(2, '0') + chave,
  ].join('');
  const campo26Completo = '26' + campo26.length.toString().padStart(2, '0') + campo26;
  // Monta o payload EMV
  let payload = '';
  payload += '000201'; // Payload format indicator
  payload += campo26Completo;
  payload += '52040000'; // Merchant category code
  payload += '5303986'; // Currency (986 = BRL)
  // payload += '5404' + valor; // Valor (opcional)
  payload += '5802BR'; // País
  payload += '59' + nomeLimpo.length.toString().padStart(2, '0') + nomeLimpo; // Nome
  payload += '60' + cidadeLimpa.length.toString().padStart(2, '0') + cidadeLimpa; // Cidade
  payload += '62070503***'; // Adicional (Txid)
  // Adiciona campo do CRC
  payload += '6304';
  // Calcula o CRC16 sobre o payload até o campo 6304
  const crc = crc16(payload);
  return payload + crc;
}

const PixDonationPopup = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 12000); // Exibe após 12s
    return () => clearTimeout(timer);
  }, []);

  // Não mostrar novamente se já foi fechado nesta sessão
  useEffect(() => {
    if (open) {
      sessionStorage.setItem('pix_popup_shown', '1');
    }
  }, [open]);

  useEffect(() => {
    if (sessionStorage.getItem('pix_popup_shown')) {
      setOpen(false);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[101] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-full max-w-md p-8 mx-4 bg-white shadow-2xl dark:bg-gray-900 rounded-xl"
          >
            <button
              className="absolute text-gray-400 top-3 right-3 hover:text-gray-700 dark:hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-lg font-bold text-green-700 dark:text-white">Apoie este projeto!</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-white">Faça uma doação via Pix</h3>
            <p className="mb-4 text-base font-semibold text-center text-green-800 dark:text-green-300">
              Sua contribuição faz toda a diferença! 🙏<br/>
              <span className="font-normal text-gray-700 dark:text-gray-200">
                <span className="font-bold text-green-600 dark:text-green-400">Doe agora</span> e faça parte de uma comunidade que acredita no poder do conhecimento livre.<br/>
                Sua doação não é só um apoio — é um voto de confiança para que o projeto evolua, ganhe <span className="font-bold">novas funcionalidades</span>, expanda o <span className="font-bold">blog</span> e produza <span className="font-bold">novos vídeos</span> para impactar ainda mais pessoas.<br/>
                <span className="italic">Quando você contribui, você inspira outros a fazerem o mesmo (prova social) e garante que juntos vamos mais longe (pertencimento).</span><br/>
                <span className="font-semibold text-green-700 dark:text-green-300">Aproveite essa oportunidade de retribuir e transformar o futuro do projeto!</span><br/>
                <span className="italic">A generosidade de hoje é o sucesso de amanhã — juntos, transformamos vidas!</span>
              </span>
            </p>
            <div className="flex flex-col items-center mb-4">
              {/* QR Code Pix */}
              <div className="p-2 mb-3 bg-white rounded-lg shadow dark:bg-gray-800">
                <QRCode value={gerarPayloadPix(PIX_KEY, 'Igor Costa Oliveira', 'SAO PAULO')} size={140} />
              </div>
              <span className="mb-2 text-xs text-center text-gray-500">Escaneie para doar via Pix</span>
              <span className="px-4 py-2 mb-2 font-mono text-lg text-blue-600 bg-gray-100 rounded-lg select-all dark:bg-gray-800">{PIX_KEY}</span>
              <Button
                className="font-semibold text-white bg-green-600 hover:bg-green-700"
                onClick={handleCopy}
              >
                {copied ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Copiado!</span>
                ) : (
                  'Copiar chave Pix'
                )}
              </Button>
            </div>
            <span className="block mt-1 text-xs text-center text-gray-400">Muito obrigado pelo seu apoio! 🙏</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PixDonationPopup; 