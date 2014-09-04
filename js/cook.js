/*
 * @name:煮牛肉;
 * @author:tqtan;
 * @site:http://targetkiller.net/;
 * @date:2014/8/13;
*/

// 公用变量
var score = 0;
var totalTime = 20;
var time = totalTime;
var time_cut = 0.01;
var lastTime = 500;
var occurTime = 1000;
var timeInter;

// 适应矮屏手机320x480
var bHeight = $(window).height();
if(bHeight<481){
    $('.container').addClass('container-low');
}

// 让欢迎动画下方为黑色
$('.welcome-bottom').height(bHeight-414);

function initConfig(){
	score = 0;
	time = totalTime;
	timeInter;
}

// 封装方法
function ranNum(num){
	return parseInt(Math.random()*num);
}

function ranClickNum(){
	return (parseInt(Math.random()*maxClickNum)+3);
}

function ranEvent(){
	var num = parseInt(Math.random()*3);
	var ev = "";
	switch(num){
		case 0:ev="water";break;
		case 1:ev="wine";break;
		case 2:ev="done";break;
		default:ev="";break;
	}
	return ev;
}

function updateTime(){
	// $('#time').text(time.toFixed(2));
	$('#progress').width((time/totalTime)*100+'%');
}

function updateScore(){
	$('#score').text(score);
}

function getName(){
	var name = '打酱油';
	if(score > 40){name = '牛之神';}
	else if(score > 35){name = '肉皇大帝';}
	else if(score > 30){name = '牛魔王';}
	else if(score > 25){name = '米其林三星主厨';}
	else if(score > 20){name = '厨神';}
	else if(score > 15){name = '厨王';}
	else if(score > 10){name = '高级厨师';}
	else if(score > 5){name = '小厨师';}
	else{name = '打酱油';}

	return name;
}


function startGame(){
	$('.welcome').addClass('hide');
	$('.welcome-bottom').addClass('hide');
	$('.transfer').removeClass('hide');
	$('.center').removeClass('hide');
	$('#score').removeClass('hide');
	$('#progress').css('background-color','#2ecc71');
	$('#progress').removeClass('hide');

	// 开启时间计时器
	timeInter = setInterval(function(){
		if(time < 8 && time > 3){
			occurTime = 250;
		}
		else if(time < 3 && time > 0){
			$('#progress').css('background-color','red');
			if(navigator.vibrate){
				navigator.vibrate(3000);
			}
		}
		else if(time < 0){
			gameover();
		}
		time -= time_cut;
		updateTime();

	},10);
}

function gameover(){
 	var shareMsg = '不慌不忙，我做了'+score+'碟牛肉';
 	var reward = '获得了'+getName()+'的称号！';
 	$('.result').text(shareMsg);
 	$('.reward').text(reward);
	shareInfo.shareTitle = shareMsg+','+reward;

	clearInterval(timeInter);

 	$('#progress').addClass('hide');
 	$('#score').addClass('hide');
 	$('.end').removeClass('hide');
 }

var p_pos=[
	{top:266,left:140},
	{top:208,left:163},
	{top:298,left:150},
	{top:272,left:178},
	{top:280,left:198},
	{top:311,left:117},
	{top:317,left:87},
	{top:319,left:94},
	{top:294,left:61}
];

function bombEffect(){
	var num = ranNum(9);
	var $p = $(".p").eq(num);
	$p.removeClass("hide");
	x = ranNum(6)-3;
	y = ranNum(3)-1.5;
	distanceX = 0.1;
	distanceY = -0.2;
	flag = 0;
	var bombInter = setInterval(function(){
		$p.css({"left":parseInt($p.css("left").slice(0,-2))+x,"top":parseInt($p.css("top").slice(0,-2))+y});
		x+=distanceX;
		y+=distanceY;
		if(parseInt($p.css("left").slice(0,-2))>20&&flag==0){
			distanceY = 0.2;
			distanceX = 0;
			flag = 1;
		}
		if(parseInt($p.css("top").slice(0,-2))>700){
			clearInterval(bombInter);
			$p.css({left:p_pos[num].left,top:p_pos[num].top}).addClass("hide");
			flag = 1;
		}

	},10);
}

// 游戏操作监听

document.ontouchmove = function(event){
    event.preventDefault();
}

$('.beef').bind('tap',function(){
	score++;
	updateScore();
	$(this).addClass("beef-hit");
	setTimeout(function(){$('.beef').removeClass("beef-hit")},50);
	bombEffect();
});

// 按钮监听

$('.btn-start').bind('tap',function(){
	startGame();
});

$('.btn-share').bind('tap',function(){
	$('.share').removeClass('hide');
});

$('.btn-again').bind('tap',function(){
	$('.end').addClass('hide');
	// 重置参数
	initConfig();
	updateScore();
	startGame();
});

$('.share').bind('tap',function(){
	$('.share').addClass('hide');
});

// test
// startGame();


/* 分享功能 */
var shareInfo = {
	appid: '',
    imgUrl: 'http://qzonestyle.gtimg.cn/aoi/sola/20140819153418_gQEOOUKEvO.jpg',
    lineLink: 'http://m.isux.us/code/cook/cook.html',
	descContent: '你能煮好多少碟牛肉？有能力来试试！',
	shareTitle: '一起来煮牛肉吧！'
}
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": shareInfo.appid,
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
           //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": shareInfo.descContent,
        "url": shareInfo.lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);