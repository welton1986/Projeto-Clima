
// Aqui estamos setando e criando uma função que vai verificar o submit e executar a ação de previnir o evento padrão de enviar.
document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    // Nessa parte estou pegando o valor do Input.
    let input = document.querySelector('#searchInput').value;

    // Estou buscando uma condicional e mandando uma mensagem .
    if(input != ''){

        // Função que esta limpando a tela, edepois mostrando a mensagem.
        clearInfo();
        showWarning('Carregando...');

        // Aqui eu montei a url do site que me da as informações do tempo.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f87f7fcc0bc4cb2271b0a8232ede1759&units=metric&lang=pt_br`;

        // Função que esta chamando a url .
        let results = await fetch(url);

        // Nessa parte estou trasnformando o resultado em json.
        let json = await results.json();

        console.log(json);


        // Aqui temos uma condição , se json.code for igual a 200, quer dizer que existe a cidade então executa showInfo caso contrario exibe a mensagem na tela.
        // Em showInfo ele chama , nome , paiz ,temperatura, tempo, vento e posiçao do vento.
       if (json.cod == 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
       }else {

            clearInfo();
           showWarning('Não encontramos essa localização.')
       }
   
    }else{
        clearInfo();
    }
});



function showInfo(json){

    // Aqui eu deixo essa função vazia , quando exibir as informações de showInfo.
    showWarning('');

    // Nessa parte estou setando os valores e jogando dentro dos devidos lugares na tela.
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    

    // Setando o lugar da imagem e trocando o src pelo json da imagem correta.
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    // setando o icone do lado que o vento esta com o json e diminuindo 90 graus para que ele comece a zero grau.
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

      // Aqui estou setando a classe .resultado e fazendo aparecer na tela.
      document.querySelector('.resultado').style.display = 'block';
}

// Função para limpar a tela quando nao encontar a cidade procurada.
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}



// Estou criando essa função para mostrar uma mensagem no campo aviso.
function showWarning(msg){
    
    document.querySelector('.aviso').innerHTML = msg;
}


