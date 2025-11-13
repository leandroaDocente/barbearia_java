document.getElementById('agendamento-form').addEventListener('submit', function(event) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault();

    const form = event.target;
    const mensagemEl = document.getElementById('mensagem');

    // Validação (embora o 'required' no HTML já faça isso) [cite: 33]
    if (!form.checkValidity()) {
        mensagemEl.textContent = 'Erro: Todos os campos são obrigatórios.';
        mensagemEl.style.color = 'red';
        return;
    }

    // Coleta os dados do formulário
    const dados = {
        nomeCliente: form.nomeCliente.value,
        telefoneCliente: form.telefoneCliente.value,
        emailCliente: form.emailCliente.value,
        dataAgendamento: form.dataAgendamento.value,
        horaAgendamento: form.horaAgendamento.value,
        servicoDesejado: form.servicoDesejado.value
    };

    // Envia os dados para a API Java (Spring Boot)
    fetch('http://localhost:8080/api/agendamentos', { // O endpoint do Controller
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar agendamento.');
        }
        return response.json();
    })
    .then(data => {
        mensagemEl.textContent = 'Agendamento realizado com sucesso!';
        mensagemEl.style.color = 'green';
        form.reset(); // Limpa o formulário
    })
    .catch((error) => {
        mensagemEl.textContent = `Erro: ${error.message}`;
        mensagemEl.style.color = 'red';
    });
});