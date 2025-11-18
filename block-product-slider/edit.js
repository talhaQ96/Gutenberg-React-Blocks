import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useEffect, useState } from "react";
import { PanelBody, TextControl, TextareaControl, Button, ToggleControl, SelectControl } from "@wordpress/components";
import apiFetch from '@wordpress/api-fetch';

import IconArrow from '../../react-components/IconArrow';

export default function Edit({attributes, setAttributes}) {
	const {sectionTitle, sectionDescription, buttonURL, buttonText, isSliderEnable, isAltBGEnable, sectionPaddingTop, sectionPaddingBottom} = attributes;
	const [products, setProducts] = useState([]);

	const sectionClasses = [
		'section-product-slider',
		`padding-top--${sectionPaddingTop}`,
		`padding-bottom--${sectionPaddingBottom}`,
		isAltBGEnable ? 'has-alt-bg' : '',
		isSliderEnable ? 'slider-is-enabled' : '',
	].join(' ');

	const formatPrice = (price, currency = 'Rs') => {
		return `${currency} ${parseFloat(price).toFixed(2)}`;
	};

	useEffect(() => {
		apiFetch({ path: '/wc/v3/products' })
			.then((data) => setProducts(data))
			.catch((error) => console.error('Error fetching products:', error));
		}, []);

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<div className="block-product-slider">
					<PanelBody title="Content" initialOpen={false}>
						<div className="block-product-slider__component">
							<TextControl
								label="Section Title"
								value={sectionTitle}
								onChange={(value) => setAttributes({sectionTitle: value})}
							/>

							<TextareaControl
								label="Section Description"
								value={sectionDescription}
								onChange={(value) => setAttributes({sectionDescription: value})}
							/>
						</div>

						<div className="block-product-slider__component">
							<label>Button</label>

							<TextControl
								placeholder="Enter URL"
								value={buttonURL}
								onChange={(value) => setAttributes({buttonURL: value})}
							/>

							<TextControl
								placeholder="Enter link text"
								value={buttonText}
								onChange={(value) => setAttributes({buttonText: value})}
							/>
						</div>
					</PanelBody>

					<PanelBody title="Appearance" initialOpen={false}>
						<div className="block-product-slider__component">
							<ToggleControl
								label="Enable Slider"
								checked={isSliderEnable}
								onChange={(value) => setAttributes({isSliderEnable: value})}
							/>

							<ToggleControl
								label="Enable Alternate Background"
								checked={isAltBGEnable}
								onChange={(value) => setAttributes({isAltBGEnable: value})}
							/>
						</div>

						<div className="block-product-slider__component">
							<SelectControl
								label={"Padding Top"}
								value={sectionPaddingTop}
								options={[
									{label: 'None', value: 'none'},
									{label: 'Large', value: 'large'},
									{label: 'Medium', value: 'medium'},
									{label: 'Small', value: 'small'},
								]}
								onChange={(value) => setAttributes({sectionPaddingTop: value})}
							/>

							<SelectControl
								label={"Padding Bottom"}
								value={sectionPaddingBottom}
								options={[
									{label: 'None', value: 'none'},
									{label: 'Large', value: 'large'},
									{label: 'Medium', value: 'medium'},
									{label: 'Small', value: 'small'},
								]}
								onChange={(value) => setAttributes({sectionPaddingBottom: value})}
							/>
						</div>
					</PanelBody>
				</div>
			</InspectorControls>

			<section className={sectionClasses}>
				{
					sectionTitle && (
						<div className="container">
							<div className="section-product-slider__header">
								<div>
									<h2 className="section-title__style-2">{sectionTitle}</h2>

									{
										sectionDescription && (
											<p className="section-description">{sectionDescription}</p>
										)
									}
								</div>

								{
									buttonURL && buttonText && (
										<div className="section-product-slider__header-button">
											<a
												href={buttonURL}
												className="button"
											>
												{buttonText}
											</a>
										</div>
									)
								}
							</div>
						</div>
					)
				}

				{
					products.length > 0 && (
						<div className="container">
							<div className="section-product-slider__slider-wrapper">
								<ul className="section-product-slider__slider unstyled-list">
									{
										products.map((product) => (
											<li className="product">
												{
													product.on_sale && (
														<span class="product__sale-badge">Sale</span>
													)
												}

												{
													product.images && product.images.length > 0 && (
														<img
															src={product.images[0].src}
															alt={product.images[0].alt || product.name}
														/>
													)
												}

												<div className="product__description">
													<h3 className="section-title__style-6">{product.name}</h3>

													<div className="product__price">
														{
															product.on_sale ? (
																<>
																	<del className="product__price-regular">{formatPrice(product.regular_price)}</del>
																	<ins className="product__price-sale">{formatPrice(product.sale_price)}</ins>
																</>
															) : 

															(formatPrice(product.price))
														}
													</div>

													<a className="product__cart-button woo-button">Add to Cart</a>
												</div>
											</li>
										))
									}
								</ul>

								{
									isSliderEnable && (
										<div className="section-product-slider__nav">
											<div className="section-product-slider__nav-prev">
												<IconArrow />
											</div>
											<div className="section-product-slider__nav-next">
												<IconArrow />
											</div>
										</div>
									)
								}
							</div>
						</div>
					)
				}
			</section>
		</div>
	);
}