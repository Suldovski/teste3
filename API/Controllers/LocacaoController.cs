using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/locacao")]
public class LocacaoController : ControllerBase
{
    private readonly AppDataContext _context;

    public LocacaoController(AppDataContext context)
    {
        _context = context;
    }

    [HttpPost("retirar")]
    public IActionResult Retirar([FromBody] Locacao locacao)
    {
        locacao.ValorDiaria = locacao.Categoria switch
        {
            "Hatch" => 100.00,
            "Sedan" => 150.00,
            "SUV" => 250.00,
            _ => 0
        };

        locacao.ValorTotalPrevisto = locacao.DiasPrevistos * locacao.ValorDiaria;
        locacao.Status = "Em Aberto";
        locacao.TotalFinal = 0;

        _context.Locacoes.Add(locacao);
        _context.SaveChanges();

        return Created("", locacao);
    }

    [HttpGet("listar")]
    public IActionResult Listar()
    {
        var locacoes = _context.Locacoes.ToList();
        return Ok(locacoes);
    }

    [HttpPatch("devolver/{id}")]
    public IActionResult Devolver(int id, [FromBody] DevolucaoRequest request)
    {
        var locacao = _context.Locacoes.Find(id);

        if (locacao == null)
        {
            return NotFound();
        }

        if (locacao.Status == "Concluído")
        {
            return BadRequest(new { message = "Esta locação já foi concluída." });
        }

        double calculoBase = request.DiasReais * locacao.ValorDiaria;
        double totalFinal = calculoBase;

        if (request.DiasReais > locacao.DiasPrevistos)
        {
            int diasExcedentes = request.DiasReais - locacao.DiasPrevistos;
            double multaAtraso = diasExcedentes * locacao.ValorDiaria * 0.5;
            totalFinal += multaAtraso;
        }

        if (request.TemAvaria)
        {
            totalFinal += 500.00;
        }

        locacao.TotalFinal = totalFinal;
        locacao.Status = "Concluído";
        locacao.DataDevolucaoReal = DateTime.Now.ToString("yyyy-MM-dd");

        _context.SaveChanges();

        return Ok(locacao);
    }

    [HttpGet("atrasados")]
    public IActionResult Atrasados()
    {
        var locacoesAtrasadas = _context.Locacoes
            .Where(l => l.Status == "Em Aberto" && l.DiasPrevistos > 30)
            .ToList();

        return Ok(locacoesAtrasadas);
    }
}

public class DevolucaoRequest
{
    public int DiasReais { get; set; }
    public bool TemAvaria { get; set; }
}
