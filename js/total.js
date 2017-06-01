
function Orderlist(menuStr,obj,toggle,item){
            var price = parseInt($('#'+item).val()); //가격
          
            if(obj.checked){
            $('.nemo #order_list').append('<li id="'+menuStr+'">'+menuStr+'</li>');
              $('#'+toggle).toggle(300);
            }else{
               var tempMinus = (parseInt(uncomma($('#total_num').val()))) - (parseInt($('#'+item+'Amount').val()) * parseInt($('#'+item).val())); 
               $('#total_num').val(comma(tempMinus-price));
               $('#'+item+'Amount').val(1);
               $('#'+menuStr).remove();
               $('#'+toggle).hide(300);                                                                                                    
            }
        };  

function plus(item) { //+ 버튼
   var temp = parseInt($('#'+item+'Amount').val()) + 1;
   $('#'+item+'Amount').val(temp);
   var tempSum = parseInt(uncomma($('#total_num').val())) + parseInt($('#'+item).val());
   $('#total_num').val(comma(tempSum));  
} 

function minus(item) { //- 버튼
   var temp = parseInt($('#'+item+'Amount').val()) - 1;
   $('#'+item+'Amount').val(temp);

    if(temp<0){ //0이하 방지
        $('#'+item+'Amount').val(0); 
    }else{
        var tempSum = parseInt(uncomma($('#total_num').val())) - parseInt($('#'+item).val());
        $('#total_num').val(comma(tempSum));
    }
} 

function itemSum(tt, num){
            var sum=0;
            sum = parseInt(uncomma($('#total_num').val())) + parseInt(tt.chk[num].value);
            tt.total_sum.value = comma(sum);
    
        };

 //콤마찍기
 function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
 }

 //콤마풀기
 function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
 }

//댓글달기
// function OpenInfo() {
//    $(".reply_form").css("disPlay","block")
// }
 
