$(function () {
    $('#zipcode').blur(sampleEvent);
 
    function sampleEvent() {
        $.ajax({
        url: 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' + $('#zipcode').val(),
        type: 'GET',
        dataType: 'json',
         })
        .done(function (data) {

            if (!data.results) {
                $('#zipcode').val("");
                $('#prefecture').val("都道府県");
                $('#city').val("");
                $('#address').val(""); 
                alert('郵便番号はハイフンを入れず、半角数字で入力してください。');
            }
            else{
                $('#prefecture').val(data.results[0].address1);
                $('#city').val(data.results[0].address2);
                $('#address').val(data.results[0].address3);  
            }
        })
        .fail(function () {
            alert("エラーが発生しました。");
        })
        .always(function () {
            console.log("always");
        });

  
    }



});