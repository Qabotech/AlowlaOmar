    $(window).on("load", function () {
        $(".loading").remove();
    });

$(".flex .text").append("<div class='overlay'></div>");
$(".viewport a").attr("target", "_blank");
function buttonSize() {
var width = $("#name").innerWidth();
var height = $("#name").innerHeight();
$('#send').innerWidth(width)
$('#send').innerHeight(height)
}
buttonSize();
$( window ).resize(function() {
    buttonSize();
});

const viewport = document.querySelector(".viewport"),
firstbox = viewport.querySelectorAll(".box")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
var boxes = document.querySelectorAll(".box")

let isStartDrag = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const Icons= () => {
    let scrollWidth = viewport.scrollWidth - viewport.clientWidth;
    arrowIcons[0].style.display = viewport.scrollLeft <= 10 ? "none" : "block";
    arrowIcons[1].style.display = viewport.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstboxWidth = firstbox.clientWidth + 14;
        viewport.scrollLeft += icon.id == "left" ? -firstboxWidth : firstboxWidth;
    });
});

const Slide = () => {
    if(viewport.scrollLeft - (viewport.scrollWidth - viewport.clientWidth) > -1 || viewport.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); 
    let firstboxWidth = firstbox.clientWidth + 14;
    let valDifference = firstboxWidth - positionDiff;

    if(viewport.scrollLeft > prevScrollLeft) {
        return viewport.scrollLeft += positionDiff > firstboxWidth / 3 ? valDifference : -positionDiff;
    }
    viewport.scrollLeft -= positionDiff > firstboxWidth / 3 ? valDifference : -positionDiff;
}

function updateCenterBox() {
    const viewportWidth = viewport.offsetWidth;
    const viewportCenter = viewportWidth / 2;
  
    let closestBox = null;
    let closestDistance = Infinity;
  
    for (const box of boxes) {
      const boxRect = box.getBoundingClientRect();
      const boxLeft = boxRect.left + viewport.scrollLeft - viewport.getBoundingClientRect().left + parseFloat(getComputedStyle(box).paddingLeft) + parseFloat(getComputedStyle(box).marginLeft);
      const boxWidth = boxRect.width;
      const boxCenter = boxLeft + (boxWidth / 2);
  
      const distanceToCenter = Math.abs(viewportCenter - boxCenter);
  
      if (distanceToCenter < closestDistance) {
        closestBox = box;
        closestDistance = distanceToCenter;
      }
    }
}

function getCenteredBox() {
    const { x, width } = viewport.getBoundingClientRect();
    const center = x + width / 2;
    let closest = null;
    let minDistance = Infinity;
    boxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      const distance = Math.abs(center - (boxRect.x + boxRect.width / 2));
  
      if (distance < minDistance) {
        closest = box;
        minDistance = distance;
      }
    });
  
    return closest;
  }

  function highlightCenteredBox() {
    const centeredBox = getCenteredBox();
    boxes.forEach((box) => {

        if (box === centeredBox) 
        {
            $(box).addClass("centered");
            $(box).next().addClass("next");
            $(box).prev().addClass("prev");
            $(box).addClass("blur");
            $(box).next().addClass("blur");
            $(box).prev().addClass("blur");
            setTimeout(() => {
                $(box).removeClass("blur");
                $(box).next().removeClass("blur");
                $(box).prev().removeClass("blur");
            }, 100);
        } 
        else
        {
            $(box).removeClass("centered");
            $(box).next().removeClass("next");
            $(box).prev().removeClass("prev");
        }
    });
   
  }

  viewport.addEventListener("scroll", highlightCenteredBox);

const StartDrag = (e) => {
    isStartDrag = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = viewport.scrollLeft;
}


const dragging = (e) => {
    if(!isStartDrag) return;
    e.preventDefault();
    isDragging = true;
    
    viewport.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    viewport.scrollLeft = prevScrollLeft - positionDiff;
}
const dragStop = () => {
    isStartDrag = false;
    viewport.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    Slide();
}  



viewport.addEventListener("mousedown", StartDrag);
viewport.addEventListener("touchstart", StartDrag);

document.addEventListener("mousemove", dragging);
viewport.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
viewport.addEventListener("touchend", dragStop);

$(".fa-angle-right").trigger("click");
  
  
