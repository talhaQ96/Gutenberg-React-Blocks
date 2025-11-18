import {useBlockProps, MediaUpload, InspectorControls} from "@wordpress/block-editor";
import {PanelBody, TextControl, TextareaControl, Button, IconButton, SelectControl} from "@wordpress/components";

import IconPlus from '../../react-components/IconPlus';

export default function Edit({attributes, setAttributes}) {
	const {sectionTitle, sectionDescription, buttonURL, buttonText, faqs, sectionPaddingTop, sectionPaddingBottom} = attributes;

	const sectionClasses = [
		'section-faq',
		`padding-top--${sectionPaddingTop}`,
		`padding-bottom--${sectionPaddingBottom}`,
	].join(' ');

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<div className="block-faq">
					<PanelBody title="Content" initialOpen={false}>
						<div className="block-faq__component">
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

						<div className="block-faq__component">
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

					<PanelBody title="FAQs" initialOpen={false}>
						<div className="block-faq__component">
							<label>FAQs</label>

							<div className="block-faq__wrapper">
								{
									faqs.map((faq, index) => (
										<div key={index} className="block-faq__item">
											<IconButton
												icon="dismiss"
												className="block-faq__item-del-icon"
												onClick={() => {
													const newFAQ = faqs.filter((_, i) => i !== index);
													setAttributes({faqs: newFAQ});
												}}
											/>

											<TextControl
												value={faq.question}
												placeholder="Type Question"
												onChange={(value) => {
													const newFAQs = [...faqs];
													newFAQs[index].question = value;
													setAttributes({faqs: newFAQs});
												}}
											/>

											<TextareaControl
												value={faq.answer}
												placeholder="Type Answer"
												onChange={(value) => {
													const newFAQs = [...faqs];
													newFAQs[index].answer = value;
													setAttributes({faqs: newFAQs});
												}}
											/>
										</div>
									))
								}
							</div>

							<Button
								isPrimary
								onClick={() => setAttributes({faqs: [...faqs, {question: "", answer: ""}]})}
							>
								Add FAQ
							</Button>
						</div>
					</PanelBody>

					<PanelBody title="Appearance" initialOpen={false}>
						<div className="block-faq__component">
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
							<div className="section-faq__header">
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
										<div className="section-faq__header-button">
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
						)
					}

					{
						faqs && faqs.length > 0 && (
							<div className="section-faq__body">
								{
									faqs.map((faq, index) => {
										let openClass = index === 0 ? ' open' : '';

										return (
											<div className="faq">
												<div className="faq__question">
													<h3 className="section-title__style-6 faq__question-title">{faq.question}</h3>

													<div className={`faq__question-icon ${openClass}`}>
														<IconPlus />
													</div>
												</div>

												<div className={`faq__answer ${openClass}`}>
													{faq.answer}
												</div>
											</div>
										)
									})
								}
							</div>
						)
					}
				</div>
			</section>
		</div>
	);
}