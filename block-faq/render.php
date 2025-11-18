<?php
	$section_title = $attributes['sectionTitle'];
	$section_description = $attributes['sectionDescription'];
	$button_url = $attributes['buttonURL'];
	$button_text = $attributes['buttonText'];
	$faqs = $attributes['faqs'];
	$section_padding_top = 'padding-top--' . $attributes['sectionPaddingTop'];
	$section_padding_bottom = 'padding-bottom--' . $attributes['sectionPaddingBottom'];
	$section_classes = 'section-faq ' . $section_padding_top . ' ' . $section_padding_bottom;
?>

<section class= "<?= esc_attr($section_classes); ?>">
	<div class="container">
		<?php if ($section_title): ?>
			<div class="section-faq__header">
				<div>
					<h2 class="section-title__style-2">
						<?= esc_html($section_title); ?>
					</h2>

					<?php if ($section_description): ?>
						<p class="section-description">
							<?= esc_html($section_description); ?>
						</p>
					<?php endif; ?>
				</div>

				<?php if ($button_url && $button_text): ?>
					<div class="section-faq__header-button">
						<a
							href="<?= esc_url($button_url); ?>"
							class="button"
						>
							<?= esc_html($button_text); ?>
						</a>
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if ($faqs): ?>
			<div class="section-faq__body">
				<?php
					foreach ($faqs as $index => $faq):
						$question = $faq['question'];
						$answer = $faq['answer'];
						$open_class = $index === 0 ? 'open' : '';
				?>
					<div class="faq">
						<div class="faq__question">
							<h3 class="section-title__style-6 faq__question-title">
								<?= esc_html($question); ?>
							</h3>

							<div class="faq__question-icon <?= $open_class ?>">
								<?= get_template_part('template-parts/icons/icon-plus'); ?>
							</div>
						</div>

						<div class="faq__answer <?= $open_class ?>">
							<?= nl2br(esc_html($answer)); ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>