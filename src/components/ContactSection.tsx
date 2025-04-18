import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedTitle, AnimatedWords } from '@/components/ui/animated-text';
import { fadeIn, staggerContainer, pulseVariants } from '@/lib/animations';
import { PulsatingIcon } from '@/components/ui/floating-icon';

const contacts = [
  {
    icon: <Mail className="w-6 h-6 text-[#00D2DF]" />,
    title: 'Email',
    value: 'contato@exemplo.com',
    link: 'mailto:contato@exemplo.com',
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#00D2DF]" />,
    title: 'Localização',
    value: 'São Paulo, Brasil',
    link: 'https://maps.google.com/?q=São+Paulo,Brasil',
  },
];

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitting(true);

    // Simulando uma requisição com atraso
    setTimeout(() => {
      console.log('Formulário enviado:', formState);
      setFormState({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-[#121214] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 rounded-full bg-modern-accent/5 blur-3xl"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />

      <motion.div
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-modern-accent2/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <AnimatedTitle
            text="Contato"
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          />

          <AnimatedWords
            text="Interessado em trabalhar juntos? Preencha o formulário abaixo ou entre em contato através das minhas redes sociais."
            className="text-[#C4C4CC] max-w-2xl mx-auto"
            delayOffset={0.2}
          />
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={fadeIn('right', 0.2)} className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Vamos conversar</h3>
            <p className="text-[#C4C4CC]">
              Estou sempre aberto para discutir novos projetos, ideias criativas
              ou oportunidades para fazer parte da sua visão.
            </p>

            <motion.div
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  variants={fadeIn('up', 0.1 * index)}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <a
                    href={contact.link}
                    className="flex items-start space-x-4 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      className="bg-[#202024] p-3 rounded-lg group-hover:bg-[#00D2DF]/10 transition-colors duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-white">
                        {contact.title}
                      </h4>
                      <p className="text-[#C4C4CC] group-hover:text-[#00D2DF] transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeIn('up', 0.4)} className="pt-8">
              <Button
                variant="outline"
                className="group border-[#00D2DF]/20 text-[#00D2DF] hover:bg-[#00D2DF]/10 hover:border-[#00D2DF]/30"
                onClick={() => window.open('https://calendly.com', '_blank')}
              >
                <span>Agende uma reunião</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                  className="ml-2"
                >
                  <ArrowRight size={16} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.3)}
            className="bg-[#202024] rounded-lg p-8 relative overflow-hidden"
          >
            {/* Form decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#00D2DF]/5 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {isSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full py-10 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
              >
                <PulsatingIcon
                  icon={<Send className="text-[#00D2DF] w-12 h-12" />}
                  pulseColor="rgba(0, 210, 223, 0.2)"
                  className="mb-6"
                />
                <h3 className="text-xl font-bold text-white mb-3">
                  Mensagem enviada!
                </h3>
                <p className="text-[#C4C4CC] max-w-md">
                  Obrigado por entrar em contato. Responderei sua mensagem o
                  mais breve possível.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
                variants={staggerContainer(0.07, 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn('up', 0)}>
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
                    className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A] focus:border-[#00D2DF] transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeIn('up', 0.1)}>
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
                    className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A] focus:border-[#00D2DF] transition-colors"
                  />
                </motion.div>

                <motion.div variants={fadeIn('up', 0.2)}>
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
                    className="bg-[#121214] border-[#323238] text-white placeholder:text-[#7C7C8A] focus:border-[#00D2DF] transition-colors min-h-[120px]"
                  />
                </motion.div>

                <motion.div
                  variants={fadeIn('up', 0.3)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#00D2DF] hover:bg-[#00D2DF]/80 text-[#121214] font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="flex items-center"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-transparent border-t-[#121214] animate-spin" />
                        Enviando...
                      </motion.div>
                    ) : (
                      <>
                        Enviar mensagem
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
