
var tempoInicial = $('#tempo-digitacao').text();
var campo = $(".campo-digitacao");

//Inicializa estas funções assim que página é carregada.
$(function(){
    //fraseAleatoria();
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
    atualizaPlacar();

    $('#usuarios').selectize({
        create: true,
        sortField: "text",
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });
});


function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
}


function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(' ').length;
    var tamanhoFrase = $("#tamanho-frase");  
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $('#contador-palavras').text(qtdPalavras);
        $('#contador-caracteres').text(conteudo.length);
    });
}


function inicializaCronometro(){
    
    $('#botao-reiniciar').attr('disabled', true);
    campo.one('focus', function(){
        var tempoRestante = $('#tempo-digitacao').text();
        var cronometroId = setInterval(function(){
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000)  
    });
}


function finalizaJogo(){
    campo.attr("disabled", true);
    $('#botao-reiniciar').attr('disabled', false);
    inserirPlacar();
}


function inicializaMarcadores(){
    campo.on('input', function(){
        var frase = $('.frase').text();
        var digitado = campo.val();

        if (frase.startsWith(digitado)) {
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');
        } else {
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto'); 
        }
    });
}


function reiniciaJogo(){
    campo.attr('disabled', false);
    campo.val('');
    $('#tempo-digitacao').text(tempoInicial);
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
    campo.removeClass('campo-errado');
    campo.removeClass('campo-correto'); 
}

