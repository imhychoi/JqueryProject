	//--------------------------------------------------------------------------
	//PURPOSE : 숫자만 입력 :style="ime-mode:disabled;" & onKeyPress="GJF_Only_Num(this);" 
	//CREATE  : 2013-09-25 태승호 
	//MODIFY  :
	//--------------------------------------------------------------------------
	function GJF_Only_Num(obj)
	{
		if (event.keyCode >= 48 && event.keyCode <= 57) { //숫자키만 입력
			return true;
		} else {
			event.returnValue = false;
		}
	}

	function GJF_Only_Number(obj)
	{
		obj.value = obj.value.replace(/[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣\`\~\!\-\#\$\%\^\&\*\(\)\=\+\\\{\}\[\]\'\"\;\:\<\,\>\?\/\s]/g, '' );
		return true;
	}

	//--------------------------------------------------------------------------
	//PURPOSE : 숫자,영어만 입력
	//CREATE  : 2013-09-25 태승호
	//MODIFY  :
	//--------------------------------------------------------------------------
	function GJF_Only_EngNum(obj)
	{
		var num_regx=/^[0-9a-zA-Z.@_]*$/;
		if(!num_regx.test(obj.value))
		{
			//alert("영문, 숫자 조합만 가능합니다.");
			obj.value = obj.value.substring(0, obj.value.length-1 );
		}
	}

	//--------------------------------------------------------------------------
	//PURPOSE : 이메일 정규식
	//CREATE  : 2013-11-27 태승호
	//MODIFY  :
	//--------------------------------------------------------------------------
	function GJF_Only_Email(obj)
	{
		obj.value = obj.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\`\~\!\#\$\%\^\&\*\(\)\=\+\\\{\}\[\]\'\"\;\:\<\,\>\?\/\s]/g, '' );
		return true;
	}

	//--------------------------------------------------------------------------
	//PURPOSE : str1에 str2를 붙여나간다. str1에 이미 내용이 있을 경우는 addType에 맞게 연결자를 붙이고 str2를 붙인다. 없으면 그냥 붙이고..
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//Example : str1 = addString(str1, "str2", ",");
	//          addType : <br> / \r\n / &gt; etc
	//--------------------------------------------------------------------------
	function addString(str1, str2, addType)
	{
		if (str1 == "")
		{
			str1 = str2;
		}
		else
		{
			if (str2 != "")
			{
				str1 = str1 + addType + str2;
			}
		}

		return str1;
	}

	//--------------------------------------------------------------------------
	//PURPOSE : 문자열의 byte 길이를 반환한다. GF_LenByte 참조
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//--------------------------------------------------------------------------
	function LenByte(data)
	{
		var len = 0;

		var str = data.substring(0);

		if (str == null) return 0;

		for (var i = 0; i < str.length; i++)
		{
			var ch = escape(str.charAt(i));

			if (ch.length == 1) len++;
			else if (ch.indexOf("%u") != -1)  len += 2;                             //Db가 한글을 3byte로 인식하여 2->3
			else if (ch.indexOf("%") != -1) len += ch.length/3;
		}

		return len;
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 숫자에 1000 단위 코마
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//------------------------------------------------------------------------------
	function putCommaStr(numericString)
	{
		if (numericString.length == 0) return "";

		numericString = stripCommasStr(numericString);
		var tempValue = "";

		var iIndex = numericString.indexOf(".");
		if(-1 == iIndex) iIndex = numericString.length;

		for(iIndexComma = iIndex - 3; iIndexComma > 0; iIndexComma = iIndex - 3)
		{
			tempValue = "";
			tempValue += numericString.substring(0,iIndexComma);
			tempValue += ",";
			tempValue += numericString.substring(iIndexComma);
			numericString = tempValue;
			iIndex = iIndexComma;
		}
		return numericString;
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 숫자에 1000 단위 코마
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//------------------------------------------------------------------------------
	function putComma(Obj)
	{
		if(Obj==null) return false;

		Obj.value = putCommaStr(Obj.value);
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 숫자에서 코마 제거
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//------------------------------------------------------------------------------
	function stripCommasStr(numericString)
	{
		if (numericString.length == 0) return "";

		var tempValue = "";
		var iIndex = numericString.indexOf(",");

		for(;iIndex != -1; iIndex = numericString.indexOf(","))
		{
			tempValue = "";
			tempValue += numericString.substring(0,iIndex);
			tempValue += numericString.substring(iIndex+1);
			numericString = tempValue;
		}
		return numericString;
	}

	//------------------------------------------------------------------------------
	//PURPOSE : CheckNumberKeys - 숫자만 입력. 문자입력 금지 함수 설정
	//CREATE  : 2011-05-01 ZERONE
	//MODIFY  :
	//------------------------------------------------------------------------------
	function CheckNumberKeys()
	{
		if( event.keyCode < 48 || event.keyCode > 57 )
		{
			if (event.keyCode != 13)
			{
				event.keyCode = 0;
				alert("숫자만 입력 가능합니다.");
			}
		}
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 숫자에 1000 단위 코마
	//CREATE  : 2013-11-13 정용준
	//MODIFY  :
	//------------------------------------------------------------------------------
	function commaNum(num) {
		var len, point, str;

		num = num + "";
		point = num.length % 3
		len = num.length;

		str = num.substring(0, point);
		while (point < len) {
			if (str != "") str += ",";
			str += num.substring(point, point + 3);
			point += 3;
		}
		return str;
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 모자란 자릿수 0으로 채우기
	//CREATE  : 2013-11-26 태승호
	//MODIFY  :
	//------------------------------------------------------------------------------
	function makeZeros(n, digits){
		var zero = '';
		n = n.toString();

		if(n.length < digits){
			for(i = 0;i < digits - n.length ; i++){
				zero += '0';
			}
		}
		return zero + n;
	}


	//------------------------------------------------------------------------------
	//PURPOSE : 쿠키 설정
	//CREATE  : 2013-10-10 정용준
	//MODIFY  :
	//------------------------------------------------------------------------------
	function fn_setCookie( name, value, expiredays ) {

		var todayDate = new Date();

		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 쿠기 삭제
	//CREATE  : 2013-09-26 정용준
	//MODIFY  :
	//------------------------------------------------------------------------------
	function fn_deleteCookie(cookieName)
	{
		var expireDate = new Date();

		//어제 날짜를 쿠키 소멸 날짜로 설정한다.
		expireDate.setDate( expireDate.getDate() - 1 );
		document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 쿠기 확인
	//CREATE  : 2013-09-26 정용준
	//MODIFY  :
	//------------------------------------------------------------------------------
	function fn_getCookie(name)
	{
		var nameOfCookie = name + "=";
		var x = 0;
		while ( x <= document.cookie.length ) {
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			 if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				 endOfCookie = document.cookie.length;
			 return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
			 break;
		}
		return "";
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 바이트단위로 자르기
	//CREATE  : 2013-12-02 태승호
	//MODIFY  :
	//------------------------------------------------------------------------------
	function cutByte(str, len) {
		var count = 0;

		for(var i = 0; i < str.length; i++) {
			if(escape(str.charAt(i)).length >= 4)
				count += 2;
			else
			if(escape(str.charAt(i)) != "%0D")
				count++;

				if(count >  len) {
					if(escape(str.charAt(i)) == "%0A")
						i--;
						break;
				}
		}
		return str.substring(0, i);
	}

	//------------------------------------------------------------------------------
	//PURPOSE : 버튼 이벤트 추적
	//CREATE  : 2014-06-18 진성광
	//MODIFY  :
	//------------------------------------------------------------------------------
	function fn_send_ga(category, action, label)
	{
		ga('send', 'event', category, action, label);
	}
