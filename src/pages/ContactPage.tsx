import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Mail, MessageSquare, Send, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { toast } from "../components/ui/use-toast";
import { useToast } from "../components/ui/use-toast";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }).max(50),
  email: z.string().email({ message: "Email inválido." }),
  subject: z.string().min(5, { message: "O assunto deve ter pelo menos 5 caracteres." }).max(100),
  service: z.string().optional(),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }).max(1000),
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const { toast } = useToast();

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      service: "",
      message: "",
    },
  });

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form data:", data);
      
      form.reset();
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Retornarei em breve.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-950" : "bg-gray-50"}`}>
      <Navbar />
      
      <header className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar para o blog</span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contato</h1>
            <p className="text-xl opacity-90">
              Tem uma pergunta, proposta ou projeto? Ou apenas quer dizer olá? Entre em contato!
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Informações de Contato</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">contato@example.com</p>
                    <a 
                      href="mailto:contato@example.com" 
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center mt-1"
                    >
                      Enviar email
                      <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">Telefone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+55 (11) 99999-9999</p>
                    <a 
                      href="tel:+5511999999999" 
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center mt-1"
                    >
                      Ligar agora
                      <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">Localização</h3>
                    <p className="text-gray-600 dark:text-gray-400">São Paulo, Brasil</p>
                    <a 
                      href="https://maps.google.com/?q=São+Paulo,+Brasil" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-flex items-center mt-1"
                    >
                      Ver no mapa
                      <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-bold dark:text-white">Conecte-se comigo</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>
              
              <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 dark:text-white">Horário de Disponibilidade</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Segunda - Sexta:</span>
                    <span className="font-medium dark:text-white">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sábado:</span>
                    <span className="font-medium dark:text-white">10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Domingo:</span>
                    <span className="font-medium dark:text-white">Fechado</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  * Horário de Brasília (GMT-3)
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Envie uma Mensagem</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input placeholder="Assunto da mensagem" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serviço (opcional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um serviço" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="web-development">Desenvolvimento Web</SelectItem>
                              <SelectItem value="ui-design">UI/UX Design</SelectItem>
                              <SelectItem value="consultancy">Consultoria</SelectItem>
                              <SelectItem value="mentoring">Mentoria</SelectItem>
                              <SelectItem value="other">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Selecione o serviço que melhor descreve sua necessidade.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva seu projeto ou deixe sua mensagem..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium dark:text-white">Resposta Rápida</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Eu respondo a todas as mensagens dentro de 24 horas. Aguarde meu retorno!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">Perguntas Frequentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 dark:text-white">
                  Qual é o prazo médio para desenvolvimento de um projeto?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  O prazo varia conforme a complexidade do projeto. Um site simples pode levar 
                  2-3 semanas, enquanto projetos mais complexos podem levar alguns meses. Sempre 
                  discutimos prazos específicos durante o briefing inicial.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 dark:text-white">
                  Quais são seus valores para desenvolvimento de sites?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Os valores dependem da complexidade, funcionalidades e tecnologias necessárias. 
                  Trabalhamos com orçamentos transparentes, detalhando cada aspecto do projeto para 
                  que você saiba exatamente pelo que está pagando.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 dark:text-white">
                  Você oferece manutenção após a entrega do projeto?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sim! Ofereço pacotes de manutenção mensal que incluem atualizações, correções, 
                  backups e pequenas melhorias. Também disponibilizo treinamento para que sua equipe 
                  possa gerenciar conteúdos básicos.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 dark:text-white">
                  Você trabalha com clientes internacionais?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutamente! Trabalho com clientes de diversos países. A comunicação é feita em 
                  português ou inglês, e as reuniões são agendadas considerando os diferentes fusos horários.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Não encontrou resposta para sua pergunta?
              </p>
              <Button asChild>
                <a href="mailto:contato@example.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Envie sua pergunta
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage; 