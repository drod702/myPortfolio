$(document).ready(function(){

  // MODAL
  var modalText = {
    kaht: {
      title: 'KAHT Beauty LV',
      tag: 'WEB DESIGN',
      detail: 'KAHT Beauty LV is certified and have significant experience, which ensures high-quality performance with their services. A website written in HTML, CSS(SaaS) and Javascript.',
      link: 'http://www.kahtbeautylv.com'
    },
    dragon: {
      title: 'Surfing Dragon',
      tag: 'T-SHIRT DESIGN',
      detail: 'Surfing Dragon is a graphic design made for a client using Adobe Photoshop and Illustrator. Setup a 4 color process design for screen printer.',
    },
    porsche: {
      title: 'Porsche',
      tag: '3D ANIMATION.',
      detail: 'Simple 3D animation of one of my favorite cars. Made as I learned an open source application named Blender',
      link: 'https://youtu.be/aDpj3sSYuMA'
    },
    breakout: {
      title: 'Breakout',
      tag: 'MOTION GRAPHICS.',
      detail: 'A motion graphic animation of a countdown for personal excercise to learn and gain knowledge of using 3D layers in Adobe After Effects.',
      link: 'https://youtu.be/0Ro5hNBTAok'
    },
    circle: {
      title: 'Circle',
      tag: 'MOTION GRAPHICS',
      detail: 'A motion graphic animation of a countdown for personal excercise to learn and gain knowledge of using 3D layers in Adobe After Effects.',
      link: 'https://youtu.be/RXe0biVsAJs'
    },
    portfolio: {
      title: 'My Portfolio',
      tag: 'WEB DESIGN',
      detail: 'A portfolio website to showcase my recent and previous work. This also showcase my knowledge and my expertise in various media.',
      link: 'https://www.drod702.com'
    },
    rave: {
      title: 'Rave Techno Head',
      tag: 'FLYER DESIGN',
      detail: 'Flyer design created circa 2000 for a rave party.'
    },

    locate: {
      title: 'Locate This',
      tag: 'WEB DIRECTORY',
      detail: 'A Yelp-like web application that uses React to create a dynamic real world webapp. The application has a component for the app, businesses, the business list, and the search bar. The app send an asynchronous AJAX GET request to the Yelp API for different business based on name and location, which will be sorted by best match.',
      link: 'https://locatethis.netlify.app'
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
