$(() => {
  $('#button').click(() => {
    const val1 = parseInt($('#num1').val());
    const val2 = parseInt($('#num2').val());
    const body = {
      n1: val1,
      n2: val2,
    };
    $.ajax({
      type: 'POST',
      url: '/game',
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: (result) => {
        $('#result').text(result.result);
      },
    });
  });
});
