(function($){
	initalizeProductSlider ();
	productSliderHandler();

	let $resizeTimeout;
	$(window).on('resize', function () {
		clearTimeout($resizeTimeout);
		$resizeTimeout = setTimeout(productSliderHandler, 200);
	});

	function initalizeProductSlider () {
		let $sectionProductSlider = $('.section-product-slider');
		let $productSlider = $sectionProductSlider.find('.section-product-slider__slider.slider-is-enabled');

		if (!$productSlider.hasClass('slick-initialized')) {
			$productSlider.slick({
				centerMode: true,
				adaptiveHeight: true,
				centerPadding: '100px',
				slidesToShow: 4,
				prevArrow: $sectionProductSlider.find('.section-product-slider__nav-prev'),
				nextArrow: $sectionProductSlider.find('.section-product-slider__nav-next'),

				responsive: [
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 1200,
						settings: {
							centerPadding: '60px',
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 992,
						settings: {
							centerPadding: '60px',
							slidesToShow: 2,
						}
					},
					{
						breakpoint: 768,
						settings: {
							centerPadding: '60px',
							slidesToShow: 1,
						}
					},
					{
						breakpoint: 480,
						settings: {
							centerPadding: '0px',
							slidesToShow: 1,
						}
					}
				]
			});
		}
	}

	function productSliderHandler () {
		let $sectionProductSlider = $('.section-product-slider');
		let $productSlider = $sectionProductSlider.find('.section-product-slider__slider.slider-is-enabled');
		let $screenWidth = $(window).width();
		let $slidesCount = $productSlider.find('.product:not(.slick-cloned)').length;

		if (
			($screenWidth > 1439 && $slidesCount < 5) ||
			($screenWidth > 991 && $slidesCount < 4) ||
			($screenWidth > 767 && $slidesCount < 3) ||
			($screenWidth > 0 && $slidesCount < 2)
		) {
			if ($productSlider.hasClass('slick-initialized')) {
				$productSlider.slick('unslick');
				$productSlider
					.parent()
					.parent()
					.addClass('container');
			}
		}
		
		else {
			initalizeProductSlider();

			$productSlider
				.parent()
				.parent()
				.removeClass('container');
		}
	}
})(jQuery);;