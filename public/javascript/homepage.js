$(function () {
  $("span").click(function () {
    $("#post-list li:hidden").slice(0, 2).show();
    if ($("#post-list li").length == $("#post-list li:visible").length) {
      $("span ").hide();
    }
  });
});
