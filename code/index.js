var infoStr = $("#s_newscard_asyn_data")[0].innerHTML+"";
  infoStr=eval("("+infoStr+")");     
  var infos =infoStr.imgNews;
  var lens = infos.length;
  var picsShow = document.getElementById("picsShow"); 
  var smallPicsShow = document.getElementById("small-img"); 
  var timer = 1;
  var index = 0;
  var picsWid_next ;
  var ids, timeoutID,widths;
  var width_pic_big = $(".big-img-link").width();
  (function(){   
      //初始化
      for(var i=0;i<lens;i++){      
      var bigPicsNode = document.createElement("a");
      bigPicsNode.className = "big-img-link";
      bigPicsNode.href = decodeURIComponent(infos[i].url);
      bigPicsNode.innerHTML = '<img height="260" width="425" data-loadfunc="1" src="' +decodeURIComponent(infos[i].imgUrl)+'" data-loaded="1">';
      picsShow.appendChild(bigPicsNode); 
      var smallPicsNode = document.createElement("span");
      smallPicsNode.className = "small-img";
      smallPicsNode.innerHTML = '<img class="news-smallimg-img" height="40" width="68"  src="' +decodeURIComponent(infos[i].imgSmallUrl)+'" /> <span class="mask" num ='+i+' ></span>';
      smallPicsShow.appendChild(smallPicsNode); 
      width_pic_big = $(".big-img-link").width();
      var width2 = $(".small-img").width();
      widths = width2*3 + 24;

      } 
    //第一页为当前页
    $(".img-title")[0].href = decodeURIComponent(infos[0].url);
    $(".img-title")[0].innerHTML = infos[0].title;
    $(".mask")[0].className='noMask'; 
  }())

  ids = setInterval(lunbo_in,2000);

  $(".pre-img").on("click",(function(){ 
    clearInterval(ids);
    if (index %8==0) {
    index =8;
    };
    index--;
    click_fy();
  }))

  $(".next-img").on("click",(function(){  
    clearInterval(ids);
    index++;
    if (index %8==0) {
    index =0;
    };  
    click_fy();
  }))

  $(".change-bigimg").on('mouseover',(function(){ 
    $(".notHover").addClass('is-hover') ;
    var screenWid = document.documentElement.clientWidth;
    screenWid = screenWid/2;
    var picsWid_next2 = width_pic_big/2-30;
    var picsWid_pre2 = width_pic_big/2-10;
    $(".next-img .is-hover").css("marginLeft",screenWid +picsWid_next2);
    $(".pre-img .is-hover").css("marginLeft",screenWid -picsWid_pre2);
  }))
  $(".change-bigimg").on('mouseout',(function(){  
    $(".is-hover").removeClass('is-hover') ;
  }))

  $(".small-img").click(function(el){ 
    clearInterval(ids);
    var events =  el.target;
    var nums = parseInt(events.attributes["num"].nodeValue);
    if(nums =='undefind'){
    }else{
    var lengths = $(".noMask").length;
    if(lengths>0){  
      $(".noMask").addClass("mask").removeClass('noMask');
    }
    $(".mask")[nums].className='noMask';    
    index = nums;
    timer = nums+1;
    var width = width_pic_big;
    width = width * index;
    $("#picsShow")[0].style.marginLeft='-'+width+'px';
    }
  })
  $(".small-img,.next-img,.pre-img").mouseover(function(){
      clearInterval(ids); 
  })
  $(".small-img,.next-img,.pre-img").mouseout(function(){
      clearInterval(ids);
      timeoutID = setTimeout('lunbo()',500);   
  })

  $(".img-title-mask").hover(function()
    {
      $("a.img-title").css("text-decoration","underline");$(".img-title-mask").css("opacity","0.2");
    },function(){$("a.img-title").css("text-decoration","none");$(".img-title-mask").css("opacity","0.45");
  })

  function lunbo_in(){  
     var width =  width_pic_big * timer;
      $("#picsShow").animate({'margin-left':'-'+width+'px'},1); 
      $(".img-title")[0].href = decodeURIComponent(infos[timer].url);
      $(".img-title")[0].innerHTML = infos[timer].title;
      var lengths = $(".noMask").length;
      if(index>3){
        $("#small-img").animate({'margin-left':'-'+widths+'px'},1); 
      }
      if(index==0){
        $("#small-img")[0].style.marginLeft=0;
      }
      if(lengths>0){  
        $(".noMask").addClass("mask").removeClass('noMask');
      }
      $(".mask")[timer].className='noMask';
      timer++;
      index++;
      if(timer%8==0&&timer>0){
        timer = 0;
        index = 0;
      } 
  }

  function lunbo(){
     clearTimeout(timeoutID) ;
     clearInterval(ids);
     ids = setInterval(lunbo_in,2000);
  }
  function click_fy(){
    var width = width_pic_big * index;
    width = '-'+width+'px';
    $("#picsShow").css({"margin-left":width});
    $(".img-title")[0].href = decodeURIComponent(infos[index].url);
    $(".img-title")[0].innerHTML = infos[index].title;
    if(index>3){//小图
    $("#small-img").animate({'margin-left':'-'+widths+'px'},1); 
    }
    if(index==0){
      $("#small-img")[0].style.marginLeft=0;
    }
    var lengths = $(".noMask").length;
    if(lengths>0){  
      $(".noMask").addClass("mask").removeClass('noMask');
    }
    $(".mask")[index].className='noMask';
  }