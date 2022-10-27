/**
 * BLOCK: devit-test-accorderon
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { useBlockProps, RichText } from '@wordpress/block-editor';




/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-devit-test-accorderon', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'DevIT test Accordeon' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'DevIT test Accordeon' ),
		__( 'Devit' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		items: {
			type: 'array',
			selector: '.accordeon-item',
			source: 'query',
			default: [],
			query: {
				title: {
					type: 'string',
					selector: '.accordeon-item-title',
					source: 'html'
				},
				text: {
					type: 'string',
					selector: '.accordeon-item-content-inner',
					source: 'html'
				},
			}
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( {className, attributes, setAttributes} ) => {
		// Creates a <p class='wp-block-cgb-block-devit-test-accorderon'></p>.

		//console.log('EDIT', attributes);

		const item = (i, ghost = false) => {

			return <div role="listitem" className={(ghost ? ' ghost ' : ' expanded ') + " accordeon-item"}>
				<div className="accordeon-item-number">{( i<8 ? '0'+(i+1) : i)}</div>
				
					<h2 className="accordeon-item-title">
						{ghost ? __("Click \"+\" to addd new item ->", 'dtd') : 
							<RichText
								value={attributes.items[i].title}
								placeholder="Enter title here"
								onChange={content => {
									let items = attributes.items.slice();
									items[i].title = content;
									setAttributes({items: items});
								}}
							/>
						}
					</h2>
					{ghost ? '' : 
					<div className="accordeon-item-content">
						<div className="accordeon-item-content-inner">
							<RichText
									value={attributes.items[i].text}
									placeholder="Enter text here"
									onChange={content => {
										let items = attributes.items.slice();
										items[i].text = content;
										setAttributes({items: items});
									}}
								/>
						</div>
					</div>
					}
					
				<a className='accordeon-item-toggler' 
					href="#"
					role="button"
					title={ghost ? __('Add item', 'dtd') : __('Remove this item', 'dtd')}
					onClick={() => {
						let items = attributes.items.slice();

						if(ghost){
							items.push({});
							setAttributes({items: items});
							return;
						}

						if (!confirm(__("Are you sure, you want to remove this item?", 'dtd')))
							return;

						items.splice(i, 1);
						setAttributes({items: items});
					}}/>
			</div>

		};




		return (
			<div className={ className } role="list">
				{attributes.items.map((it, i) => {
					return item(i);
				})}
				{item(attributes.items.length, true)}
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		const {attributes} = props;
		const {items} = attributes;

		const item = (i) => {

			return <div role="listitem" className={ "accordeon-item" + (i === 0 ? " expanded" : "") }>
				<div className="accordeon-item-number">{( i<8 ? '0'+(i+1) : i)}</div>
				
					<h2 className="accordeon-item-title">
						<RichText.Content value={attributes.items[i].title}/>
					</h2>
					 
					<div className="accordeon-item-content">
						<div className="accordeon-item-content-inner">
							<RichText.Content value={attributes.items[i].text}/>
						</div>
					</div> 
					
					
				<a className='accordeon-item-toggler'
					role="button"
					href="#"
				/>
			</div>

		};

		return (
			<div className={ props.className } role="list">
				{items.map((it, i) => {
					return item(i);
				})}
			</div>
		);
	},
} );
