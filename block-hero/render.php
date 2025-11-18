<?php
	$section_title = $attributes['sectionTitle'];
	$section_description = $attributes['sectionDescription'];
	$buttons = $attributes['buttons'];
	$image_url = $attributes['imageUrl'];
?>

<section class="section-hero">
	<div class="section-hero__container">
		<div class="section-hero__text-wrapper">
			<h1 class="section-title section-title__style-1">
				<?= esc_html($section_title); ?>
			</h1>

			<?php if ($section_description): ?>
				<p class="section-hero__description">
					<?= esc_html($section_description); ?>
				</p>
			<?php endif; ?>

			<?php if(!empty($buttons)): ?>
				<div class="section-hero__buttons-wrapper">
					<?php
						foreach ($buttons as $button):
							$url = $button['url'];
							$text = $button['linkText'];
					?>
							<a
								href="<?= esc_url($url); ?>"
								class="button"
							>
								<?= esc_html($text); ?>
							</a>
					<?php endforeach;?>
				</div>
			<?php endif; ?>
		</div>

		<div class="section-hero__img-wrapper">
			<img src="<?= esc_url($image_url); ?>" alt="" />
		</div>
	</div>
</section>