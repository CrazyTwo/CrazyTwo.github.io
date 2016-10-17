var $inner = $('.inner');
        var $img = $('.inner img');
        var index = 0;
        var $li = $('.ul1 li');
        var timer = null;
        var progress = 0;


        timer = setInterval(function(){
            index++;
            if(index>3){
                index=1;
                progress=0;
                $inner.css({
                "left":0
            })
          }
          step()
          liFn()
        },2000)


        function liFn(){
            if(index>=3){
                var j = 0
            }else{
                var j = index
            }
            
            $li.css({
              background:""
            })
              $li.eq(j).css({
              background:"red"
            })
        }
        function step(){
            progress+=10;
            $inner.css({
                transform:'translate3d('+(-progress)+'px,0,0)'
            })
            if(progress<$img.eq(0).width()*index){
                requestAnimationFrame(step)
            }
        }