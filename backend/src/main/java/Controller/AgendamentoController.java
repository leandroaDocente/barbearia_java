package Controller;

import Entity.Agendamento;
import Repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Endpoint para CADASTRAR novo agendamento
    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Agendamento agendamento) {
        agendamento.setNomeCliente(agendamento.getNomeCliente());
        agendamento.setTelefoneCliente(agendamento.getTelefoneCliente());
        agendamento.setEmailCliente(agendamento.getEmailCliente());
        agendamento.setDataAgendamento(agendamento.getDataAgendamento());
        agendamento.setHoraAgendamento(agendamento.getHoraAgendamento());
        agendamento.setServicoDesejado(agendamento.getServicoDesejado());

        Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(novoAgendamento);
    }
}