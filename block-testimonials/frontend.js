(function($){
	initalizeTestimonialSlider ();
	testimonialSliderHandler();

	let $resizeTimeout;
	$(window).on('resize', function () {
		clearTimeout($resizeTimeout);
		$resizeTimeout = setTimeout(testimonialSliderHandler, 200);
	});

	function initalizeTestimonialSlider () {
		let $sectionTestimonials = $('.section-testimonials');
		let $testimonialSlider = $sectionTestimonials.find('.section-testimonials__slider.slider-is-enabled');

		if (!$testimonialSlider.hasClass('slick-initialized')) {
			$testimonialSlider.slick({
				centerMode: true,
				adaptiveHeight: true,
				centerPadding: '100px',
				slidesToShow: 3,
				prevArrow: $sectionTestimonials.find('.section-testimonials__slider-nav-prev'),
				nextArrow: $sectionTestimonials.find('.section-testimonials__slider-nav-next'),

				responsive: [
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							centerPadding: '60px',
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 992,
						settings: {
							centerPadding: '60px',
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 576,
						settings: {
							centerPadding: '0px',
							slidesToShow: 1,
						}
					}
				]
			});
		}
	}

	function testimonialSliderHandler () {
		let $sectionTestimonials = $('.section-testimonials');
		let $testimonialSlider = $sectionTestimonials.find('.section-testimonials__slider.slider-is-enabled');
		let $screenWidth = $(window).width();
		let $slidesCount = $testimonialSlider.find('.testimonial:not(.slick-cloned)').length;

		if (
			($screenWidth > 1439 && $slidesCount < 5) ||
			($screenWidth > 991 && $slidesCount < 4) ||
			($screenWidth > 767 && $slidesCount < 3) ||
			($screenWidth > 0 && $slidesCount < 2)
		) {
			if ($testimonialSlider.hasClass('slick-initialized')) {
				$testimonialSlider.slick('unslick');
				$testimonialSlider
					.parent()
					.parent()
					.addClass('container');
			}
		}
		
		else {
			initalizeTestimonialSlider();

			$testimonialSlider
				.parent()
				.parent()
				.removeClass('container');
		}
	}
})(jQuery);;