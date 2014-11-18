function play(url){
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.type = "audio/mpeg";
	source.type = "audio/mpeg";
	source.src = url;
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
	$('.btn').hide();
	$('.stop').show();
}
// var audio = new Audio();

var tScore = 0;
var scoreArr = new Array();
    scoreArr[0] = 0;
    scoreArr[1] = 10;
    scoreArr[2] = 20;
    scoreArr[3] = 30;
    scoreArr[4] = 40;
    scoreArr[5] = 50;
    scoreArr[6] = 60;
	scoreArr[7] = 70;
	scoreArr[8] = 80;
	scoreArr[9] = 90;
function next(t){
    //console.log(t);
    $(".panel-body").hide();
    var $_this = $(".js_answer").eq(t);
        $_this.show();
    var type = $_this.attr('data-type');
    if(type==2){
        // audio.src = $_this.find('audio').attr('src');
        // audio.load();
        // audio.play();
        $('#sicon').html('<span class="glyphicon glyphicon-headphones"></span>');
    }
    else if(type==1){
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphicon glyphicon-picture"></span>');
    }
    else{
        // stop = true;
        // audio.pause();
        $('#sicon').html('<span class="glyphicon glyphicon-pencil"></span>');
    }
}

function result(t){
    console.log("得分"+tScore);
    $(".panel-body").hide();
    for (var i = scoreArr.length - 1; i >= 0; i--) {
        if ( parseInt(t) >= parseInt(scoreArr[i]) ) {
            console.log("应该弹"+i);
			
			if(i==0){
				$(".js_result").eq(-0).show();
			}else{
				$(".js_result").eq(i).show();
			}
            
            if(i>(total/2)){
                $('#sicon').html('<span class="glyphicon glyphicon-thumbs-up"></span>');
            }
            else{
                $('#sicon').html('<span class="glyphicon glyphicon-thumbs-down"></span>');
            }
            $.get("/Fy/up/", {
				wid: 42755,
				id: 87,
				score: tScore
			});
            return false;
        }
        else{
            continue;    
        }
    };
}

function toggle(t){
	console.log("当前得分"+score);
    $(".list-group-item").removeClass('active')
    var score = $(t).attr("data-score");
    tScore  = parseInt(tScore) + parseInt(score);
    $(t).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
    var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
	//音乐播放beg
	$('.btn').show();
    $('.stop').hide();
	//音乐播放end
    if(t == total){
        result(tScore);
    }
    else{
        setTimeout(function(){next(t);},300);
    }
}
Zepto(function($){
    $('.loads').hide();
	
	$.get('server/api.json',function(data){
		var questions = data.data.questions;
		console.log(questions);
		
		
		if(data.data.is_ad){
			
		}
		
		$('title').html(data.data.name)
		
		$('#all_desc_pan').html(data.data.desc);
		
		$('#all_name_pan').html(data.data.name);
		$('#all_count_pan').html(data.data.count);
		
		
		
		$('#all_weixin_name_pan').html(data.data.weixinName);
		$('#all_weixin_id_pan').html(data.data.weixinId);
		
		
		total = questions.length
		
		$.each(questions,function(i){
			console.log(questions[i]);
			
			var currentQuestion = questions[i];
			
			var answerHtml = "";
			$.each(currentQuestion.answers,function(j){
				var cAnswer = currentQuestion.answers[j];
				
				// {
// 						"label":"注意没注意",
// 						"is_answer":true
// 					},
//
				var data_score = 0;
				if(cAnswer.is_answer){
					data_score = 10;
				}
				
				function iToChar(z){
					switch(z)
					{
						case 0:
						  return "A";
						  break;
						case 1:
						  return "B";
						  break;
						case 2:
						  return "C";
						  break;
						case 3:
						  return "D";
						  break;
						case 4:
						  return "E";
						  break;
						default:
					 	
					} 
				}
				
				answerHtml += ""+"	<li class='list-group-item' data-score='"
								+ data_score
								+"' onclick='return toggle(this);'>"
								+"		<i class='glyphicon glyphicon-unchecked'></i>"+iToChar(j)+" "+ cAnswer.label+" "
								+"	</li>"; 
								
								
			});
		 
			
			var html = "<div id='panel2' class='panel-body js_answer' data-type='1'		 style='display: none;'>"
			    +"<dl>"
				+"	<dd><p>看到那几个孩子在哪里藏老门二突然发现自己老了！藏老门是是弄啥了？</p></dd>				"
			    +"</dl>"
			    +"<ul class='list-group js_group'>"
						+ answerHtml																					
				+"</ul>"
				+"<div class='buttons buttons2'>"
				+"<a href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd' class='btn btn-danger btn-danger2 btn-block'> "
				+"一键关注"
				+"</a>"
				+"</div>    "
				+"</div>";
			
			$("#timu_shengcheng_container").append(html);
		});
	});
	
	
})
WeixinApi.ready(function(Api) {
    Api.showOptionMenu();
    var wxData = {
        "appId": "wx6987e3e535ea35fe",
        "imgUrl" : 'http://weixiaoxinpic.qiniudn.com/Public/upload/42755/54082eb7c71e3.jpg',
        "link" : 'http://wap.weixiaoxin.com/Fy/index/?wid=42755&id=87&r=99517',
        "desc" : '刚在河南方言考试中，得了[n]分，你也来测试一下吧！',
        "title" : '在河南方言考试中我获得了[n]分，足厉害啊！'
    };
    // 分享的回调
    var wxCallbacks = {
        // 分享操作开始之前
        ready:function () {
            wxData['title']=wxData['title'].replace('[n]',tScore);
            wxData['desc']=wxData['desc'].replace('[n]',tScore);
        },
        // 分享被用户自动取消
        cancel : function(resp) {
            alert("别这样的啦，好东西要和朋友分享的嘛！分享后我告诉你一个秘密。");
        },
        // 分享失败了
        fail : function(resp) {
            alert("分享失败，可能是网络问题，一会儿再试试？");
        },
        // 分享成功
        confirm : function(resp) {
            //$.get("mobile.php?act=module&name=dialect&do=detail&weid=6", {id: "7",op:'share'});
			 $.get("/Fy/up_share/", {
				wid: 42755,
				id: 87,
				score: tScore
			});
			window.location.href='http://mp.weixin.qq.com/s?__biz=MzA3ODk1NzQxNA==&mid=200904455&idx=1&sn=39486707ffef126a1ca767a319713dad#rd';				
        },
    };
    Api.shareToFriend(wxData,wxCallbacks);
    Api.shareToTimeline(wxData,wxCallbacks);
    Api.shareToWeibo(wxData,wxCallbacks);
});

$("#content img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content').innerWidth()){
	
	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}
				   
});
$("#content2 img").each(function(){
$(this).removeAttr('height');
if(($(this).width()+20)>$('#content2').innerWidth()){
	
	$(this).removeAttr('style').removeAttr('width');
	$(this).removeAttr('style').attr('width',($('#content2').innerWidth()-20));
}else{
	$(this).removeAttr('style').attr('max-width','100%');
}
				   
});

