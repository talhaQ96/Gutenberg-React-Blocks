<?php
	$section_title = $attributes['sectionTitle'];
	$section_description = $attributes['sectionDescription'];
	$button_url = $attributes['buttonURL'];
	$button_text = $attributes['buttonText'];
	$is_slider_enable = $attributes['isSliderEnable'];
	$is_alt_bg_enable = $attributes['isAltBGEnable'];
	$section_padding_top = 'padding-top--' . $attributes['sectionPaddingTop'];
	$section_padding_bottom = 'padding-bottom--' . $attributes['sectionPaddingBottom'];
	$section_classes = 'section-testimonials ' . $section_padding_top . ' ' . $section_padding_bottom . ($is_alt_bg_enable ? ' has-alt-bg' : '');

	$testimonials = get_posts([
		'post_type'      => 'testimonial',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
	]);
?>

<section class="<?= esc_attr($section_classes); ?>">
	<?php if ($section_title): ?>
		<div class="container">
			<div class="section-testimonials__header">
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
					<div class="section-testimonials__header-button">
						<a
							href="<?= esc_url($button_url); ?>"
							class="button"
						>
							<?= esc_html($button_text); ?>
						</a>
					</div>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>

	<?php if ($testimonials): ?>
		<div class="<?= !$is_slider_enable ? "container" : "" ?>">
			<div class="section-testimonials__slider-wrapper">
				<div class="section-testimonials__slider <?= $is_slider_enable ? "slider-is-enabled" : "" ?>">
					<?php
						foreach ($testimonials as $testimonial):
							setup_postdata($testimonial);

							$testimonial_platform = strtolower(get_post_meta($testimonial->ID, 'testimonial_platform', true));
					?>
							<div class="testimonial">
								<div class="testimonial__header">
									<?php if ($testimonial_platform): ?>
										<div class="testimonial__platform">
											<?= get_template_part('template-parts/icons/icon-'. $testimonial_platform .'-color'); ?>
										</div>
									<?php endif; ?>

									<div class="testimonial__stars">
										<?php
											for ($i=0; $i<5; $i++):
												get_template_part('template-parts/icons/icon-star');
											endfor;
										?>
									</div>
								</div>

								<div class="testimonial__body">
									<div class="testimonial__badge">
										<?= get_template_part('template-parts/icons/icon-verified-badge'); ?>
										<div>Verified Purchase</div>
									</div>

									<?= wpautop(get_the_content()); ?>
								</div>

								<div class="testimonial__footer">
									<?= get_the_post_thumbnail($testimonial->ID, 'testimonial-thumbnail'); ?>
									
									<h3 class="section-title__style-6 testimonial__name"><?= esc_html(get_the_title($testimonial->ID)); ?></h5>
								</div>
							</div>
					<?php
						endforeach;
						wp_reset_postdata();
					?>
				</div>

				<?php if ($is_slider_enable): ?>
					<div class="section-testimonials__slider-nav">
						<div class="section-testimonials__slider-nav-prev">
							<?= get_template_part('template-parts/icons/icon-arrow'); ?>
						</div>

						<div class="section-testimonials__slider-nav-next">
							<?= get_template_part('template-parts/icons/icon-arrow'); ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>
</section>