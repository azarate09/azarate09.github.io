/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/

window.onload = function () {
  Particles.init({
    selector: ".background"
  });
};
var typingElement = document.querySelector(".typing-text");
var typeArray = ["am a UC Berkeley Undergrad.", "study computer science and data science.","love building computers.", "am a video game fanatic." ];
var index = 0,
  isAdding = true,
  typeIndex = 0;

function playAnim() {
  setTimeout(
    function () {
      typingElement.innerText = typeArray[typeIndex].slice(0, index);
      
      if (isAdding) {
        if (index >= typeArray[typeIndex].length) {
          isAdding = false;
          // If text typed completely, wait 2s before starting to remove it.
          setTimeout(function () {
            playAnim();
          }, 2000);
          return;
        } else {
          // Continue to typing text by increasing index
          index++;
        }
      } else {
        // If removing
        if (index === 0) {
          isAdding = true;
          //If text removed completely, move on to next text by increasing typeIndex
          typeIndex++;
          if (typeIndex >= typeArray.length) {
            // Turn to beginning when reached to last text
            typeIndex = 0;
          }
        } else {
          // Continue to removing text by decreasing index
          index--;
        }
      }
      // Call the function always
      playAnim();
    },

    /* 
      If typing text, call it every 120ms
      If removing text, call it every 60ms
      Type slower, remove faster
    */
    isAdding ? 120 : 60
  );
}

// Start typing text
playAnim();

const particles = Particles.init({
  selector: ".background",
  color: ["#80bbff", "#66ccff", "#e6f1ff"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#80bbff", "#66ccff"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
    let offset =
      $(".nav").offset().top +
      $(".nav").height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").addClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").addClass("nav-container--top-second");
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-second");
      $(".nav-container-container").addClass("nav-container--top-first");
    } else {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").removeClass("nav-container--top-second");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }
}

new NavigationPage();
/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Sara Mazal Web;
Fonts - Google Fonts
*/
