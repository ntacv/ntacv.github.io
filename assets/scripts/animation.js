var animated_object = document.querySelector(".zoom_animation");
animated_object.style.display = "block";

window.addEventListener("scroll", function () {
  var to_top = window.scrollY; //pageYOffset;
  //console.log(to_top);
  animate_fore(to_top);
  animate_mobile(to_top);
});

var start_from_0_element = document.querySelector("#start_from_0");
var start_from_0 = false;
var update_checked = document.querySelector(".update_checked");

function check() {
  console.log(start_from_0_element.checked);
  if (start_from_0_element.checked) {
    update_checked.innerHTML = "checked";
    start_from_0 = true;
  } else {
    update_checked.innerHTML = "not checked";
    start_from_0 = false;
  }
}

function promptf() {
  var promptx = prompt("text");
  console.log(promptx);
}

function zoomIn() {}
function animate_ratio(to_top, to_scale = 1, to_x = 0, to_y = 0) {
  let scale = 1;
  if (start_from_0) {
    scale = 0;
  }
  let ratio = 0.002 * to_scale; //0.002
  let ratio_left = to_x * 0.2; //200;
  let ratio_top = to_y * 0.2; //200;
  let left = 0; //200;
  let top = 0; //200;
  scale += ratio * to_top;
  left += ratio_left * to_top;
  top += ratio_top * to_top;
  var transform_txt =
    "scale(" +
    scale +
    ")" +
    "translateX(" +
    left +
    "px) translateY(" +
    top +
    "px)";
  //console.log(transform_txt);
  return transform_txt;
}

function animate_fore(to_top) {
  var object = document.querySelector(".zoom_animation");
  var formula_1 = document.querySelector(".formula_1");
  var formula_2 = document.querySelector(".formula_2");
  var formula_3 = document.querySelector(".formula_3");
  var formula_4 = document.querySelector(".formula_4");
  var formula_5 = document.querySelector(".formula_5");

  if (to_top > 1000) {
    object.style.display = "none";
    formula_1.style.display = "none";
    formula_2.style.display = "none";
    formula_3.style.display = "none";
    formula_4.style.display = "none";
    formula_5.style.display = "none";
  } else {
    object.style.display = "block";
    formula_1.style.display = "block";
    formula_2.style.display = "block";
    formula_3.style.display = "block";
    formula_4.style.display = "block";
    formula_5.style.display = "block";
  }

  object.style.transform = animate_ratio(to_top, 1, 0, 0);
  formula_1.style.transform = animate_ratio(to_top, 1, -5, -1);
  formula_2.style.transform = animate_ratio(to_top, 1, 4, -1);
  formula_3.style.transform = animate_ratio(to_top, 1, 5, 1);
  formula_4.style.transform = animate_ratio(to_top, 1, -2, 1);
  formula_5.style.transform = animate_ratio(to_top, 1, -4, 0);
}
function animate_mobile(to_top) {
  var object = document.querySelector(".anim_bloc");
  var left_object = document.querySelector(".left");
  let ratio = 0.9;
  let left = 0; //200;
  left += ratio * to_top;
  object.style.left = left + "px";
  left_object.style.right = left + "px";
}
