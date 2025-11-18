<?php
	$section_title = $attributes['sectionTitle'];
	$section_description = $attributes['sectionDescription'];
	$button_url = $attributes['buttonURL'];
	$button_text = $attributes['buttonText'];
	$is_slider_enable = $attributes['isSliderEnable'];
	$is_alt_bg_enable = $attributes['isAltBGEnable'];
	$section_padding_top = 'padding-top--' . $attributes['sectionPaddingTop'];
	$section_padding_bottom = 'padding-bottom--' . $attributes['sectionPaddingBottom'];
	$section_classes = 'section-product-slider ' . $section_padding_top . ' ' . $section_padding_bottom . ($is_alt_bg_enable ? ' has-alt-bg' : '');

	$args = array(
		'limit' => -1,
		'status' => 'publish',
		'return' => 'objects'
	);

	$query = new WC_Product_Query($args);
	$products = $query->get_products();
?>

<section class= "<?= esc_attr($section_classes); ?>" >
	<?php if ($section_title): ?>
		<div class="container">
			<div class="section-product-slider__header">
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
					<div class="section-product-slider__header-button">
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

	<?php if ($products): ?>
		<div class="<?= !$is_slider_enable ? "container" : "" ?>">
			<div class="section-product-slider__slider-wrapper">
				<ul class="section-product-slider__slider unstyled-list <?= $is_slider_enable ? "slider-is-enabled" : "" ?>">
					<?php foreach ($products as $product): ?>
						<li class="product">
							<?php if ($product->is_on_sale()): ?>
								<span class="product__sale-badge">
									Sale
								</span>
							<?php endif; ?>

							<a
								href="<?= esc_url($product->get_permalink()); ?>"
								class="product__image"
							>
								<?= $product->get_image(); ?>
							</a>

							<div class="product__description">
								<h3 class="section-title__style-6">
									<a href="<?= esc_url($product->get_permalink()); ?>">
										<?= esc_html($product->get_name()); ?>
									</a>
								</h3>

								<div class="product__price">
									<?php if ($product->is_on_sale()): ?>
										<del class="product__price-regular"><?= wc_price($product->get_regular_price()); ?></del>
										<ins class="product__price-sale"><?= wc_price($product->get_sale_price()); ?></ins>

									<?php
										else:
											echo wc_price($product->get_price());
										endif;
									?>
								</div>

								<?php
									if ($product->is_purchasable() && $product->is_in_stock()):
										$product_id = $product->get_id();
								?>
										<form
											class="product__cart cart"
											method="post"
											enctype='multipart/form-data'
										>
											<input
												type="hidden"
												name="add-to-cart"
												value="<?= esc_attr($product_id); ?>"
											/>

											<button 
												type="submit"
												name="add-to-cart-button" 
												data-product_id="<?= esc_attr($product_id); ?>" 
												class="product__cart-button woo-button ajax_add_to_cart add_to_cart_button"
											>

												<?= esc_html($product->add_to_cart_text()); ?>
											</button>
									</form>
								<?php endif; ?>
							</div>
						</li>
					<?php endforeach; ?>
				</ul>

				<?php if ($is_slider_enable): ?>
					<div class="section-product-slider__nav">
						<div class="section-product-slider__nav-prev">
							<?= get_template_part('template-parts/icons/icon-arrow'); ?>
						</div>
						<div class="section-product-slider__nav-next">
							<?= get_template_part('template-parts/icons/icon-arrow'); ?>
						</div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>
</section>