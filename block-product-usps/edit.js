import {useBlockProps, MediaUpload, InspectorControls} from "@wordpress/block-editor";
import {PanelBody, TextControl, TextareaControl, Button, IconButton, SelectControl} from "@wordpress/components";

import IconStar from '../../react-components/IconStar';

export default function Edit({attributes, setAttributes}) {
	const {sectionTitle, sectionDescription, buttonURL, buttonText, imageUrl, productUSPs, sectionPaddingTop, sectionPaddingBottom} = attributes;

	const sectionClasses = [
		'section-product-usps',
		`padding-top--${sectionPaddingTop}`,
		`padding-bottom--${sectionPaddingBottom}`,
	].join(' ');

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<div className="block-product-usps">
					<PanelBody title="Content" initialOpen={false}>
						<div className="block-product-usps__component">
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


						<div className="block-product-usps__component">
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

						<div className="block-product-usps__component">
							<label>Select Product Image</label>

							{imageUrl && <img src={imageUrl} alt="" />}

							<MediaUpload
								onSelect={(media) => setAttributes({imageUrl: media.url})}
								allowedTypes={["image"]}
								value={imageUrl}
								render={({open}) => (
									<div className="block-product-usps__component-media">
										<Button
											onClick={open}
											variant={imageUrl ? "secondary" : "primary"}
										>
											{imageUrl ? "Replace Image" : "Add Image"}
										</Button>

										{imageUrl &&
											<Button
												onClick={() => setAttributes({imageUrl: ''})}
												variant="link"
												isDestructive
											>
												Remove Image
											</Button>
										}
									</div>
								)}
							/>
						</div>
					</PanelBody>

					<PanelBody title="Product USPs" initialOpen={false}>
						<div className="block-product-usps__component">
							<label>Add Product USP</label>

							<div className="block-product-usps__buttons-wrapper">
								{productUSPs.map((usp, index) => (
									<div key={index} className="block-product-usps__button">
										<IconButton
											icon="dismiss"
											className="block-product-usps__button-del-icon"
											onClick={() => {
												const updatedUSPs = productUSPs.filter((_, i) => i !== index);
												setAttributes({productUSPs: updatedUSPs});
											}}
										/>

										<TextControl
											value={usp.uspText}
											placeholder="Enter USP"
											onChange={(value) => {
												const updatedUSPs = [...productUSPs];
												updatedUSPs[index].uspText = value;
												setAttributes({productUSPs: updatedUSPs});
											}}
										/>
									</div>
								))}
							</div>

							<Button
								isPrimary
								onClick={() => setAttributes({ productUSPs: [...productUSPs, {uspText: "" }] })}
							>
								Add USP
							</Button>
						</div>
					</PanelBody>

					<PanelBody title="Appearance" initialOpen={false}>
						<div className="block-product-usps__component">
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
				<div className="container">
					{
						sectionTitle && (
							<div className="section-product-usps__header">
								<h1 className="section-title__style-2">{sectionTitle}</h1>

								{
									sectionDescription && (
										<p>{sectionDescription}</p>
									)
								}
							</div>
						)
					}

					<div className="section-product-usps__grid">
						<div>
							<img src={imageUrl} alt="" />
						</div>

						{
							productUSPs && productUSPs.length > 0 && (
								<div className="product-usps">
									{
										productUSPs.map((usp, index) => (
											usp.uspText && (
												<div className="product-usps__wrapper">
													<IconStar />
													<h3 className="section-title__style-5 product-usps__text">{usp.uspText}</h3>
												</div>
											)
										))
									}
								</div>
							)
						}
					</div>
				</div>
			</section>
		</div>
	);
}