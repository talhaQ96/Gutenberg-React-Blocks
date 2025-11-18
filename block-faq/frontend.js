(function($){
	let $sectionFaq = $('.section-faq');
	let $faqs = $sectionFaq.find('.faq');
	let $faqIcons = $sectionFaq.find('.faq__question-icon');
	let $faqAnswers = $sectionFaq.find('.faq__answer');

	$faqs.each(function () {
		let $thisFaq = $(this);
		let $question = $thisFaq.find('.faq__question');

		$question.click(function () {
			let $thisQuestion = $(this);
			let $icon = $thisQuestion.children('.faq__question-icon');
			let $answer = $thisQuestion.siblings('.faq__answer');

			$faqIcons.not($icon).removeClass('open');
			$icon.toggleClass('open');
			$faqAnswers.not($answer).slideUp();
			$answer.slideToggle();
		});
	});
})(jQuery);