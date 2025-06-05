export async function subscribeToMailchimp(name: string, email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = import.meta.env.VITE_MAILCHIMP_API_KEY;
  const audienceId = import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = import.meta.env.VITE_MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !audienceId || !serverPrefix) {
    return { success: false, message: 'Mailchimp não configurado corretamente.' };
  }

  // Mailchimp exige autenticação básica (apiKey como usuário)
  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: { FNAME: name },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('anystring:' + apiKey)}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200 || response.status === 201) {
      return { success: true, message: 'Inscrição realizada com sucesso!' };
    } else {
      const error = await response.json();
      if (error.title === 'Member Exists') {
        return { success: true, message: 'Você já está inscrito na newsletter!' };
      }
      return { success: false, message: error.detail || 'Erro ao inscrever.' };
    }
  } catch (err) {
    return { success: false, message: 'Erro de conexão com o Mailchimp.' };
  }
} 