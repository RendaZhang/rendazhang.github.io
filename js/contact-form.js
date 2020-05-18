// Contact
$('#contact-form').submit(function() {
    var action = $(this).attr('action');
    $("#message").slideUp(750, function() {
        $('#message').hide();

        $('#submit')
            .before('')
            .attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: action,
            headers: {Accept: "application/json; charset=utf-8"},
            data: {
                "name": $('#name').val(),
                "contact": $('#email').val(),
                "message": $('#comments').val()
            },
            dataType: "json",
            crossDomain: true,
            beforeSend: function () {

            },
            success: function (data) {
                console.log(data);
                $('#message').slideDown('slow');
                $('#contact-form images.contact-loader').fadeOut('slow', function() {
                    $(this).remove()
                });
                $('#submit').removeAttr('disabled');
                var ok = data.ok;
                if (ok) {
                    $('#contact-form').slideUp('slow')
                    document.getElementById('message').innerHTML = '<p>I have received your Message. Thank you!</p>';
                } else {
                    document.getElementById('message').innerHTML = '<p>Sorry. Failed to Send the Message.</p>';
                }
            },
            error: function (data) {
                console.log(data);
            }
        });

    });

    return false;

});