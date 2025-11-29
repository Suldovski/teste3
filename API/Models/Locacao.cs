namespace API.Models;

public class Locacao
{
    public int Id { get; set; }
    public string? Cliente { get; set; }
    public string? Cpf { get; set; }
    public string? Veiculo { get; set; }
    public string? Categoria { get; set; }
    public int DiasPrevistos { get; set; }
    public double ValorDiaria { get; set; }
    public double ValorTotalPrevisto { get; set; }
    public string Status { get; set; } = "Em Aberto";
    public string? DataRetirada { get; set; }
    public string? DataDevolucaoReal { get; set; }
    public double? TotalFinal { get; set; }
}
