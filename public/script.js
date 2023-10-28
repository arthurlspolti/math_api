$(document).ready(function () {
  let chart;

  $(document).ready(function () {
    $("#formularioJuros").on("submit", function (event) {
      event.preventDefault(); // Adicione esta linha
      let valorPrincipal = $("#valorPrincipal").val();
      let taxaDeJuros = $("#taxaDeJuros").val();
      let tempo = $("#tempo").val();

      $.ajax({
        url: "/api/calcularJuros",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ valorPrincipal, taxaDeJuros, tempo }),
        success: function (data) {
          console.log(data);
          $("#resultado").text("Montante: " + data.montante);
          if (chart) {
            chart.destroy();
          }
          // Cria o gráfico
          let ctx = document.getElementById("myChart").getContext("2d");
          let labels = Array.from({ length: tempo }, (_, i) => i + 1);
          chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Valor Principal",
                  data: labels.map(() => valorPrincipal),
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
                {
                  label: "Juros",
                  data: labels.map((_, i) => (data.juros * (i + 1)) / tempo),
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Gráfico de Juros Simples",
                },
              },
              interaction: {
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            },
          });
        },
      });
    });
  });
});
