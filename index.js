window.onload = function(){
	var oList = $('list')
    var oTab = getClassName(oList,'tab')[0];
    var oListContain = getClassName(oList,'list-cotain')[0];
	var aInput = oTab.getElementsByTagName('input');
	var oDesign = getClassName(oList,'design')[0];
	var olanguage = getClassName(oList,'language')[0];
    
    tab();
    setList(olanguage,1,20);
    setList(oDesign,1,10);
    banner();
    

    /*banner*/
	function banner(){
        var oBanner = document.getElementById('banner');
        var aUl1 = getClassName(oBanner,'banner-img')[0];
        var aLi1 = aUl1.getElementsByTagName('li');
        var aUl2 = getClassName(oBanner,'cursor')[0];
        var aLi2 = aUl2.getElementsByTagName('li');
        var num = 1;
        var timer = null;
        
        aLi1[0].style.opacity = 1;
		aLi1[0].style.filter = 'alpha(opacity=100)';

        /*鼠标滑入清楚定时器*/
        oBanner.onmouseover = function  () {
        	clearInterval(timer);
        }
        oBanner.onmouseout = function  () {
        	timer = setInterval(bacolor,5000);
        }

        timer = setInterval(bacolor, 5000);
        function bacolor () {
        	for (var i = 0; i < aLi1.length; i++) {
        		aLi1[i].style.opacity = 0;
        		aLi1[i].style.filter = 'alpha(opacity=0)';
        	};
        	for (var i = 0; i < aLi2.length; i++) {
        			aLi2[i].className = '';
        		};
        	aLi2[num].className = 'active';
        	doColor(aLi1[num],10,100,function  () {
        		num++;
        		if (num == 3) {
        			num =0;
        		};
        	})
        }

        /*点击指示器跳转图片*/
        for (var i = 0; i < aLi2.length; i++) {
        	aLi2[i].index = i;
        	aLi2[i].onclick = function  () {
        		num = this.index;
        		bacolor();
        	}
        };	
    }

	/*透明度函数*/
    function doColor(obj,num,target,endFn) {

	    clearInterval(obj.Dtimer);

	    num = Math.floor(getStyle(obj, 'opacity') * 100) < target ? num : -num;

	    obj.Dtimer = setInterval(function () {

	        var Depth = Math.floor(getStyle(obj, 'opacity') * 100) + num;  //±ä»¯ËÙ¶È

	        if (Depth > target && num > 0 || Depth < target && num < 0) {
	            Depth = target;
	        }

	        obj.style.opacity = Depth / 100;
	        obj.style.filter = 'alpha(opacity=' + Depth + ')';

	        if (Depth === target) {
	            clearInterval(obj.Dtimer);
	            endFn && endFn();
	        }

	    }, 50)

	}
		
    
    /*课程列表选项卡*/
    function tab () {
		var oFlip = document.getElementById('flip');
    	var oSpan = oFlip.getElementsByTagName('span');

    	olanguage.style.display = 'none';
    	aInput[1].onclick = function  () {
    		var num = 0;
    		for (var i = 0; i < oSpan.length; i++) {
    			if(oSpan[i].className == 'click'){
    				num = i+1;
    				}
    		};
    		this.className = 'active';
    		aInput[0].className = '';
    	    removeChildren(olanguage);
			setList(oDesign,num,10);
            setList(olanguage,num,20);
			olanguage.style.display = 'block';
			oDesign.style.display = 'none';
		}
		aInput[0].onclick = function  () {
			var num = 0;
    		for (var i = 0; i < oSpan.length; i++) {
    			if(oSpan[i].className == 'click'){
    				num = i+1;
    				}
    		};
			this.className = 'active';
			aInput[1].className = '';
			removeChildren(oDesign);
			setList(oDesign,num,10);
            setList(olanguage,num,20);
			oDesign.style.display = 'block';
			olanguage.style.display = 'none';
		}


    }



    /*设置课程列表*/
    function setList (elm,page,num) {
    	
    	getList('http://study.163.com/webDev/couresByCategory.htm','pageNo='+page+'&psize=20&type='+num+'',function (data) {
        	var data = JSON.parse(data);
        	
        	for (var i = 0; i < data.list.length; i++) {
         	var oDiv = document.createElement('div');
	    	oDiv.className = 'pro-list';
	    	elm.appendChild(oDiv)
	    	var oImg = document.createElement('img');
	    	oImg.src= data.list[i].middlePhotoUrl;
	    	var oH3 = document.createElement('h3');
	    	oH3.innerHTML = data.list[i].name ;
	    	var oStrong = document.createElement('strong');
	    	oStrong.innerHTML = data.list[i].provider ;
	    	var oSpan = document.createElement('span');
	    	oSpan.innerHTML = data.list[i].learnerCount ;
	    	var oI = document.createElement('i');
	    	if(data.list[i].price == 0){
				oI.innerHTML = '免费' ;
	    	}else{
	    		oI.innerHTML = '￥' + data.list[i].price ;
	    	}

	    	var sDiv = document.createElement('div');
	    	sDiv.className = 'hover';
	    	var sImg = document.createElement('img');
	    	sImg.src = data.list[i].middlePhotoUrl;
	    	var sH2 = document.createElement('h2');
	    	sH2.innerHTML = data.list[i].name ;
	    	var sSpan = document.createElement('span');
	    	sSpan.innerHTML = data.list[i].learnerCount +'人在学';
	    	var sI = document.createElement('i');
	    	sI.innerHTML = '发布者：' + data.list[i].provider;
	    	var aI = document.createElement('i');
	    	sI.innerHTML = '分类：' + data.list[i].categoryName;
	    	var sP = document.createElement('p');
	    	sP.innerHTML = data.list[i].description;
	    	

	    	oDiv.appendChild(oImg);
	    	oDiv.appendChild(oH3);
	    	oDiv.appendChild(oStrong);
	    	oDiv.appendChild(oSpan);
	    	oDiv.appendChild(oI);
	    	oDiv.appendChild(sDiv);

	    	sDiv.appendChild(sImg);
	    	sDiv.appendChild(sH2);
	    	sDiv.appendChild(sSpan);
			sDiv.appendChild(sI);
	    	sDiv.appendChild(aI);
	    	sDiv.appendChild(sP);
         };
        }) 
    }
   flip ();
    /*翻页*/
    function flip () {
	    var oFlip = document.getElementById('flip');
    	var oSpan = oFlip.getElementsByTagName('span');
    	var oPrev = getClassName(oFlip,'prev')[0];
    	var oNext = getClassName(oFlip,'next')[0];
    	var num = 0;
    	oNext.onclick = function() {
            for (var i = 0; i < oSpan.length; i++) {
			if(oSpan[i].className == 'click'){
				num = i+1;
				}
		}; 
        	oSpan[num].click(); 
		} 
		oPrev.onclick = function() { 
			for (var i = 0; i < oSpan.length; i++) {
				if(oSpan[i].className == 'click'){
					num = i;
				}
			};
			if(num == 0){
               return false
			}else{
				oSpan[num-1].click();
			}
		} 

    	oSpan[0].className = 'click';
    	for (var i = 0; i < oSpan.length; i++) {
    		oSpan[i].index = i;
    		oSpan[i].onclick = function  () {
    			num = this.index;
    			for (var i = 0; i < oSpan.length; i++) {
    				oSpan[i].className = '';
    			};
    			this.className = 'click';
    			if(aInput[0].className == 'active' && aInput[1].className == '' ){
    				
	    			setList(oDesign,num+1,10);
	    			setList(olanguage,num+1,20);
	    			removeChildren(oDesign);
	    			olanguage.style.display = 'none'
    			}else if(aInput[1].className == 'active' && aInput[0].className == '' ){
                    
                    setList(oDesign,num+1,10);
                    oDesign.style.display = 'none'
	    			setList(olanguage,num+1,20);
	    			removeChildren(olanguage);
    			}
    			
    		}
    	};
    }

    /*获取课程列表*/
    function getList (url,data,success) {
    	var xhr = null;

    	if(window.XMLHttpRequest){
    		xhr = new XMLHttpRequest;
    	}else if(window.ActiveXObject){
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
    	}

    	url += '?' + data;

    	xhr.open('get',url,success);
    	xhr.send();

    	xhr.onreadystatechange = function  () {
    		if(xhr.readyState == 4){
    			if(xhr.status == 200){
    				success && success(xhr.responseText);
    			}else{
    				alert('出错了,Err：' + xhr.status);
    			}
    		}
    	}
    }

    /*热门列表*/

    /*视频*/
    (function(){ //元素获取
		var oVideoImg = document.getElementById('videoImg');
		var oVideoBoxWrap = document.getElementById('videoBoxWrap');
		var oVideoBox = oVideoBoxWrap.getElementsByTagName('div')[0];
		var oVideoClose = oVideoBox.getElementsByTagName('div')[0];
		var oVideo = oVideoBox.getElementsByTagName('video')[0];
		var object = document.getElementsByTagName('object')[0];
		
		//点击图片时，弹出out-videoBoxWrap
		oVideoImg.onclick = function(){
			oVideoBoxWrap.style.cssText = "background-color: rgba(0,0,0,0.5);z-index:1";
			oVideoBox.style.cssText = "transform:  scale(1) ";
			oVideoBox.style.visibility = 'visible';
			object.style.display = 'block';
		}
		//点击关闭按钮时，关闭out-videoBoxWrap
		oVideoClose.onclick = function(){
			oVideoBoxWrap.style.cssText = "background-color: rgba(0,0,0,0);z-index:-1";
			oVideoBox.style.cssText = "transform:  scale(0)";
			oVideoBox.style.visibility = 'hidden';
			object.style.display = 'none';
			oVideo.currentTime = 0;
			oVideo.pause();
		}	
	})();
	/*列表*/
	

	(function(){
		var oTimer = null;
		var index = 0;

		//运行ajax函数
        getList('http://study.163.com/webDev/hotcouresByCategory.htm','',function  (data) {
			var data = JSON.parse(data);
			fnNewHot(data);
		})

		//生成最热排行HTML结构
		function fnNewHot(data){
			var oUl = document.getElementById('sideConList');
			var oHtml = '';
			for(var i = 0; i < 20; i++){
				oHtml += '<li class="side-con-listI">\
	                          <img src="'+data[i].smallPhotoUrl+'">\
	                          <div class="side-txtBox">\
		                          <h3 class="side-side-txtBox-tit">'+data[i].name+'</h3>\
		                          <p class="side-txtBox-num">\
										<span class="vm side-txtBox-icon"> </span>\
										<span class="vm">'+data[i].learnerCount+'</span>\
		                          </p>\
	                          </div>\
						  </li>'
			}
			oUl.innerHTML = oHtml;
		}
		

		//每5秒更新课程
		oTimer = setInterval(function(){
			var oUl = document.getElementById('sideConList');
			var oLi = oUl.getElementsByTagName('li')[0];
			index++;
			oLi.style.cssText = 'margin-top: '+ (-70*index)+'px;';
			if(index == 11){
				oLi.style.marginTop = '';
				index = 0;	
				oLi.style.transition = 'margin 0ms';			
			}
		},5000);	
	})();
    

	/*cookie*/
	function setCookie(name,value,iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie = name+'='+value+';expires='+oDate;
	}	
	function getCookie(name){
		var arr = document.cookie.split('; ');
		for(var i = 0; i < arr.length; i++){
			var arr2 = arr[i].split('=');
			if(arr2[0] == name){
				return arr2[1];
			} 
		}
		return '';
	}	
	function removeCookie(name){
		setCookie(name,'',-1);
	}	
	

	/*关闭顶部通知条*/
	(function(){
		var oHeader = document.getElementById('header');
		var oClose = getClassName(oHeader,'close')[0];

		oClose.onclick = function(){
			oHeader.style.display = 'none';
			setCookie('topValue','none',1);
		}
		oHeader.style.display=getCookie('topValue');
	})();

    /*关注网易教育产品部*/
	(function(){
		var oNav = document.getElementById('nav');
		var oFollow = getClassName(oNav,'follow')[0];
		var oFansNum = oNav.getElementsByTagName('span')[0]
		var oLoginWrap = document.getElementById('loginWrap');
		var oLogin = oLoginWrap.getElementsByTagName('div')[0];
		var oClose = oLoginWrap.getElementsByTagName('span')[0];
		var oForm = document.forms[0];
		var oUser = oForm.userName;
		var oPassword = oForm.password;
		var oSubmit = oForm.submit;	
		var oNo = document.createElement('span');
		
		//根据关注的cookie来决定关注div的显示方式
		
		//关注按钮
		oFollow.onclick = function(){
		    //如果未登录

			if(getCookie('loginSuc') != 1){
				fnLoginOpen();
			}else{
				//如果已登录，但未关注
				if(getCookie('followSuc') != 1){
					fnFocusYes();
				}
			}
		}
		//关闭按钮
		oClose.onclick = function(){
			fnLoginClose();
		}
		//取消按钮
		oNo.onclick = function(ev){
			var e = ev || event;
			e.cancelBubble = true;
			fnFocusNo();
		}	
		oForm.onsubmit = function(){
			getList('http://study.163.com/webDev/login.htm','userName='+hex_md5(oUser.value)+'&password='+hex_md5(oPassword.value)+'', function(data){
			    	if(data == 0){
			    		alert('您输入的不正确，测试帐号为studyOnline，密码为study.163.com');
			    		oUser.value = 'studyOnline';
			    		oPassword.value = 'study.163.com';
			       	}else{
			       		alert('登录成功');
			       		setCookie('loginSuc',1,1);
			       		fnFocusYes();
			       		fnLoginClose();
			       }
			    });
			return false;
		}
		//登录框的显示
		function fnLoginOpen(){
			oLoginWrap.style.cssText = "background-color: rgba(0,0,0,0.5);z-index:1";
			oLogin.style.cssText = "transform:  scale(1) ";
			oLogin.style.visibility = 'visible';
		}
		//登录框的关闭
		function fnLoginClose(){
			oLoginWrap.style.cssText = "background-color: rgba(0,0,0,0);z-index:-1";
			oLogin.style.cssText = "transform:  scale(0)";
			oLogin.style.visibility = 'hidden';	
		}
		//设置关注
		function fnFocusYes(){
			if(!getCookie('followSuc')){
				setCookie('followSuc',1,1);
				oFansNum.innerHTML = '粉丝 46';
				oFollow.className = 'followed'
				oFollow.value = '已关注 | 取消'
				oNo.className = 'vm hd-titBox-focus-no';
				oNo.innerHTML = '取消';
				oFollow.appendChild(oNo);			
			}
		}
		//取消关注
		function fnFocusNo(){
			oFansNum.innerHTML = Number(oFansNum.innerHTML) - 1;
			oFollow.getElementsByTagName('span')[0].style.backgroundPosition = '-40px 0';
			oFollow.className = 'hd-titBox-focus';
			oFollow.getElementsByTagName('span')[1].innerHTML = '关注';
			oNo.parentNode.removeChild(oNo);	
			removeCookie('followSuc');	
		}	
	})();


    
    /*删除子节点*/
    function removeChildren(pnode){    
		var childs=pnode.childNodes;    
		for(var i=childs.length-1;i>=0;i--){    
			pnode.removeChild(childs.item(i));    
		}    
	} 

	/*ID函数*/
	function $(id) {                             //简化getElementById函数
	    		return document.getElementById(id);
	    	}

	/*获取实时样式*/
	function getStyle ( obj, attr ) {
    return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr];
	}
	/*getclass*/
	function getClassName(element, names) {   //获取class元素
		if (element.getElementsByClassName) {
			return element.getElementsByClassName(names);
		} else {
			var elements = element.getElementsByTagName('*');
			var result = [];
			var element,
				classNameStr,
				flag;
			names = names.split(' ');
			for (var i = 0; element = elements[i]; i++) {
				classNameStr = ' ' + element.className + ' ';
				flag = true;
				for (var j = 0, name; name = names[j]; j++) {
					if (classNameStr.indexOf(' ' + name + '') == -1) {
						flag = false;
						break;
					}
				}
				if (flag) {
					result.push(element);
				}
			}
			return result;
		}
	}
}