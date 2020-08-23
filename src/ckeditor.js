import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import DocumentEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import SimplerUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import EasyImage from './plugins/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from './plugins/ckeditor5-image/src/image';
import ImageCaption from './plugins/ckeditor5-image/src/imagecaption';
import ImageStyle from './plugins/ckeditor5-image/src/imagestyle';
import ImageToolbar from './plugins/ckeditor5-image/src/imagetoolbar';
import ImageUpload from './plugins/ckeditor5-image/src/imageupload';
import ImageResize from './plugins/ckeditor5-image/src/imageresize';
import Link from './plugins/ckeditor5-link/src/link';
import LinkImage from './plugins/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import File from './plugins/ckeditor5-file/src/file';
import FileUpload from './plugins/ckeditor5-file/src/fileupload';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Intent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import CodeBlock from './plugins/ckeditor5-code-block/src/codeblock';
import FullScreen from './plugins/ckeditor5-fullscreen/src/fullScreen';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import KityFormula from './plugins/ckeditor5-kityFormula/src/plugin';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import PendingActions from '@ckeditor/ckeditor5-core/src/pendingactions';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';

class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}

// class DocumentEditor extends DocumentEditorBase {}
const plugins = [
	PendingActions,
	RemoveFormat,
	Essentials,
	SpecialCharacters, SpecialCharactersEssentials,
	FullScreen,
	Bold,
	Italic, Underline, Strikethrough, Subscript, Superscript, Code,
	CodeBlock,
	BlockQuote,
	EasyImage,
	Heading,
	Image,
	Intent,
	IndentBlock,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageResize,
	ImageUpload,
	SimplerUploadAdapter,
	Link,
	List,
	LinkImage,
	Paragraph,
	Alignment,
	File,
	FileUpload,
	FontColor,
	FontBackgroundColor,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	PasteFromOffice,
	KityFormula,
	Autosave
];
const customColorPalette = [
	{
		color: '#c00000',
		label: '#c00000'
	},
	{
		color: '#FF0000',
		label: '#FF0000'
	},
	{
		color: '#FFC000',
		label: '#FFC000'
	},
	{
		color: '#FFFF00',
		label: '#FFFF00'
	},
	{
		color: '#92D050',
		label: '#92D050'
	},
	{
		color: '#00B050',
		label: '#00B050'
	},
	{
		color: '#00B0F0',
		label: '#00B0F0'
	},
	{
		color: '#0070C0',
		label: '#0070C0'
	},
	{
		color: '#002060',
		label: '#002060'
	},
	{
		color: '#7030A0',
		label: '#7030A0'
	},
	{
		color: '#000000',
		label: '#000000'
	},
	{
		color: '#333333',
		label: '#333333'
	},
	{
		color: '#666666',
		label: '#666666'
	},
	{
		color: '#999999',
		label: '#999999'
	},
	{
		color: '#cccccc',
		label: '#cccccc'
	},
	{
		color: '#ffffff',
		label: '#ffffff'
	}

	// ...
];
ClassicEditor.builtinPlugins = plugins;
InlineEditor.builtinPlugins = plugins;
// DocumentEditor.builtinPlugins = plugins
const config = {
	language: 'en',
	// ...
	toolbar: [
		'removeFormat',
		'|',
		'heading',
		'|',
		'alignment', // <--- ADDED
		'bold',
		'italic',
		'underline', 'strikethrough', 'subscript', 'superscript', 'code',
		'fontColor',
		'fontBackgroundColor',
		'|',
		'link',
		'outdent',
		'indent',
		'bulletedList',
		'numberedList',
		'insertTable',
		'imageUpload',
		'codeBlock',
		'blockQuote',
		'fileUpload',
		'kityformula',
		'specialCharacters',
		'fullScreen'
	],
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells',
			'tableProperties', 'tableCellProperties' ],
		tableProperties: {
			borderColors: customColorPalette,
			backgroundColors: customColorPalette
		},

		// Set the palettes for table cells.
		tableCellProperties: {
			borderColors: customColorPalette,
			backgroundColors: customColorPalette
		}
	},
	codeBlock: {
		languages: [
			// Do not render the CSS class for the plain text code blocks.
			{ language: 'plaintext', label: 'Plain text', class: '' },
			// Use the "php-code" class for PHP code blocks.
			{ language: 'C', label: 'C', class: 'C-code' },
			{ language: 'C++', label: 'C++', class: 'C++-code' },
			{ language: 'Java', label: 'Java', class: 'java-code' },
			{ language: 'Shell', label: 'Shell', class: 'Shell-code' },
			// Use the "php-code" class for PHP code blocks.
			{ language: 'php', label: 'PHP', class: 'php-code' },
			// Use the "js" class for JavaScript code blocks.
			// Note that only the first ("js") class will determine the language of the block when loading data.
			{ language: 'javascript', label: 'JavaScript', class: 'js javascript js-code' },

			// Python code blocks will have the default "language-python" CSS class.
			{ language: 'python', label: 'Python' }
		],
		indentSequence: '\t'
	},
	indentBlock: {
		offset: 1,
		unit: 'em'
	},
	link: {
		// Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
		addTargetToExternalLinks: true,

		// Let the users control the "download" attribute of each link.
		decorators: [
			{
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'download'
				}
			}
		]
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
		]
	},
	image: {
		upload: {
			types: [ 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff' ]
		},
		resizeUnit: 'px',
		toolbar: [
			'imageStyle:full',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'linkImage'
		],
		styles: [
			// This option is equal to a situation where no style is applied.
			'full',
			'alignCenter',
			// This represents an image aligned to the left.
			'alignLeft',

			// This represents an image aligned to the right.
			'alignRight'
		]
	},
	fontColor: {
		colors: customColorPalette
	},
	fontBackgroundColor: {
		colors: customColorPalette
	}
	// autosave: {
	//   waitingTime: 50,
	//   save (editor) {
	//     console.log('--save', editor.getData())
	//     // return saveData( editor.getData() );
	//   }
	// }
};

ClassicEditor.defaultConfig = config;
InlineEditor.defaultConfig = config;
// DocumentEditor.defaultConfig = config
export default {
	classicEditor: ClassicEditor,
	inlineEditor: InlineEditor
};
