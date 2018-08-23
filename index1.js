window.onload = function () {
    search();


    banner();
}

var search = function () {
    var searchBox = document.querySelector('.jd_search_box');

    var banner = document.querySelector('.jd_banner').offsetHeight;

    window.onscroll=function () {
        var scrollTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;

        console.log(scrollTop);

        var opacity = 0;
        if (scrollTop<banner){
            opacity=scrollTop/banner*0.85;
        } else {
            opacity=0.85;
        }
        searchBox.style.backgroundColor='rgba(201,21,35.'+opacity+')';
    }
};

var banner = function () {
    // var banner = document.querySelector('.jd_banner');
    //
    // var width = banner.offsetWidth;
    //
    // var imageBox =banner.querySelector('ul:first-child');
    //
    // var pointBox =banner.querySelector('ul:last-child');
    //
    // var point = pointBox.querySelectorAll('li');

    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');
    var setTranslateX = function (res) {
        imageBox.style.transform = 'translateX(' + res + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + res + 'px)';
    }
    var add = function () {
        imageBox.style.transition='all 0.2s';
        imageBox.style.transition='all 0.2s';
    }
    var remove = function () {
        imageBox.style.transition='none';
        imageBox.style.transition='none';
    }

    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
       add()
        /*做位移*/
        setTranslateX(-index * width);
    }, 1000);
    imageBox.addEventListener('transitionend',function () {
        if(index>=9){
            index=1;
            remove();
            setTranslateX(-index*width);
        } else if(index<=0){
            index=8;
            remove();
            setTranslateX(-index*width);
        }
        setPoint();
    });
    var setPoint = function () {
        for (var i=0;i<points.length;i++){
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index-1].classList.add('now');
    };
    var startX = 0;
   var isMove =false;
    var distance = 0;
    imageBox.addEventListener('touchstart',function (e) {
         startX =  e.touches[0].clientX;
         clearInterval(timer);
        console.log(startX);
    });
    imageBox.addEventListener('touchmove',function (e) {
        var  moveX=e.touches[0].clientX;
         distance=moveX-startX;
         var translateX =-index * width+distance;
         remove();
         setTranslateX(translateX);
        isMove = true;

    });
    imageBox.addEventListener('touchend',function (e) {
        if(isMove){
           if (Math.abs(distance)<width/3){
                add()
                setTranslateX(-index*width);
           }else{
               if (distance>0){
                   index--;
                   remove();

               } else if(distance<0) {
                    index++;
                    remove();

               }
               add();

               setTranslateX(-index*width);
           }
        }
         distance =0;
            isMove=false;
            startX=0;
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            add()
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    })
}

var downTime = function () {
    var time = 4* 60 *60 ;
    var timeSpan = document.querySelector('.time');
    var spans =timeSpan.querySelectorAll('li');
    setInterval(function () {
        time--;
    },1000)
}