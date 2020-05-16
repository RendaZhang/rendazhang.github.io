$(function () {
    "use strict";

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "https://formspree.io/xlepgene";

            // POST values in the background with the script URL
            $.ajax({
                type: "POST",
                url: url,
                headers: {      // request headers
                    Accept: "application/json; charset=utf-8"
                },
                data: $(this).serialize(),
                dataType: 'json',
                crossDomain: true,
                success: function (data)
                {
                    // data = JSON object that formspree returns
                    console.log(data);
                    var ok = data.ok;
                    // let's compose Bootstrap alert box HTML
                    var alertBox;
                    if (ok) {
                        alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>已经发送到我的邮箱哦</div>';
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    } else {
                        alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>发送失败</div>';
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                    }
                }
            });
            return false;
        }
    })
});