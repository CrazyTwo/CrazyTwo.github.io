

var w=3.2;
var end=$(".con .fl div");
var con=$(".con");
end.on("touchstart",function(){
	$(this).parent().remove();
	w-=0.8;
	con.css("width",w+"rem")
})

var div=$(".b div");
div.on("touchstart",function(){
	var time=new Date();
	div.on("touchend",function(){
		var time2=new Date();
		if(time2-time<150){
			var str="<div class='fl'><div>x</div>"+$(this).html()+"</div>"
			con.append(str)
			w+=0.8;
			con.css("width",w+"rem")
			con.find("div:last-child div").on("touchstart",function(){
				$(this).parent().remove();
				w-=0.8;
				con.css("width",w+"rem")
			})
		}
	})
})

$(document).on("touchstart",function(e){
	var x=e.touches[0].clientX;
	var left=con.offset().left;
	var w=con.width();
	if(w<$("#yixuan").width()){
		con.css("left",0)
		con.off()
		return
	}
	con.on("touchmove",function(e){
		var x1=e.touches[0].clientX;
		var x2=left+(x1-x)
		if(x2>=0){x2=0}
		if(x2<=-(w-$("#yixuan").width())){x2=-(w-$("#yixuan").width())}
		con.css("left",x2)
		e.stopPropagation();
	})
	e.stopPropagation();
})


$('#seachoose').on('touchstart',function(){
	window.location.href = 'cando.html';
})









