function random(nn)
{ 
    return(Math.floor(Math.random()*nn)%nn);
}
function WordFit(ss_long, ss_short, nn)
{ 
    var ss, ssub, cc, bb, ss0, ss1, dds;
    if (random(2)==0) { 
        ss0=0; ss1=Size-nn+1; dds=1; 
    }
    else { 
        ss0=Size-nn; ss1=-1, dds=-1; 
    }
    for (ss=ss0; ss!=ss1; ss+=dds)
    { 
        ssub=ss_long.substr(ss,nn);
        if ((ssub.search(" ")>=0)&&(ssub.search("_")<0)){ 
            bb=true;
            if ((ss>0)&&(ss_long.charAt(ss-1)!="_")&&(ss_long.charAt(ss-1)!=" ")) 
                bb=false;
            if ((ss+nn<Size)&&(ss_long.charAt(ss+nn)!="_")&&(ss_long.charAt(ss+nn)!=" ")) 
                bb=false;
            for (cc=0; ((bb)&&(cc<nn)); cc++)
                if ((ssub.charAt(cc)!=" ")&&(ssub.charAt(cc)!=ss_short.charAt(cc))) 
                    bb=false;
            if (bb) 
                return(ss);
        } 
    }
    return(-1);
}

function FillCol(nn)
{ 
    var ii, ii0=random(Size), ll=nWord[nn], jj, jj0=random(ll), ss;
    for (ii=0; ii<Size; ii++)
    { 
        if (((ii+ii0)%Size)%2==g){ 
            ss="";
            for (jj=0; jj<Size; jj++) 
                ss+=Grid[jj][(ii+ii0)%Size];
            if (ss.search(" ")>=0){ 
                for (jj=0; jj<ll; jj++){ 
                    if (! SelW[nn][(jj+jj0)%ll]){ 
                        pp=WordFit(ss, Word[nn][(jj+jj0)%ll], nn);
                        if (pp>=0){ 
                            for (ss=0; ss<nn; ss++)
                                Grid[ss+pp][(ii+ii0)%Size]=Word[nn][(jj+jj0)%ll].charAt(ss);
                            if (pp>0) 
                                Grid[pp-1][(ii+ii0)%Size]="_";
                            if (pp+nn<Size) 
                                Grid[pp+nn][(ii+ii0)%Size]="_";
                            SelW[nn][(jj+jj0)%ll]=true;
                            return(1);
                        }
                    }
                }
            }
        }
    }
    return(0);
}

function FillRow(nn)
{ 
    var ii, ii0=random(Size), ll=nWord[nn], jj, jj0=random(ll), ss;
    for (ii=0; ii<Size; ii++){ 
        if (((ii+ii0)%Size)%2==g){ 
            ss="";
            for (jj=0; jj<Size; jj++) ss+=Grid[(ii+ii0)%Size][jj];
            if (ss.search(" ")>=0){ 
                for (jj=0; jj<ll; jj++){ 
                    if (! SelW[nn][(jj+jj0)%ll]){ 
                        pp=WordFit(ss, Word[nn][(jj+jj0)%ll], nn);
                        if (pp>=0){ 
                            for (ss=0; ss<nn; ss++)
                                Grid[(ii+ii0)%Size][ss+pp]=Word[nn][(jj+jj0)%ll].charAt(ss);
                            if (pp>0) 
                                Grid[(ii+ii0)%Size][pp-1]="_";
                            if (pp+nn<Size) 
                                Grid[(ii+ii0)%Size][pp+nn]="_";
                            SelW[nn][(jj+jj0)%ll]=true;
                            return(1);
                        }
                    }
                }
            }
        }
    }
    return(0);
}

var count=3;
function Init()
{ 
    document.getElementById("id2").innerHTML=count;
    if(count<1){
        document.OptionsForm.NewButton.disabled=true;
    }
    count--;
    var ii, jj;
    if (IsLoading) 
        return;
    IsLoading=true;
    IsOver=false;
    IsRepeat=false;
    g=0;
    for (ii=0; ii<Size; ii++){ 
        for (jj=0; jj<Size; jj++){ 
            if ((ii%2==1)&&(jj%2==1)) 
                Grid[ii][jj]="_";
            else 
                Grid[ii][jj]=" ";
        }
    }
    for (ii=18; ii>1; ii--){ 
        for (jj=0; jj<nWord[ii]; jj++)
            SelW[ii][jj]=false;
    }
    document.OptionsForm.Status.value="Loading ... "+eval((Size+3)/2+1);
    setTimeout("Fill("+eval((Size+3)/2)+")",400);
}

function Fill(nn)
{ 
    var cc, rr;
    if (nn>1){ 
        do{ 
            rr=FillRow(nn);
            cc=FillCol(nn);
        }
        while (rr+cc>0);
            document.OptionsForm.Status.value="Loading ... "+nn;
        setTimeout("Fill("+eval(nn-1)+")",400);
        return;
    }
    FillFinal();
}

function FillFinal()
{ 
    var ii, jj, cc, rr;
    for (ii=0; ii<Size; ii++){ 
        for (jj=0; jj<Size; jj++){ 
            if (Grid[ii][jj]==" ") 
                Grid[ii][jj]="_";
        }
    }
    for (ii=1; ii<Size; ii+=2){ 
        for (jj=1; jj<Size; jj+=2){ 
            if (((Grid[ii-1][jj]=="_")&&(Grid[ii+1][jj]=="_"))|| 
      ((Grid[ii][jj-1]=="_")&&(Grid[ii][jj+1]=="_")))
                Grid[ii][jj]=" ";
        }
    }
    g=1;
    for (ii=3; ii>1; ii--){ 
        do{ 
            rr=FillRow(ii);
            cc=FillCol(ii);
        }
        while (rr+cc>0);
    }
    for (ii=0; ii<Size; ii++){ 
        for (jj=0; jj<Size; jj++){ 
            if ((Grid[ii][jj]==" ")||(Grid[ii][jj]=="_"))
                Grid[ii][jj]="0";
        }
    }
    document.OptionsForm.Status.value="Loading ... 1";
    IsLoading=false;
    setTimeout("Show(0)",400);
}

function Vis(cc,vv)
{ 
    if (vv) 
        return(cc);
    if (cc=="0") 
        return("0");
    return"_";
}

var t;
var Start=new Date();
var StartTime = Start.getTime() / 1000;
window.onload = function startTime() {
    var Now=new Date();
    var CurrentTime = Now.getTime() / 1000;
    if((CurrentTime-StartTime)>3)
        document.getElementById("id1").innerHTML = Math.floor(10000-(CurrentTime-StartTime));
    t = setTimeout(startTime, 500);
}

function Show(vv)
{ 
    var rr, cc, oo=0, dd=(SizeMax-Size)/2;
    if (IsLoading) 
        return;
    for (rr=0; rr<SizeMax; rr++){ 
        for (cc=0; cc<SizeMax; cc++)
            document.images[rr*SizeMax+cc].src="xword_0.gif";
    }
    for (rr=0; rr<Size; rr++){ 
        for (cc=0; cc<Size; cc++)
            GridTmp[rr][cc]=Vis(Grid[rr][cc],vv);
    }  
    for (rr=0; rr<Size; rr++){ 
        for (cc=0; cc<Size; cc++)
            document.images[(rr+dd)*SizeMax+cc+dd].src="xword_"+GridTmp[rr][cc].toLowerCase()+".gif";
    }
    for (rr=eval((Size+3)/2); rr>1; rr--){ 
        for (cc=0; cc<nWord[rr]; cc++){ 
            if (SelW[rr][cc])
                document.OptionsForm.Words.options[oo++].text=Word[rr][cc].toUpperCase();
        }
    }
    while (oo<54) 
        document.OptionsForm.Words.options[oo++].text="";
    document.OptionsForm.Status.value="";
    if (vv) IsOver=true;
    IsRepeat=true;
    Now = new Date();
    StartTime = Now.getTime() / 1000;
}

function SetSize(ss)
{ 
    if (IsLoading) 
        return;
    Size=ss;
    Init();
}

function Clicked(ii, jj)
{ 
    var dd=(SizeMax-Size)/2;
    if ((ii<dd)||(jj<dd)||(ii>=SizeMax-dd)||(jj>=SizeMax-dd))
        return;
    if (document.OptionsForm.Words.selectedIndex<0) 
        return;
    var cc, rr, ww=document.OptionsForm.Words.options[document.OptionsForm.Words.selectedIndex].text;
    cc=FitIntoRow(ww, ii-dd, jj-dd);
    rr=FitIntoCol(ww, ii-dd, jj-dd);  
    if ((cc<0)&&(rr<0)) 
        return;
    if ((cc>=0)&&(rr>=0)) 
        return;  
    if (cc>=0){ 
        for (rr=0; rr<ww.length; rr++){ 
            GridTmp[ii-dd][cc+rr]=ww.charAt(rr);
            document.images[ii*SizeMax+cc+rr+dd].src="xword_"+GridTmp[ii-dd][cc+rr].toLowerCase()+".gif";
        }
    }  
    else { 
        for (cc=0; cc<ww.length; cc++){ 
            GridTmp[cc+rr][jj-dd]=ww.charAt(cc);
            document.images[(cc+rr+dd)*SizeMax+jj].src="xword_"+GridTmp[cc+rr][jj-dd].toLowerCase()+".gif";
        }
    }
    document.OptionsForm.Words.options[document.OptionsForm.Words.selectedIndex].text="";  
    if (IsOver) 
        return;
    cc=0;
    for (rr=0; rr<54; rr++){ 
        if (document.OptionsForm.Words.options[rr].text!="") cc++;
    }
    if (cc==0){ 
        clearTimeout(t);
        Now = new Date();
        EndTime = Now.getTime() / 1000;
        dd=Math.floor(EndTime - StartTime);
        score=9999-dd
        if (! IsRepeat){ 
            if (window.opener){ 
                if (window.opener.SetHighscores)
                    window.opener.SetHighscores("WordGrid",Size+"x"+Size,ii,-1);
            }
        }
        alert(""+score+" Points!");
        count=3;
    }  
}

function FitIntoRow(ww, rr, cc)
{ 
    var ii, ccmin=cc; ccmax=cc;
    while ((ccmin>0)&&(GridTmp[rr][ccmin-1]!="0")) 
        ccmin--;
    while ((ccmax<Size-1)&&(GridTmp[rr][ccmax+1]!="0")) 
        ccmax++;
    if (ccmax-ccmin+1!=ww.length) 
        return(-1);
    for (ii=0; ii<ww.length; ii++){ 
        if ((GridTmp[rr][ccmin+ii]!="_")&&(GridTmp[rr][ccmin+ii]!=ww.charAt(ii)))
            return(-1);
    }
    return(ccmin);
}

function FitIntoCol(ww, rr, cc)
{ 
    var ii, rrmin=rr; rrmax=rr;
    while ((rrmin>0)&&(GridTmp[rrmin-1][cc]!="0")) 
        rrmin--;
    while ((rrmax<Size-1)&&(GridTmp[rrmax+1][cc]!="0")) 
        rrmax++;
    if (rrmax-rrmin+1!=ww.length) 
        return(-1);
    for (ii=0; ii<ww.length; ii++){ 
        if ((GridTmp[rrmin+ii][cc]!="_")&&(GridTmp[rrmin+ii][cc]!=ww.charAt(ii)))
            return(-1);
    }
    return(rrmin);
}

var i, j, g, IsLoading=false, SizeMax=13, Size=7, StartTime, EndTime, IsOver, IsRepeat;
var WL=WordList.split(" ");
var nWord=new Array(19)
var Word=new Array(19);
var SelW=new Array(19);
for (i=0; i<19; i++)
{ 
    nWord[i]=0;
    Word[i]=new Array();
    SelW[i]=new Array();
}
for (i=0; i<WL.length; i++)
{ 
    j=WL[i].length;
    Word[j][nWord[j]++]=WL[i];
}
for (i=0; i<19; i++)
    SelW[i]=new Array(nWord[i]);
var Grid=new Array(SizeMax);
for (i=0; i<SizeMax; i++)
    Grid[i]=new Array(SizeMax);
var GridTmp=new Array(SizeMax);
for (i=0; i<SizeMax; i++)
    GridTmp[i]=new Array(SizeMax);  
var Alphabet=" abcdefghijklmnopqrstuvwxyz";
Pic = new Array(27);
Pic[0] = new Image();
Pic[0].src = "xword__.gif";
for (n=1; n<27; n++)
{ 
    Pic[n] = new Image();
    Pic[n].src = "xword_"+Alphabet.charAt(n)+".gif";
}
Pic[27] = new Image();
Pic[27].src = "xword_0.gif";
