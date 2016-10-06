/*Code to onload words on the screen*/
document.open("text/plain");
document.writeln("<table><tr><td>");
for (n=0; n < SizeMax; n++){ 
    document.writeln("<NOBR>");
    for (m=0; m < SizeMax; m++)
        document.write("<IMG src='"+Pic[random(2)*27].src+"' border=0 onMouseDown=\"Clicked("+n+","+m+")\">");
    document.writeln("</NOBR><BR>");
}
document.writeln("</td></tr></table></td><td>");
document.writeln("<select size=18 style='width:120px; font-family:Courier New; font-weight:bold; font-size:18px' width=120 name='Words'>");
document.writeln("<option name='0' id='0'>Please");
document.writeln("<option name='1' id='1'>wait");
document.writeln("<option name='2' id='2'>while");
document.writeln("<option name='3' id='3'>the");
document.writeln("<option name='4' id='4'>game");
document.writeln("<option name='5' id='5'>is");
document.writeln("<option name='6' id='6'>loading!");
for (n=7; n<54; n++) 
    document.writeln("<option name='"+n+"' id='"+n+"'>");
document.writeln("</select>");
document.close();
