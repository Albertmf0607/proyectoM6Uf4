window.onload=function(){
    chIdioma();
    document.getElementById("idioma").addEventListener("change",chIdioma);
    document.getElementById("nickname").addEventListener("keyup",setNickname);
    document.getElementById("nom").addEventListener("blur",nullNom);
    document.getElementById("domicili").addEventListener("blur",nullDomicili);
    document.getElementById("dni").addEventListener("change",confirmDni);
    document.getElementById("provincia").addEventListener("change",inicializarMunicipi);
    document.getElementById("domicili").addEventListener("change",posMap);
    inicializarProvincia();
    setMap();
  }
function chIdioma(){
    var idioma =document.getElementById("idioma").value;
    const loader = document.getElementById("loader");
    loader.style.display="block";
    setTimeout(()=>,1000);
    loader.style.display="none";
    $.getJSON("php/idiomes.php",{idioma:idioma}, setIdioma)
	.fail(function() {
	    console.log( "error" );
	  });
}
function inicializarProvincia(){
  $.ajax({
    async:true,
    type: "POST",
    dataType: "html",
    contentType: "application/x-www-form-urlencoded",
    url:"php/cargaProvinciasJSON.php",
    success:cargarProvincia,
    timeout:4000,
  }); 
}
function cargarProvincia(txt){
  var obj = JSON.parse(txt);
  document.getElementById("provincia").innerHTML="-";
  for(var prop in obj){
    document.getElementById("provincia").innerHTML+="<option value='"+prop+"'>"+obj[prop]+"</option>";
}
}
function cargarMuncipio(txt){
  var obj = JSON.parse(txt);
  document.getElementById("municipi").innerHTML="";
  for(var prop in obj){
    document.getElementById("municipi").innerHTML+="<option value='"+prop+"'>"+obj[prop]+"</option>";
}
}
function inicializarMunicipi(e){
  $.ajax({
    async:true,
    type: "POST",
    dataType: "html",
    contentType: "application/x-www-form-urlencoded",
    url:"php/cargaMunicipisJSON.php",
    data:"provincia="+e.target.value,
    success:cargarMuncipio,
    timeout:4000,
  }); 
}
function confirmDni(e){
  $.ajax({
    async:true,
    type: "POST",
    dataType: "html",
    contentType: "application/x-www-form-urlencoded",
    url:"php/dni.php",
    data:"dni="+e.target.value,
    success:msgDni,
    timeout:4000,
  }); 
}
function msgDni(txt){
  if(txt==""){
    document.getElementById("dniError").style.display="none";
  }else{
    document.getElementById("dniError").style.display="block";
    document.getElementById("dniError").style.color="red";
  }
  document.getElementById("dniError").innerHTML=txt;
}
function nullNom(e){
  if(e.target.value==""){
    document.getElementById("nomError").style.display="block";
    document.getElementById("nomError").style.color="red";
    return false;
  }else{
    document.getElementById("nomError").style.display="none";
    return true;
  }
}
  function nullDomicili(e){
    if(e.target.value==""){
      document.getElementById("domiciliError").style.display="block";
      document.getElementById("domiciliError").style.color="red";
      return false;
    }else{
      document.getElementById("domiciliError").style.display="none";
      return true;
    }
  
}
function setNickname(e){
  const error = document.getElementById("nicknameError");
  error.style.display = "none";
  if(e.target.value!=""){
    peticionAjax("php/llistaNicknames.php?nickname="+e.target.value,"GET",nicknameSimi);
  }else{
    document.getElementById("nicknameSimi").style.display="none";
  }
}

function peticionAjax (url, metodo, funcion) { 
    peticion_http = null; 
    if(window.XMLHttpRequest) {
      peticion_http = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
      peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(peticion_http) {
      peticion_http.onreadystatechange = funcion;
      peticion_http.open(metodo, url, true);
      peticion_http.send(null);
    }
  }
function nicknameSimi(){
  if(this.readyState == 4) {
    if(this.status == 200) {
      if(this.responseText==1){
        const error = document.getElementById("nicknameError");
        error.style.display = "block";
        error.style.color = "red";
      }else if(this.responseText!=2){
        document.getElementById("nicknameSimi").innerHTML=this.responseText;
        document.getElementById("nicknameSimi").style.display="block";
      }
    } else {
    document.getElementById("p3").innerHTML ="Error Ajax "+ this.status;
    }
  } 
}
function posMap(e){
  setMarker(e.target.value);
}
function setMarker(carrer){
  var latICV = 41.6006675;
	var lonICV = 2.2830082000000402;
  var mymap = L.map('mapid').setView([latICV, lonICV], 16);
  var mark = L.marker([latICV, lonICV]).addTo(mymap);
  const provincia = $('#provincia').find('option:selected').text();
  const municipi=$('#municipi').find('option:selected').text();
  adreça = `${provincia}+${municipi}+${carrer}`;
  var url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${adreça}&format=json&limit=1`;
  fetch(url).then(resp => {
    resp.json().then(js => {
      var mark = L.marker([js[0].lat, js[0].lon]).addTo(mymap);
      mark.bindTooltip(js[0].display_name).openTooltip();
      mark.on("click", clickado);
    })
  }).catch(err => {
    alert(err.message);
  })
}
function setMap(){
  var latICV = 41.6006675;
	var lonICV = 2.2830082000000402;
  var mymap = L.map('mapid').setView([latICV, lonICV], 16);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
		var mark = L.marker([latICV, lonICV]).addTo(mymap);
		mark.bindTooltip("IES Carles Vallbona").openTooltip();
		mark.on("click", clickado);

		mark = L.marker([latICV-0.001, lonICV+0.001]).addTo(mymap);
		mark.bindTooltip("Pepe").openTooltip();
		mark.on("click", clickado);
		

		// L.polygon([
		// 	[latICV, lonICV],
		// 	[latICV, lonICV+0.002],
		// 	[latICV-0.001, lonICV+0.002]
		// ]).addTo(mymap);

		
}
function clickado(x) {
			var str = this._tooltip._content;
			alert("clickado " + str);
		}
function setIdioma(obj){
    document.getElementById("idiomaL").innerHTML=obj.idioma;
    document.getElementById("nicknameL").innerHTML=obj.nickname;
    document.getElementById("nomL").innerHTML=obj.nom;
    document.getElementById("dniL").innerHTML=obj.dni;
    document.getElementById("provinciaL").innerHTML=obj.provincia;
    document.getElementById("municipiL").innerHTML=obj.municipi;
    document.getElementById("domiciliL").innerHTML=obj.domicili;
    document.getElementById("ubicacioL").innerHTML=obj.ubicacio;
    document.getElementById("rutaL").innerHTML=obj.ruta;
}