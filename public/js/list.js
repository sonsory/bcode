$(document).ready(function(){
  $("#list_btn").click(function(){
    $("#list_div").show();
    $.ajax({
      type: "GET",
      url: '/list',
      success:function(data){
        $("#list_table tr:gt(0)").remove();
        for( var i=0; i<data.length; i++ ){
            $('#list_table tr:last').after('<tr><td>'+data[i].bcode+'</td><td>'+data[i].link+'</td><td>'+data[i].explain+'</td></tr>');
        }
      }
    });

  });
  $("#list_close_btn").click(function(){
    $("#list_div").hide();
  });

  $("#link_submit").click(function(){

    $.ajax({
      type: "POST",
      url: '/create',
      data: { link: $("#link_input").val(), explain: $("#link_explain").val(), bcode: valSum()}
    });
  });
});