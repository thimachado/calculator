var horasDia = $("#horasdia option:selected").text();
//var batidas = ['08:00','12:00','13:12','14:00','15:12','17:20','17:40'];
var batidas = $("input[name='batida[]']").map(function(){return $(this).val();}).get();
//Chamando on load
calculo(horasDia, batidas);
//Chamando on load
$('input').on('change', function () {
	//horasDia = (this.value);
	batidas = $("input[name='batida[]']").map(function(){return $(this).val();}).get();
	calculo(horasDia, batidas);
});

//chamada on change
$('select').on('change', function () {
horasDia = (this.value);
calculo(horasDia, batidas);
});


//funcao de converter hora
function converteHora(hora, minuto) {
var num = (hora * 60) + minuto;
var hours = (num / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return ('0' + rhours).slice(-2) + ":" + ('0' + rminutes).slice(-2);
}
//funcao hora da felicidade
function horaFelicidade(horasTrabalhadas,horasDia,batida){
	    console.log(horasTrabalhadas);
		//Calcula quanto falta pra hora da felicidade
		//horasTrabalhadas = hours + ":" + ('0' + minutes).slice(-2);
		var horasdoDia = new Date("01/01/2007 " + horasDia).getHours();
		var minutosDia = new Date("01/01/2007 " + horasDia).getMinutes();
		var horaTrabalhada = new Date("01/01/2007 " + horasTrabalhadas).getHours();
		var minutoTrabalhado = new Date("01/01/2007 " + horasTrabalhadas).getMinutes();
		var minutosFelicidade = ((horasdoDia - horaTrabalhada) * 60) + (minutosDia - minutoTrabalhado);
		var happyHour = Math.floor(minutosFelicidade / 60);
		var happyMinutes = minutosFelicidade % 60;
		//Retorna a hora de saída
		var horaFelicidade = ('0' + happyHour).slice(-2) + ":" + ('0' + happyMinutes).slice(-2);
		horaBatida01 = new Date("01/01/2007 " + batida).getHours();
		minutoBatida01 = new Date("01/01/2007 " + batida).getMinutes();
		var horapraFelicidade = new Date("01/01/2007 " + horaFelicidade).getHours();
		var minutopraFelicidade = new Date("01/01/2007 " + horaFelicidade).getMinutes();
		var previsaoMinutosFelicidade = ((horaBatida01 + horapraFelicidade) * 60) + (minutopraFelicidade + minutoBatida01);
		happyHour = Math.floor(previsaoMinutosFelicidade / 60);
		happyMinutes = previsaoMinutosFelicidade % 60;
		previsao  = converteHora(happyHour, happyMinutes);

		if(happyHour >= 24){
			previsao = "Poxa, você vai até depois da meia-noite.";
		}
	
	 	return  previsao;
	
}
//funcao hora extra
function horaExtra(horasDia, saida){
//Calcula a hora extra ou a dever
var horasdoDia = new Date("01/01/2007 " + horasDia).getHours();
var minutosDia = new Date("01/01/2007 " + horasDia).getMinutes();
var horaTrabalhada = new Date("01/01/2007 " + saida).getHours();
var minutosTrabalhado = new Date("01/01/2007 " + saida).getMinutes();
//Se hora trabalhada for menor que hora dia
if(horaTrabalhada < horasdoDia){
console.log(horaTrabalhada);	
var minutosdoDinheiro= (horasdoDia - horaTrabalhada )* 60 + (minutosDia - minutosTrabalhado);
var extraHour = Math.floor(minutosdoDinheiro / 60);
var extraMinutes = minutosdoDinheiro % 60;
console.log('//Se hora trabalhada for menor que hora dia');
return	extradever = "- " + converteHora(extraHour, extraMinutes);
}	
//Se hora trabalhada for igual a hora dia e minuto for menor
if((horaTrabalhada == horasdoDia) && minutosTrabalhado < minutosDia){
var minutosdoDinheiro= (horasdoDia - horaTrabalhada )* 60 + (minutosDia - minutosTrabalhado);
var extraHour = Math.floor(minutosdoDinheiro / 60);
var extraMinutes = minutosdoDinheiro % 60;
console.log('//Se hora trabalhada for igual a hora dia e minuto for menor');
return	extradever = "- " + converteHora(extraHour, extraMinutes);
}
//Se hora trabalhada for igual hora dia e minuto trabalhado maior
if((horaTrabalhada == horasdoDia) && minutosTrabalhado > minutosDia){
var minutosdoDinheiro= (horasdoDia - horaTrabalhada )* 60 + (minutosTrabalhado - minutosDia );
console.log(minutosTrabalhado - minutosDia);
var extraHour = Math.floor(minutosdoDinheiro / 60);
var extraMinutes = minutosdoDinheiro % 60;
console.log('//Se hora trabalhada for igual hora dia e minuto trabalhado maior');
return	extradever = converteHora(extraHour, extraMinutes);
}
//Se hora trabalhada for maior que hora dia
if((horaTrabalhada > horasdoDia)){
console.log(minutosDia);
console.log(minutosTrabalhado);
var minutosdoDinheiro= (horaTrabalhada - horasdoDia)* 60 + (minutosTrabalhado-minutosDia);
var extraHour = Math.floor(minutosdoDinheiro / 60);
var extraMinutes = minutosdoDinheiro % 60;
console.log('//Se hora trabalhada for maior que hora dia ',minutosdoDinheiro);
return	extradever = converteHora(extraHour, extraMinutes);
}
//Se hora e minuto trabalhados forem iguais ao dia
if((horaTrabalhada == horasdoDia) &&  (minutosDia == minutosTrabalhado )){
var minutosdoDinheiro= (horasdoDia - horaTrabalhada )* 60 + (minutosDia + minutosTrabalhado);
var extraHour = Math.floor(minutosdoDinheiro / 60);
var extraMinutes = minutosdoDinheiro % 60;
console.log('//Se hora e minuto trabalhados forem iguais ao dia');
return	extradever = "00:00";
}
}
//funcao de calculo
function calculo(horasDia, batidas) {
//Váriaveis de batidas
var horaBatida01;
var horaBatida02;
var minutoBatida01;
var minutoBatida02;
var previsao;
var horasTrabalhadas;
var minutosextras = 0;
//Variáveis de resultado
var minutos;
var hours;
var minutes;
var saida;
var saidaextra;
var extradever = '--';
for (var i = 0; i < batidas.length; i++) {
console.log(batidas);	
//calcula período antes do intervalo
if ((batidas[1] != " ")) {
horaBatida01 = new Date("01/01/2007 " + batidas[0]).getHours();
horaBatida02 = new Date("01/01/2007 " + batidas[1]).getHours();
minutoBatida01 = new Date("01/01/2007 " + batidas[0]).getMinutes();
minutoBatida02 = new Date("01/01/2007 " + batidas[1]).getMinutes();
minutos = ((horaBatida02 - horaBatida01) * 60) + (minutoBatida02 - minutoBatida01);
hours = Math.floor(minutos / 60);
minutes = minutos % 60;
saida = converteHora(hours, minutes);
previsao = "--";
} else {
horasTrabalhadas = "Ainda não existem batidas suficientes para realizar o cálculo.";
previsao = "--";
extradever = "--";
i = batidas.lenght;
}
if ((batidas[2] != " ") && (batidas[3] == " ")) {
	horasTrabalhadas = hours + ":" + ('0' + minutes).slice(-2);
	console.log(horasTrabalhadas);
	previsao = horaFelicidade(horasTrabalhadas,horasDia,batidas[2]);

}



//calcula período volta do intervalo
if ((batidas[2] != " ") && (batidas[3] != " ")) {
horaBatida01 = new Date("01/01/2007 " + batidas[2]).getHours();
horaBatida02 = new Date("01/01/2007 " + batidas[3]).getHours();
minutoBatida01 = new Date("01/01/2007 " + batidas[2]).getMinutes();
minutoBatida02 = new Date("01/01/2007 " + batidas[3]).getMinutes();
minutos = ((horaBatida02 - horaBatida01) * 60) + (minutoBatida02 - minutoBatida01);
hours += Math.floor(minutos / 60);
minutes += minutos % 60;
saida = converteHora(hours, minutes);
previsao = "--"
extradever = "--"
}
if((i >= 5) && (i % 2 !== 0)){
//soma das batidas extras	
var	horabatidaextra01 = new Date("01/01/2007 " + batidas[i - 1]).getHours();
var	horabatidaextra02 = new Date("01/01/2007 " + batidas[i]).getHours();
var minutobatidaextra01 = new Date("01/01/2007 " + batidas[i - 1]).getMinutes();
var minutobatidaextra02 = new Date("01/01/2007 " + batidas[i]).getMinutes();
minutosextras += ((horabatidaextra02 - horabatidaextra01) * 60) + (minutobatidaextra02 - minutobatidaextra01);
//Soma saida + extra
var horasaida01 = new Date("01/01/2007 " + saida).getHours();
var minutosaida01 = new Date("01/01/2007 " + saida).getMinutes();
var totalminutosextras = (horasaida01 * 60) + (minutosextras + minutosaida01); 
hours = Math.floor(totalminutosextras/ 60);
minutes = totalminutosextras % 60;
saidaextra = converteHora(hours , minutes);
extradever = horaExtra(horasDia, saida);
}else{
	if((i >= 4) && (i % 2 == 0)){
	
		if(saidaextra != null){
			saida = saidaextra;
		}
	previsao = horaFelicidade(saida,horasDia,batidas[i]);
	}
  }
}
//Altera horas finais trabalhadas no dia	
if(saidaextra != null){
saida = saidaextra;
}
//Calcula horas extras	
if(batidas[1] != " "){
extradever = horaExtra(horasDia, saida);
}
//Saídas
if (horasTrabalhadas != "Ainda não existem batidas suficientes para realizar o cálculo.") {
horasTrabalhadas = saida;
}

console.log(previsao);
if ((previsao == "--") || (previsao == "aN:aN"))  {
	document.getElementById("previsaosaida").innerHTML = "Hora da felicidade: --";
}else{
	document.getElementById("previsaosaida").innerHTML = "Hora da felicidade: " + previsao;
}

if(extradever != "--"){

}
document.getElementById("horastrabalhadas").innerHTML = "Horas trabalhadas: " + horasTrabalhadas;
//document.getElementById("previsaosaida").innerHTML = "Hora da felicidade: " + previsao;
document.getElementById("extradever").innerHTML = "Horas Extras/Dever: " + extradever;
}