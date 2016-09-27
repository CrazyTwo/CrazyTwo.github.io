(function(html){
		change()
		function change(){
			var w = html.clientWidth;
			var size = 100*(w/320).toFixed(2);
			html.style.fontSize = size+"px"
		}
		window.addEventListener('resize',function () {
			change()
		})
	})(document.documentElement)