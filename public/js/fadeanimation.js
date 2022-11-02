    $(window).scroll(function (){
        $('.post-card').each(function(){
            var elemPos = $(this).offset().top ;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();

            if (scroll >= elemPos - windowHeight){
            $(this).addClass('moved');
            }else{$(this).removeClass('moved');}
 
          });
    });
  
  