"use strict";

/**
 * @author David Romero
 * 
 * This Javascript file serves as the logic base for the Idol Sorter application. At this moment, the scoring system accounts for Love Live! Sunshine!! idols only. 
 * Support for additional idols coming at a later date. The methods contained here are responsible for scoring and changing the idol displayed on screen.
 * 
 * TODO: Implement "Tie" and "Undo" features.
 * 
 * /*_/| 
   =0-0=
   \'I'|
   |<|,,\_
   |[>,,/,\ 
   |[|,\_,,)
   ((J(=_*/

function IdolSorter() {
  var self = this;
  self.idol1 = ""; 
  self.idol2 = "";
  self.rounds = 0;
  self.currentRound = 1;
  self.img_selected = "";
  self.idol_scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  /**
   * @author David Romero
   * 
   * This function contains the logic to add points to the idol selected. This method is used only by 
   * the JQuery that shuffles the idol images. 
   * 
   * @param idol_that_won The file name of the idol selected (that won)
   */
  function AddToIdolScore(idol_that_won, idol_that_lost) {

    if(self.idol_scores[idol_that_lost - 1] == 0) {
      self.idol_scores[idol_that_won - 1]++;
    }
    else {
      self.idol_scores[idol_that_won - 1] += self.idol_scores[idol_that_lost - 1];
    }

    if(self.currentRound == self.rounds) {
      $(".idol").off('click');

      for(var i = 0; i < self.idol_scores.length; i++) {
        var currentIdolsName = "";

        switch (i) {
          case 0:
            currentIdolsName = "Riko Sakurauchi";
            break;
          case 1:
            currentIdolsName = "Dia Kurosawa";
            break;
          case 2:
            currentIdolsName = "You Watanabe";
            break;
          case 3:
            currentIdolsName = "Yoshiko Tsushima";
            break;
          case 4:
            currentIdolsName = "Hanamaru Kunikida";
            break;
          case 5:
            currentIdolsName = "Mari Ohara";
            break;
          case 6:
            currentIdolsName = "Ruby Kurosawa";
            break;
          case 7:
            currentIdolsName = "Chika Takami";
            break;
          case 8:
            currentIdolsName = "Kanan Matsuura";
            break;
        }

        document.getElementById("scores").innerHTML = document.getElementById("scores").innerHTML + " " +  
        currentIdolsName + " " + self.idol_scores[i] + "\n";
      }
    }
    else {

      self.currentRound++;

      document.getElementById("currentRound").innerHTML = "Round " + self.currentRound; 
    }
  }

  /**
   * @author David Romero
   * 
   * When an idol is selected, it will kick off this JQuery function. This function will first call
   * the AddToIdolScore function 
  */
  $(".idol").on("click", function(){
    self.img_selected = this.src;

    console.log(self.currentRound);

    var common = "../image/img";
    var id1 = Math.floor((Math.random() * 9) + 1);
    var id2 = Math.floor((Math.random() * 9) + 1);

    while(id1 == id2) {
      id2 = Math.floor((Math.random() * 9) + 1);
    }

    self.idol1 = common + id1 + ".png";
    self.idol2 = common + id2 + ".png";

    $("#idol1").each(function(){
        $("#idol1").fadeOut(100, function () {
            $(this).attr("src", self.idol1).fadeIn(100);
        });
    });

    $("#idol2").each(function(){
        $("#idol2").fadeOut(100, function () {
            $(this).attr("src", self.idol2).fadeIn(100);
        });
    }); 
  });

  $("#idol1").on("click", function() {
    var idolThatLostID = document.getElementById("idol2").src.substring(self.img_selected.length-5, self.img_selected.length-4);
    AddToIdolScore(self.img_selected.substring(self.img_selected.length-5, self.img_selected.length-4), idolThatLostID);
  });
  
  $("#idol2").on("click", function() {
    var idolThatLostID = document.getElementById("idol1").src.substring(self.img_selected.length-5, self.img_selected.length-4);
    AddToIdolScore(self.img_selected.substring(self.img_selected.length-5, self.img_selected.length-4), idolThatLostID);
  });

}

$(document).ready(function(){
  var idolSorter = new IdolSorter();
  idolSorter.rounds = 27;
});
