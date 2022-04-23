$('#botao-placar').click(mostrarPlacar);
$('#botao-sync').click(sincronizaPlacar);

function inserirPlacar(){
    var corpoTabela = $('.placar').find('tbody');
    var usuario = $('#usuarios').val();
    var numPalavras = $('#contador-palavras').text();var btnRemover = "<a href='#' class='botao-remover'><i class='small material-icons'>delete_outline</i></a>";

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removerPlacar);

    if(numPalavras>0){
        corpoTabela.prepend(linha);
        $('.placar').slideDown(500)
        scrollPlacar();
    }
    
}

function novaLinha(usuario, numPalavras){
    var linha = $("<tr>");
    var colUsuario = $("<td>").text(usuario);
    var colPalavras = $("<td>").text(numPalavras);    
    var colRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete_outline");

    link.append(icone);
    colRemover.append(link);
    linha.append(colUsuario);
    linha.append(colPalavras);
    linha.append(colRemover);

    return linha;
}

function removerPlacar(e){ 
    e.preventDefault();
    var linha = $(this).parent().parent()
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    }, 1000);
}

function mostrarPlacar(){
    $('.placar').stop().slideToggle(600);
}

function scrollPlacar(){
    var posicaoPlacar = $('.placar').offset().top;
    $('body, html').animate({scrollTop: posicaoPlacar+"px"}, 1000);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $('tbody>tr');
    linhas.each(function(){
        var usuario = $(this).find('td:nth-child(1)').text();
        var palavras = $(this).find('td:nth-child(2)').text();

        var score = { 
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    var dados = { placar: placar};

    $.post('http://localhost:3000/placar', dados, function(){
        $('.tooltip').tooltipster('open');
    }).fail(function(){
        setTimeout(function(){
            $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao Sincronizar');
        }, 1500)
    }).always(function(){
        setTimeout(function(){
            $('.tooltip').tooltipster('close');
        }, 1500)
    });
}
 
function atualizaPlacar(){
    $.get('http://localhost:3000/placar', function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removerPlacar);
            $('tbody').append(linha);
        });
    });
}