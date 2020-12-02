

function change(del){
    var checkBox = document.getElementsByTagName('input');
    //var checkBox = document.getElementById("mycheck");
    //var tr=obj.parentElement.parentElement;
    console.log(checkBox.length);
    console.log(checkBox[0]);
    checkflag = false;
    for(i=0;i<checkBox.length;i++){
        if(checkBox[i].checked == true){
            console.log(checkBox[i].parentNode);
            checkBox[i].parentNode.parentNode.style.backgroundColor = 'yellow';
            document.getElementById('button').style.backgroundColor = 'orange';
            document.getElementById('button').disabled = false;
            checkflag = true;
            del.style.display = "block";
            
        }else{
            
            checkBox[i].parentNode.parentNode.style.backgroundColor = 'white';
            if(checkflag == false){
                document.getElementById('button').style.backgroundColor = 'grey';
                document.getElementById('button').disabled = true;
                del.style.display = "none";
                
            }
        }
    }
}


function Hidden (Display) {
    if (document.getElementById(Display).style.display != "table-row") {
        document.getElementById(Display).style.display = "table-row";
    } else {
        document.getElementById(Display).style.display = "none";
    }
}

function deleteRow(elem) {
    var table = elem.parentNode.parentNode.parentNode;
    var rowCount = table.rows.length;
  
    var row = elem.parentNode.parentNode; 
    row.parentNode.removeChild(row); 
  }



function addRow(){ 
    if( typeof addRow.counter == 'undefined' ) {
      addRow.counter = 3;
    } 
    addRow.counter++;

    var deleteID='del' +addRow.counter;
    var showID='show' +addRow.counter;
    
  
    var newTr = myTable.insertRow(-1);        
    var newTd0 = newTr.insertCell();    
    var newTd1 = newTr.insertCell();    
    var newTd2 = newTr.insertCell();    
    var newTd3 = newTr.insertCell();    
    var newTd4 = newTr.insertCell();    
    var newTd5 = newTr.insertCell();    
    var newTd6 = newTr.insertCell();    
    var newTd7 = newTr.insertCell();    
    var newTd8 = newTr.insertCell();    
    
    newTd0.innerHTML = `<input type='checkbox' onclick='change(${deleteID})'`+
    ` <br /><br /><br /><a><img src='down.png'  width='25px'  onclick="Hidden('${showID}')" /></a>`;
   newTd1.innerHTML = 'Student' + addRow.counter;    
   newTd2.innerHTML= 'Teacher' + addRow.counter;
   newTd3.innerHTML = 'Approved';    
   newTd4.innerHTML= 'Fall';
   newTd5.innerHTML = 'TA';    
   newTd6.innerHTML= '45678';
   newTd7.innerHTML = '100%';    
   newTd8.innerHTML= `<button id = '${deleteID}' onclick='deleteRow(this)' hidden>Delete</button>`;
  
  var nrow = myTable.insertRow(-1);
  nrow.id = showID;
  nrow.hidden = true;
  var ncol = nrow.insertCell(0);
  ncol.setAttribute('colspan', 9);
  ncol.innerHTML="Advisor:<br /><br />"+"Award Details<br />"+"Summer 1-2014(TA)<br />"+"Budget Number: <br />"+"Tuition Number: <br />"+"Comments:<br /><br />"+"Award Status:<br /><br />"
}