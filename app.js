window.onload = function () {
}

function hujiwaraConverter() {
  const form = document.converterForm;
  let resultText = "";
  let originText = form.original_string.value.replace(/\r\n|\r/g, "\n");
  let lines = originText.split('\n');
  let nowScenarioLength;
  if(form.nowScenarioLength.value){
    nowScenarioLength = parseInt(form.nowScenarioLength.value);
    let arrayDrawTextOrder = [
      "case {day}:<br>" +
      "&nbsp;&nbsp;" + "switch (Page) {<br>",
      "",
      "&nbsp;&nbsp;" + "case " + lines.length + ":<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "Loop = {nowLoopTime};<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "Month = {Month};<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "Days = {nextDay};<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "Page = 0;<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "AutoSave(Loop, Month, Days, MyNameNum[0], MyNameNum[1], MyNameNum[2], MyNameNum[3], MyNameNum[4], Clear,Root);<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "break;<br>" +
      "&nbsp;&nbsp;" + "}<br>" +
      "&nbsp;&nbsp;" + "break;"
    ];
    for(let i = 0; i < lines.length; i++){
      let hujiwaraText = "";
      let what_character_spot = 100;
      for(let j = 0; j < lines[i].length; j++){
        hujiwaraText += ("\"" + lines[i][j] + "\",");
        if(lines[i][j] === "x" || lines[i][j] === "X"){
          let is_x = lines[i][j] + lines[i][j+1] + lines[i][j+2] + lines[i][j+3] + lines[i][j+4];
          if(is_x === "xxxxx" || is_x === "XXXXX"){
            what_character_spot === 100 ? what_character_spot = String(j) : what_character_spot += String(j);
          }
        }
      }
      nowScenarioLength += lines[i].length;
      arrayDrawTextOrder[1] += 
      "&nbsp;&nbsp;" + "case " + i + ":<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "DrawTextOrder(" + (nowScenarioLength - lines[i].length) + ", " + nowScenarioLength + ", " + what_character_spot + ");<br>" +
      "&nbsp;&nbsp;&nbsp;&nbsp;" + "break;<br>"
      resultText += (hujiwaraText + "//" + nowScenarioLength +"<br>");
    }
    document.getElementById("displayTextArea").innerHTML=resultText; 
    document.getElementById("displayCodeArea").innerHTML=(arrayDrawTextOrder[0] + arrayDrawTextOrder[1] + arrayDrawTextOrder[2]); 
  }else{
    for(let i = 0; i < lines.length; i++){
      let hujiwaraText = "";
      for(let j = 0; j < lines[i].length; j++){
        hujiwaraText += ("\"" + lines[i][j] + "\",");
      }
      resultText += (hujiwaraText + "<br>");
    }
    document.getElementById("displayTextArea").innerHTML=resultText; 
  }
}