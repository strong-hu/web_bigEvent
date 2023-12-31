$(function () {
  $("#link-reg").on("click", function () {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  $("#link-login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      if ($(".reg-box [name=password]").val() !== value) {
        return "两次输入的密码不一致";
      }
    },
  });
  $("#form-reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");
        $("#link-login").click();
      }
    );
  });
  $("#form-login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }

        layer.msg("登录成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
