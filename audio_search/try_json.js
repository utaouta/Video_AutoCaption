$.ajax({
    url: 'test.php',
    method: 'POST',
    data: {
        'result': "sada"
    },
    dataType: 'json',
    success: res => {
        console.log(res);
    }
})