import {useBlockProps, MediaUpload, InspectorControls} from "@wordpress/block-editor";
import {PanelBody, SelectControl, TextControl, TextareaControl, Button, IconButton} from "@wordpress/components";

export default function Edit({attributes, setAttributes}) {
	const {sectionStyle, sectionTitle, sectionDescription, buttons, imageUrl} = attributes;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<div className="block-hero">
					<PanelBody title="Block Settings" initialOpen={false}>
						<div className="block-hero__component">
							<SelectControl
								label={"Section Style"}
								value={sectionStyle}
								options={[
									{label: 'Split Layout', value: 'split-layout'},
									{label: 'Overlay Layout', value: 'overlay-layout'}
								]}
								onChange={(value) => setAttributes({sectionStyle: value})}
							/>
						</div>

						<div className="block-hero__component">
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

						<div className="block-hero__component">
							<label>Buttons</label>

							<div className="block-hero__buttons-wrapper">
								{buttons.map((button, index) => (
									<div key={index} className="block-hero__button">
										<IconButton
											icon="dismiss"
											className="block-hero__button-del-icon"
											onClick={() => {
												const newButtons = buttons.filter((_, i) => i !== index);
												setAttributes({buttons: newButtons});
											}}
										/>

										<TextControl
											value={button.url}
											placeholder="Enter URL"
											onChange={(value) => {
												const newButtons = [...buttons];
												newButtons[index].url = value;
												setAttributes({buttons: newButtons});
											}}
										/>

										<TextControl
											value={button.linkText}
											placeholder="Enter link text"
											onChange={(value) => {
												const newButtons = [...buttons];
												newButtons[index].linkText = value;
												setAttributes({buttons: newButtons});
											}}
										/>
									</div>
								))}
							</div>

							<Button
								isPrimary
								onClick={() => setAttributes({buttons: [...buttons, {url: "", linkText: ""}]})}
							>
								Add Button
							</Button>
						</div>

						<div className="block-hero__component">
							<label>Select Hero Image</label>

							{imageUrl && <img src={imageUrl} alt="" />}

							<MediaUpload
								onSelect={(media) => setAttributes({imageUrl: media.url})}
								allowedTypes={["image"]}
								value={imageUrl}
								render={({open}) => (
									<div className="block-hero__component-media">
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
				</div>
			</InspectorControls>

			<section className="section-hero">
				<div className="section-hero__container">
					<div className="section-hero__text-wrapper">
						<h1 className="section-title section-title__style-1">{sectionTitle}</h1>

						{
							sectionDescription && (
								<p className="section-hero__description">{sectionDescription}</p>
							)
						}

						{
							(buttons && buttons.length > 0) && (
								<div className="section-hero__buttons-wrapper">
									{
										buttons.map((button, index) => (
											(button.url && button.linkText) &&
												<a
													href={button.url}
													className="button"
												>
													{button.linkText}
												</a>
										)) 
									}
								</div>
							)
						}
					</div>

					<div className="section-hero__img-wrapper">
						<img src={imageUrl} alt="" />
					</div>
				</div>
			</section>
		</div>
	);
}