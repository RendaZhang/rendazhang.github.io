$(function () {
  'use strict';
  $('#contact-form').validator();
  $('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = window.CONTACT_FORM_ENDPOINT;
      $.ajax({
        type: 'POST',
        url: url,
        headers: { Accept: 'application/json; charset=utf-8' },
        data: $(this).serialize(),
        dataType: 'json',
        crossDomain: true,
        beforeSend: function () {
          $('#contact-form')
            .find('.messages')
            .html(
              '<div class="alert alert-info alert-dismissable"><div class="loader"><span>消</span><span>息</span><span>正</span><span>在</span><span>发</span><span>送</span><span>中</span><span>^_^</span></div></div>'
            );
        },
        success: function (data) {
          console.log(data);
          var ok = data.ok;
          var alertBox;
          if (ok) {
            alertBox =
              '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>已经发送到我的邮箱哦</div>';
            $('#contact-form').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
          } else {
            alertBox =
              '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>发送失败</div>';
            $('#contact-form').find('.messages').html(alertBox);
          }
        }
      });
      return false;
    }
  });
});
