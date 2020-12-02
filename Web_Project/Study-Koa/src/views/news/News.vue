<template lang="pug">

<div  class="div1">
<div class="bigtitle">
<h1 class="neu" style="color:white;">News@Northeastern</h1>
<ul>
<li><a href="#A1">WHAT IS NEW?</a></li>
<li><a href="#A2">OUR PRESIDENT</a></li>
<li><a href="#A3">RESEARCH</a></li>
<li><a href="#A4">CAMPUS</a></li>
</ul>
</div>
<div class="xt">
<h2><a name="A1">WHAT IS NEW?</a></h2>
</div>
<table>
<tr>
  <td>
    <div class="containerrrr" >
      <a target="_blank" href="https://news.northeastern.edu/2019/12/11/winter-wonderland-2/">
      <img   src="/static/image/456.jpg" alt="Picture1" width="950" height="730" ></a>
      <div class="overlayyy">
        <div class="texttt">SNOW DAY </br>IS COMING!</div>
      </div>
    </div>
  </td>
  <td>
    <tr>
      <div class="containerxx" >
        <a target="_blank" href="https://news.northeastern.edu/2019/12/03/do-you-want-to-build-a-snowman-2/">
        <img   src="/static/image/567.jpg" alt="Picture2" width="525" height="363" ></a>
        <div class="overlayxx">
          <div class="textx">Do you want to build a snow man?</div>
        </div>
      </div>
    </tr>
    <tr>
      <div class="containerx" >
        <a target="_blank" href="https://news.northeastern.edu/2019/11/19/a-window-to-fall/">
        <img   src="/static/image/678.jpg" alt="Picture3" width="525" height="363" ></a>
        <div class="overlayx">
          <div class="textx">A WINDOW TO FALL</div>
        </div>
      </div>
    </tr>
  </td>
</tr>
</table>
<div class="xt">
<h2><a name="A2">OUR PRESIDENT</a></h2>
</div>
<table>
  <tr>
    <td>
<div class="containerr" >
<a target="_blank" href="https://news.northeastern.edu/2019/12/02/london-calling/">
<img   src="/static/image/123.jpg" alt="Picture4" width="740" height="500" ></a>
<div class="overlay">
<div class="text">Northeastern President spent his Thanksgiving </br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspon a boat cruise on the Thames</div>
</div>
</div>
</td>

<td>
<div class="containerrr" >
<a target="_blank" href="https://news.northeastern.edu/2019/12/11/fenway-alliance-honors-president-joseph-e-aoun/">
<img   src="/static/image/234.jpg" alt="Picture5" width="740" height="500" ></a>
<div class="overlayy">
<div class="textt">The Fenway Aliance honored president of Northeastern</div>
</div>
</div>
</td> 
</tr> 
</table>
<div class="xt">
<h2><a name="A3">RESEARCH</a></h2>
</div>

<div class="picc">
<div class="containerchhhh" >
<a target="_blank" href="https://news.northeastern.edu/2019/07/08/building-an-origami-inspired-robot/">
<img   src="/static/image/004.jpg" alt="Picture6" width="690" height="288" ></a>
<div class="overlaychhhh">
<div class="textchhhh">BUILDING A ROBOT</div>
</div>
</div>
</div>

<table>

<td>
<div class="containerchhh" >
<a target="_blank" href="https://news.northeastern.edu/2019/11/14/think-really-small/">
<img   src="/static/image/001.jpg" alt="Picture7" width="343" height="250" ></a>
<div class="overlaychhh">
<div class="textchhh">THINK</br>SMALL</div>
</div>
</div>
</td>

<td>
<div class="containerchh" >
<a target="_blank" href="https://news.northeastern.edu/2019/10/18/stem-education-2/">
<img   src="/static/image/002.jpg" alt="Picture8" width="343" height="250" ></a>
<div class="overlaychh">
<div class="textchh">STEM</br>EDUATION</div>
</div>
</div>
</td>


<td>
<div class="containerch" >
<a target="_blank" href="https://news.northeastern.edu/2019/03/19/ive-got-my-ion-you/">
<img   src="/static/image/003.jpg" alt="Picture9" width="783" height="540" ></a>
<div class="overlaych">
<div class="textch">I HAVE GOT </br>MY ION YOU</div>
</div>
</div>
</td>


</table>

<div class="xt">
<h2><a name="A4">CAMPUS</a></h2>
</div>
<table>
<tr>

<td>
<div class="containerus" >
<a target="_blank" href="https://news.northeastern.edu/2019/03/06/snowy-stroll/">
<img   src="/static/image/005.jpg" alt="Picture10" width="490" height="395" ></a>
<div class="overlayus">
<div class="textus">SNOWY STROLL</div>
</div>
</div>
</td>

<td>
<div class="containeruss" >
<a target="_blank" href="https://news.northeastern.edu/2018/12/21/double-exposure-2/">
<img   src="/static/image/006.jpg" alt="Picture11" width="490" height="395" ></a>
<div class="overlayuss">
<div class="textuss">LIGHTS</br>CAMERA</br>VACATION</div>
</div>
</div>
</td>

<td>
<div class="containerusss" >
<a target="_blank" href="https://news.northeastern.edu/2019/04/17/spring-is-for-the-birds-eye-view/">
<img   src="/static/image/007.jpg" alt="Picture12" width="490" height="395" ></a>
<div class="overlayusss">
<div class="textusss">SPRING VIEW</div>
</div>
</div>
</td>

</tr>
</table>

</div>
</template>


<script>
 export default {
 	name: 'news',
	data () {
	
 		 return {
		}	
 	},
 	created() {
		
 	},
 	mounted() {	
     let canvas=document.querySelector('.footer');
     canvas.style.display = "none"
 	},
 	methods: {

 },
 }
</script>


<style lang="less" scoped>
.div1{
	display: inline-block;
}
.containerr:hover .overlay {
  bottom: 0;
  height: 45%;
}
.text {
  white-space: nowrap; 
  color: white;
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlay {
  position: absolute;
  bottom: 30%;
  left: 0;
  right: 0;
  background-color:rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0%;
  transition: .5s ease;
}
.containerr {
	
  position: relative;
  width: 100%;
        
}


.containerrr:hover .overlayy {
  bottom: 0;
  height: 45%;
}
.textt {
  white-space: nowrap; 
  color: white;
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlayy {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color:rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}
.containerrr {
	position: relative;
  width: 100%;        
}


.containerrrr:hover .overlayyy {
  width: 100%;
}
.texttt {
  color: white;
  font-size: 60px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.overlayyy {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: .5s ease;
}
.containerrrr {
  position: relative;
  width: 40%;;        
}

.containerx {
  position: relative;
  width: 50%;
}



.overlayx {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.containerx:hover .overlayx {
  bottom: 0;
  height: 100%;
}

.textx {
  color: white;
  font-size: 30px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.containerxx {
  position: relative;
  width: 50%;
}

.overlayxx {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.containerxx:hover .overlayxx {
  bottom: 0;
  height: 100%;
}

.textxx {
  color: white;
  font-size: 30px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  right: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

ul{
	flex-direction: row;
	display: flex;
	padding-left:90px;	
}

ul li{
	
list-style-type: none;
padding: 12px 110px;
font-size:15px;
font-weight:bold;
padding-top:10px;
left:160px;
}


a:link {text-decoration:none;}

.picc{
	position:absolute;
	top:1643.5px;
	//left:20px;
}

.containerch:hover .overlaych {
  width: 100%;
}
.textch {
  color: white;
  font-size: 40px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.overlaych {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: .5s ease;
}
.containerch {
  position: relative;
  width: 40%;;       
}



.containerchh {
  position: relative;
  width: 50%;
}

.overlaychh {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.containerchh:hover .overlaychh {
  bottom: 0;
  height: 100%;
}

.textchh {
  color: white;
  font-size: 30px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}


.containerchhh {
  position: relative;
  width: 50%;
}

.overlaychhh {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.containerchhh:hover .overlaychhh {
  bottom: 0;
  height: 100%;
}

.textchhh {
  color: white;
  font-size: 30px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.containerchhhh:hover .overlaychhhh {
  bottom: 0;
  height: 45%;
}
.textchhhh {
  white-space: nowrap; 
  color: white;
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlaychhhh {
  position: absolute;
  bottom: 30%;
  left: 0;
  right: 0;
  background-color:rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0%;
  transition: .5s ease;
}
.containerchhhh {
	
  position: relative;
  width: 100%;;  
        
}

.containerus:hover .overlayus {
  bottom: 0;
  height: 45%;
}
.textus {
  white-space: nowrap; 
  color: white;
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlayus {
  position: absolute;
  bottom: 30%;
  left: 0;
  right: 0;
  background-color:rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0%;
  transition: .5s ease;
}
.containerus {
	
  position: relative;
  width: 100%;;  
        
}

.containeruss {
  position: relative;
  width: 50%;
}

.overlayuss {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0;
  transition: .5s ease;
}

.containeruss:hover .overlayuss {
  bottom: 0;
  height: 100%;
}

.textuss {
  color: white;
  font-size: 30px;
  font-weight:bold;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

.containerusss:hover .overlayusss {
  bottom: 0;
  height: 45%;
}
.textusss {
  white-space: nowrap; 
  color: white;
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlayusss {
  position: absolute;
  bottom: 30%;
  left: 0;
  right: 0;
  background-color:rgba(71,71,71,.5);
  overflow: hidden;
  width: 100%;
  height:0%;
  transition: .5s ease;
}
.containerusss {
	
  position: relative;
  width: 100%; 
        
}

.bigtitle{
	padding:30px,40px;
	background-color:black;
	
}

a:link {
    color:#ffffff;
    text-decoration:none;
    }
    a:visited {
    color:#ffffff;
    text-decoration:none;
    }
    a:hover {
    color:#ffffff;
    text-decoration:none;
    }
    a:active {
    color:#ffffff;
    text-decoration:none;
    }
	.neu{
		padding-top:9px;
		padding-left:9px;
	}
	// .xt{
	// 	background-color:#bdbebd;
	// 	color:white;
		
  // }
  

</style>