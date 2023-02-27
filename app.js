$(".flex .box").append("<div class='overlay'></div>");
function buttonSize() {
    var width = $("#name").innerWidth();
var height = $("#name").innerHeight();
$('#send').innerWidth(width)
$('#send').innerHeight(height)
}
buttonSize();
$( window ).resize(function() {
    buttonSize();
  });

