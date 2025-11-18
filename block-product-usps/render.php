<?php
	$section_title = $attributes['sectionTitle'];
	$section_description = $attributes['sectionDescription'];
	$button_url = $attributes['buttonURL'];
	$button_text = $attributes['buttonText'];
	$image_url = $attributes['imageUrl'];
	$product_usps = $attributes['productUSPs'];
	$section_padding_top = 'padding-top--' . $attributes['sectionPaddingTop'];
	$section_padding_bottom = 'padding-bottom--' . $attributes['sectionPaddingBottom'];
	$section_classes = 'section-product-usps ' . $section_padding_top . ' ' . $section_padding_bottom;
?>

<section class= "<?= esc_attr($section_classes); ?>">
	<div class="container">
		<?php if ($section_title): ?>
			<div class="section-product-usps__header">
				<h2 class="section-title__style-2">
					<?= esc_html($section_title); ?>
				</h2>

				<?php if ($section_description): ?>
					<p>
						<?= esc_html($section_description); ?>
					</p>
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<div class="section-product-usps__grid">
			<div>
				<img src="<?= esc_url($image_url); ?>" alt="" />
			</div>

			<?php if(!empty($product_usps)): ?>
				<div class="product-usps">
					<?php
						foreach ($product_usps as $usp):
							$usp_text = $usp['uspText'];

							if ($usp_text):
					?>
								<div class="product-usps__wrapper">
									<?= get_template_part('template-parts/icons/icon-star'); ?>

									<h3 class="section-title__style-5 product-usps__text">
										<?= esc_html($usp_text); ?>
									</h3>
								</div>
					<?php
							endif;
						endforeach; 
					?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>