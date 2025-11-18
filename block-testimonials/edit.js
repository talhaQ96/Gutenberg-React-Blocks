import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useEffect, useState } from "react";
import { PanelBody, TextControl, TextareaControl, Button, ToggleControl, SelectControl } from "@wordpress/components";
import apiFetch from '@wordpress/api-fetch';

import IconFacebookColor from '../../react-components/IconFacebookColor';
import IconInstagramColor from '../../react-components/IconInstagramColor';
import IconGoogleColor from '../../react-components/IconGoogleColor';
import IconWhatsAppColor from '../../react-components/IconWhatsappColor';
import IconStar from '../../react-components/IconStar';
import IconVerifiedBadge from '../../react-components/IconVerifiedBadge';
import IconArrow from '../../react-components/IconArrow';

export default function Edit({attributes, setAttributes}) {
	const {sectionTitle, sectionDescription, buttonURL, buttonText, isSliderEnable, isAltBGEnable, sectionPaddingTop, sectionPaddingBottom} = attributes;
	const [testimonials, setTestimonials] = useState([]);

	const sectionClasses = [
		'section-testimonials',
		`padding-top--${sectionPaddingTop}`,
		`padding-bottom--${sectionPaddingBottom}`,
		isAltBGEnable ? 'has-alt-bg' : '',
		isSliderEnable ? 'slider-is-enabled' : '',
	].join(' ');

	const iconComponents = {
		Facebook  : IconFacebookColor,
		Instagram : IconInstagramColor,
		Google    : IconGoogleColor,
		WhatsApp  : IconWhatsAppColor,
	};

	const formatPrice = (price, currency = 'Rs') => {
		return `${currency} ${parseFloat(price).toFixed(2)}`;
	};

	useEffect(() => {
		apiFetch({ path: '/wp/v2/testimonial?_embed' })
			.then((data) => {
				console.log('Fetched testimonials:', data);
				setTestimonials(data);
			})
			.catch((error) => console.error('Error fetching testimonials:', error));
	}, []);

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<div className="block-testimonials">
					<PanelBody title="Content" initialOpen={false}>
						<div className="block-testimonials__component">
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

						<div className="block-testimonials__component">
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
						<div className="block-testimonials__component">
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

						<div className="block-testimonials__component">
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
					sectionTitle &&
						<div className="container">
							<div className="section-testimonials__header">
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
										<div className="section-testimonials__header-button">
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
				}


				{
					testimonials.length > 0 && (
						<div className="container">
							<div className="section-testimonials__slider-wrapper">
								<div className="section-testimonials__slider">
									{
										testimonials.map((testimonial) => {
											let testimonialThumbnailURL = testimonial._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
											let testimonialPlatform = testimonial.testimonial_platform;
											let IconTestimonialPlatform = iconComponents[testimonialPlatform];

											return (
												<div className="testimonial">
													<div className="testimonial__header">
														<div className="testimonial__platform">
															{IconTestimonialPlatform && <IconTestimonialPlatform />}
														</div>

														<div className="testimonial__stars">
															{
																Array.from({length: 5}).map((_, index) => (
																	<IconStar />
																))
															}
														</div>
													</div>

													<div className="testimonial__body">
														<div className="testimonial__badge">
															<IconVerifiedBadge />
															<div>Verified Purchase</div>
														</div>

														<p>{testimonial.content.rendered.replace(/<\/?p>/g, '')}</p>
													</div>

													<div className="testimonial__footer">
														<img
															src={testimonialThumbnailURL}
															alt={testimonial.title.rendered}
															width="50"
															height="50"
														/>

														<h3 className="section-title__style-6 testimonial__name">{testimonial.title.rendered}</h3>
													</div>
												</div>
											)
										})
									}
								</div>

								{
									isSliderEnable && (
										<div class="section-testimonials__slider-nav">
											<div class="section-testimonials__slider-nav-prev">
												<IconArrow />
											</div>

											<div class="section-testimonials__slider-nav-next">
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