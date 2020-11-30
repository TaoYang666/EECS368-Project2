var chessboard=document.querySelector('#chessboard');
var ctx= chessboard.getContext('2d');
var chesscolor=['Black','White'];
var step=0;
var over =false;
var map=[];
var mode=[[1,0],[0,1],[1,1],[1,-1]];
// ctx.strokeStyle="#000000";
var changecolor=false;
window.onload=function()
{
    line();
    record();
    
}

function a(id)
{
    var b=document.getElementById(id);
    if(b.value=="Black")
    {
        changecolor=false;
    }
    else if(b.value=="White")
    {
        changecolor=true;
    }
}

function line()
{
    for(var i=1;i<19;i++)
    {
        ctx.moveTo(i*30,30);
        ctx.lineTo(30*i,540);
        ctx.moveTo(30,i*30);
        ctx.lineTo(540,i*30);
    }
    ctx.stroke();
    // ctx.fillStyle='black';
}

function chess(x,y,color)
{
    
    ctx.beginPath();
    ctx.arc(x,y,13,0,Math.PI*2,false);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.stroke();
}

function record()
{
    for (i=0;i<19;i++)
    {
        map[i]=[];
        for(var j=0;j<19;j++)
        {
            map[i][j]=0;
        }
    }
}

chessboard.addEventListener('click',function(e)
{
    var px=Math.floor((e.offsetX+15)/30)-1;
    var py=Math.floor((e.offsetY+15)/30)-1;
    if((px+1)*30==0||(py+1)*30==0||(px+1)*30==570||(py+1)*30==570)
    {
        return;
    }
    if(map[px][py]==0&&!over)
    {
        if(!changecolor)
        {
            chess((px+1)*30,(py+1)*30,chesscolor[step%2]);
            map[px][py]=chesscolor[step%2];
            for(var i=0;i<4;i++)
            {
                checkwin(px,py,chesscolor[step%2],mode[i]);
            }
            step++;
        }
        else
        {
            chess((px+1)*30,(py+1)*30,chesscolor[(step+1)%2]);
            map[px][py]=chesscolor[(step+1)%2];
            for(var i=0;i<4;i++)
            {
                checkwin(px,py,chesscolor[(step+1)%2],mode[i]);
            }
            step++;
        }

        
    }
    if(over)
    {
        alert("Game over！");
        return;
    }
})

function checkwin(x,y,color,mode)
{
    var count=0;
    for(var i=1;i<7;i++)
    {
        if(map[x+i*mode[0]])
        {
            if(map[x+i*mode[0]][y+i*mode[1]]==color)
            {
                count++;
            }
            else
            {
                break;
            }
        }
    }
    for(var i=1;i<7;i++)
    {
        if(map[x-i*mode[0]])
        {
            if(map[x-i*mode[0]][y-i*mode[1]]==color)
            {
                count++;
            }
            else
            {
                break;
            }
        }
    }
    if(count>=6)
    {
        alert(color+" win!");
        over=true;
    }

}