import React, { useRef, useState } from 'react';
import { Upload, ExternalLink, QrCode } from 'lucide-react';

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  fileUrl?: string;
  verifyUrl?: string;
};

// Mock de certificados
const initialCertificates: Certificate[] = [
  {
    id: 1,
    title: 'React Avançado',
    issuer: 'Rocketseat',
    year: '2023',
    verifyUrl: 'https://credly.com/badges/123456',
  },
  {
    id: 2,
    title: 'Especialista UX/UI',
    issuer: 'Alura',
    year: '2022',
    verifyUrl: 'https://linkedin.com/in/seu-perfil/certificates/654321',
  },
];

export const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock de upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertificates((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: file.name.replace(/\.[^/.]+$/, ''),
          issuer: 'Upload Manual',
          year: new Date().getFullYear().toString(),
          fileUrl: URL.createObjectURL(file),
        },
      ]);
    }
  };

  return (
    <section className="w-full max-w-3xl py-12 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center text-modern-accent">Certificados Verificáveis</h2>
      <div className="mb-6 flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-modern-accent text-white rounded shadow hover:scale-105 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-5 h-5" /> Adicionar Certificado
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-4 bg-modern-darker rounded-lg border border-modern-accent/20 flex flex-col gap-2">
            <div className="font-semibold text-modern-accent2 text-lg">{cert.title}</div>
            <div className="text-modern-gray text-sm">{cert.issuer} • {cert.year}</div>
            <div className="flex gap-2 mt-2">
              {cert.verifyUrl && (
                <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-modern-accent hover:underline">
                  <ExternalLink className="w-4 h-4" /> Verificar
                </a>
              )}
              {cert.fileUrl && (
                <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-modern-accent hover:underline">
                  <QrCode className="w-4 h-4" /> QR/Arquivo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection; 