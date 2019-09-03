$(document).ready(function() {
  $('.js-to-anchor').on('click', function() {
    $('html, body').animate({scrollTop: $('#trigger2').offset().top}, 'slow');
    return false;
  });

  // slider

  let reviewSlider = $('.js-slider-review');
  let paramReviewSlider = {
    slidesToShow  : 1,
    slidesToScroll: 1,
    arrows        : true,
    infinite      : true,
    dots          : true,
    fade          : true,
    cssEase       : 'ease',
    speed         : 450,
    responsive    : [
      {
        breakpoint: 1025,
        settings  : {
          arrows        : false,
          adaptiveHeight: true
        }
      }
    ]
  };

  $(reviewSlider).slick(paramReviewSlider);

  // custom-scroll

  $('.js-custom-scroll').mCustomScrollbar({
    mouseWheel       : { preventDefault: true },
    scrollbarPosition: 'inside',
    theme            : 'custom-scrollbar'
  });

  // header

  let header = document.querySelector('body');
  let numberFixedScroll = -80
  let footerScroll = $('.b-footer__scroll')

  if ($(window).innerWidth() < 641) {
    return false
  }
  $(window).on('scroll', function() {
    let rect = header.getBoundingClientRect().top;
    if (rect > numberFixedScroll) {
      footerScroll.removeClass('active')
      return
    }
    footerScroll.addClass('active')
  });

  // scrollAnimation

  let controller = new ScrollMagic.Controller();

  // #1
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-left-lg-blue', 'active1')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger2'})
    .setClassToggle('.js-left-lg-blue', 'active2')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger3'})
    .setClassToggle('.js-left-lg-blue', 'active3')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger4'})
    .setClassToggle('.js-left-lg-blue', 'active4')
    .addTo(controller);

  // #2
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-center-lg-red', 'active1')
    .addTo(controller);

  // #3
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-right-md-red', 'active1')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger2'})
    .setClassToggle('.js-right-md-red', 'active2')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger3'})
    .setClassToggle('.js-right-md-red', 'active3')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger4'})
    .setClassToggle('.js-right-md-red', 'active4')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger5'})
    .setClassToggle('.js-right-md-red', 'active5')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger6'})
    .setClassToggle('.js-right-md-red', 'active6')
    .addTo(controller);

  // #4
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-center-md-blue', 'active1')
    .addTo(controller);

  // #5
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-right-md-blue', 'active1')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger2'})
    .setClassToggle('.js-right-md-blue', 'active2')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger3'})
    .setClassToggle('.js-right-md-blue', 'active3')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger4'})
    .setClassToggle('.js-right-md-blue', 'active4')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger5'})
    .setClassToggle('.js-right-md-blue', 'active5')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger6'})
    .setClassToggle('.js-right-md-blue', 'active6')
    .addTo(controller);
  new ScrollMagic.Scene({triggerElement: '#trigger1'})
    .setClassToggle('.js-center-md-red', 'active1')
    .addTo(controller);
});

var BrowserDetect = {
  init: function() {
    this.OS = this.searchString(this.dataOS) || 'an unknown OS';
  },
  searchString: function(data) {
    for (var i=0; i<data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1) {
          return data[i].identity;
        }
      } else if (dataProp) {
        return data[i].identity;
      }
    }
  },
  dataBrowser: [
    {
      string   : navigator.userAgent,
      subString: 'Edge',
      identity : 'Edge'
    },
    {
      string   : navigator.userAgent,
      subString: 'Chrome',
      identity : 'Chrome'
    },
    { string       : navigator.userAgent,
      subString    : 'OmniWeb',
      versionSearch: 'OmniWeb/',
      identity     : 'OmniWeb'
    },
    {
      string       : navigator.vendor,
      subString    : 'Apple',
      identity     : 'Safari',
      versionSearch: 'Version'
    },
    {
      prop         : window.opera,
      identity     : 'Opera',
      versionSearch: 'Version'
    },
    {
      string   : navigator.vendor,
      subString: 'iCab',
      identity : 'iCab'
    },
    {
      string   : navigator.vendor,
      subString: 'KDE',
      identity : 'Konqueror'
    },
    {
      string   : navigator.userAgent,
      subString: 'Firefox',
      identity : 'Firefox'
    },
    {
      string   : navigator.vendor,
      subString: 'Camino',
      identity : 'Camino'
    },
    {
      /* For Newer Netscapes (6+) */
      string   : navigator.userAgent,
      subString: 'Netscape',
      identity : 'Netscape'
    },
    {
      string       : navigator.userAgent,
      subString    : 'MSIE',
      identity     : 'Internet Explorer',
      versionSearch: 'MSIE'
    },
    {
      string       : navigator.userAgent,
      subString    : 'Gecko',
      identity     : 'Mozilla',
      versionSearch: 'rv'
    },
    {
      /* For Older Netscapes (4-) */
      string       : navigator.userAgent,
      subString    : 'Mozilla',
      identity     : 'Netscape',
      versionSearch: 'Mozilla'
    }
  ],
  dataOS: [
    {
      string   : navigator.platform,
      subString: 'Win',
      identity : 'Windows'
    },
    {
      string   : navigator.platform,
      subString: 'Mac',
      identity : 'Mac'
    },
    {
      string   : navigator.userAgent,
      subString: 'iPhone',
      identity : 'iPhone/iPod'
    },
    {
      string   : navigator.platform,
      subString: 'Linux',
      identity : 'Linux'
    }
  ]

};
BrowserDetect.init();
if (BrowserDetect.OS === 'Windows') {
  $('.lines').addClass('fix-width')
}
