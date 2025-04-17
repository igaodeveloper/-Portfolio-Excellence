import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: "", email: "", message: "" });
    // Show success message (would be implemented with a toast in a real app)
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#121214]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contato
          </h2>
          <p className="text-[#C4C4CC] max-w-2xl mx-auto">
            Interessado em trabalhar juntos? Preencha o formulário abaixo ou
            entre em contato através das minhas redes sociais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white">Vamos conversar</h3>
            <p className="text-[#C4C4CC]">
              Estou sempre aberto para discutir novos projetos, ideias criativas
              ou oportunidades para fazer parte da sua visão.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#202024] p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-[#00D2DF]" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Email</h4>
                  <p className="text-[#C4C4CC]">contato@exemplo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#202024] p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-[#00D2DF]" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Localização</h4>
                  <p className="text-[#C4C4CC]">São Paulo, Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#202024] rounded-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Seu email"
                  required
                  className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem"
                  required
                  className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A] min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00D2DF] hover:bg-[#00D2DF]/80 text-[#121214] font-medium"
              >
                Enviar mensagem
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
