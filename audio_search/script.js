

$(document).ready(function () {
    $("#search").keyup(function () {
        search_highlight($(this).val())

    })

});

function search_highlight(search_text){
    if (search_text){
        // let content = document.getElementsByClassName("subtitle");
        for (var i=0;i < lines;i++){
        let content = $("div#"+i+"").text();
        let searchExp = new RegExp(search_text,"igm");
        let matches = content.match(searchExp);
        let highlight_id = 10000 + i;
        if (matches) {
            $("div#"+i+"").html(content.replace(searchExp, function (match) {
                return "<span class='highlight' id= "+ highlight_id+" >" + match + "</span>"

            }));
        }
        else {
            $("div#"+i+"").html(content.replace("<span class='highlight' >",""));
            $("div#"+i+"").html(content.replace("</span>",""));
        }

        }

    }
    else {
        $(".highlight").removeClass("highlight");
    }
}

var myvideo = document.getElementById('video');

var our_request1 = new XMLHttpRequest();
our_request1.open('Get','get_top_words.php')
our_request1.onload = function () {
    var  obj = JSON.parse(our_request1.responseText);
    for(var i=0;i<obj.length;i++){
        let hot_word_id = i + 1500;
        a='<div class="top_three_word" id='+hot_word_id+' >';
        a+='</div>';
        $(".top_search_box").append(a);
        console.log(obj[i].WORD);
        document.getElementById(hot_word_id).textContent = (i+1) +". "+" "+ obj[i].WORD;
        let to_be_highlighted = obj[i].WORD

        let top_words_highlight = document.getElementById(hot_word_id);
        top_words_highlight.addEventListener("click", function (event) {
            event.preventDefault();
            search_highlight(to_be_highlighted);
        }, false)


    }
}
our_request1.send();

var our_request = new XMLHttpRequest();
our_request.open('Get','test_database.php')
our_request.onload = function () {

    //ajax to get subtitle json file from php
    var  obj = JSON.parse(our_request.responseText);
    window.lines = obj.length;
    for(var i=0;i<obj.length;i++){
        let id_time_tag = 1000 +i;
        // test[i]='hello'+i;
        a='<div class="subtitle_container1" >';
        a+='<div class="time_tag" id= '+ id_time_tag +'>';
        a+='</div>';
        a+='<div class="subtitle" id= '+ i +'>';
        // a+='document.write(str1)'
        // a+='<p> class="sub_for_search" id='+ i +'100>';
        // a+='</p>';
        a+='</div>';
        a+='</div>';
        $(".subtitle_container").append(a);

        let current_line = lines[i];
        // let index =current_line.indexOf(" ");
        let str1 = obj[i].time_tag;
        let str2 = obj[i].transcript;
        let second = Math.floor((str1-1000000)/1000);

        function get_time(second) {

            let time_tag = "";
            let minutes = 0;
            let hours = 0;
            if(second>60){
                minutes = Math.floor(second/60);
                second = second%60;
                if (minutes>60){
                    hours = Math.floor(minute/60)
                    minutes = minutes%60;
                }

            }

            if (hours>0){
                time_tag += hours + ":";
            }
            if (minutes>0){
                time_tag += minutes + ":";
                if(second<10){
                    time_tag += "0"
                }
            }
            if (second>0){
                if(minutes == 0 & hours ==0) {
                    time_tag = "0:" + second;
                }
                else time_tag += second;
            }
            if (second== 0){
                if (minutes == 0 & hours ==0 ) {
                    time_tag += "0:00";
                }
                else time_tag += "00";
            }
            return time_tag;

        }
        // write into the subtitle div
        document.getElementById(i).textContent = str2;
        document.getElementById(id_time_tag).textContent = get_time(second);


        // console.log(test[i])
        //Below shows how to jump to the occurrence of the script in the video
        var jumpToTime = document.getElementById(i);
        // console.log(test[i])
        jumpToTime.addEventListener("click", function (event) {
            event.preventDefault();
            myvideo.play();
            myvideo.pause();
            myvideo.currentTime = (str1-1000000)/1000;
            myvideo.play();
            // console.log(i)
        }, false);


        let search_result = document.getElementById(i);
        let result_this_search = 10000 + i;
        search_result.addEventListener("click", function (event) {
            event.preventDefault();
            let word_this_search = $("span#"+ result_this_search +"").text()
            console.log(word_this_search);
            $.ajax({
                url: "top_search.php",
                method: "POST",
                data: {
                    'result': word_this_search
                },
                success: function (res) {
                    console.log(res);
                },
            })


        }


        )


    }
};
our_request.send();





//
// document.getElementById("openFile").addEventListener('change',function () {
//     var  fr = new FileReader();
//     fr.onload = function () {
//         // document.getElementById("fileContents").textContent = this.result;
//         // console.log(this.result[2])
//         var lines = this.result.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
//         // var test = [];
//         window.lines = lines.length;
//
//         for(var i = 0; i < lines.length; i++) {
//             //specialized for time tag div
//             let id_time_tag = 1000 +i;
//              // test[i]='hello'+i;
//             a='<div class="subtitle_container1" >';
//             a+='<div class="time_tag" id= '+ id_time_tag +'>';
//             a+='</div>';
//             a+='<div class="subtitle" id= '+ i +'>';
//             // a+='document.write(str1)'
//             // a+='<p> class="sub_for_search" id='+ i +'100>';
//             // a+='</p>';
//             a+='</div>';
//             a+='</div>';
//             $(".subtitle_container").append(a);
//
//
//             // let str1 = lines[i].replace(/\D/g,"");
//             // let str2 = lines[i].replace(/[\d]*/,"");
//             let current_line = lines[i];
//             let index =current_line.indexOf(" ");
//             let str1 = current_line.substring(0,index);
//             let str2 = current_line.substring(index,current_line.length)
//             let second = Math.floor((str1-1000000)/1000);
//             // document.getElementById(i).textContent = str1 +"  "+str2;
//             // document.getElementById(i +100).textContent = "sss";
//             // console.log(lines[i].replace(/\D/g,"")) //print the timeStamp
//             // console.log(lines[i].replace(/[\d]*/,"")) //print the subtitle
//             function get_time(second) {
//
//                 let time_tag = "";
//                 let minutes = 0;
//                 let hours = 0;
//                 if(second>60){
//                     minutes = Math.floor(second/60);
//                     second = second%60;
//                     if (minutes>60){
//                         hours = Math.floor(minute/60)
//                         minutes = minutes%60;
//                     }
//
//                 }
//
//                 if (hours>0){
//                     time_tag += hours + ":";
//                 }
//                 if (minutes>0){
//                     time_tag += minutes + ":";
//                     if(second<10){
//                         time_tag += "0"
//                     }
//                 }
//                 if (second>0){
//                     if(minutes == 0 & hours ==0) {
//                         time_tag = "0:" + second;
//                     }
//                     else time_tag += second;
//                 }
//                 if (second== 0){
//                     if (minutes == 0 & hours ==0 ) {
//                         time_tag += "0:00";
//                     }
//                     else time_tag += "00";
//                 }
//                 return time_tag;
//
//             }
//             // write into the subtitle div
//             document.getElementById(i).textContent = str2;
//             document.getElementById(id_time_tag).textContent = get_time(second);
//
//
//             // console.log(test[i])
//
//             var jumpToTime = document.getElementById(i)
//             // console.log(test[i])
//             jumpToTime.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 myvideo.play();
//                 myvideo.pause();
//                 myvideo.currentTime = second;
//                 myvideo.play();
//                 console.log(i)
//             }, false);
//         }
//     }
//     fr.readAsText(this.files[0]);
//
// })
