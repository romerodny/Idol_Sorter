idol_scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];

$(document).ready(function(){
  console.log("here");
    $(".idol").on("click", function(){
        var self = this,
            idol1, idol2 , common;

        img_selected = self.src;

        $("#idol1").each(function(){
            file = $(self).attr("src");
        });
        common = file.substring(0, file.length-5);
        var id1 = Math.floor((Math.random() * 9) + 1);
        var id2 = Math.floor((Math.random() * 9) + 1);

        while(id1 == id2) {
          id2 = Math.floor((Math.random() * 9) + 1);
        }

        console.log(id1);
        console.log(id2);

        idol1 = common + id1 + ".png";
        idol2 = common + id2 + ".png";

        document.getElementById("idol1").onclick = function() {
          alert("clicked");
          if(idol_scores[id1 - 1] == 0) {
            idol_scores[id1 - 1] = 1;
          }

          else {
            idol_scores[id1 - 1] = idol_scores[id1 - 1] + idol_scores[id2 - 1];
          }
        };

        document.getElementById("idol2").onclick = function() {
          if(idol_scores[id2 - 1] == 0) {
            idol_scores[id2 - 1] = 1;
          } else {
            idol_scores[id2] = idol_scores[id1] + idol_scores[id2];
          }
        };

        console.log(idol_scores[id1]);
        console.log(idol_scores[id2]);

        $("#idol1").each(function(){
            $("#idol1").fadeOut(100, function () {
                $(this).attr("src", idol1).fadeIn(100);
                idol1 = document.getElementById("idol1");
            });
        });



        $("#idol2").each(function(){
            $("#idol2").fadeOut(100, function () {
                $(this).attr("src", idol2).fadeIn(100);
                idol2 = document.getElementById("idol2");
            });
        });
    });
});
