import View from '@ckeditor/ckeditor5-ui/src/view';
class KityFormularView extends View {
	constructor( locale ) {
		super( locale );
		const bind = this.bindTemplate;
		this.set( 'visibleClass', 'ck-fdialog-hidden' );
		this.set( 'styles', 'width:782px;height:482px' );
		// this.setTemplate('')
		this.setTemplate( {
			tag: 'div',
			children: [
				{
					tag: 'div',
					attributes: {
						class: 'ck-fdialog',
						style: bind.to( 'styles' )
					},
					children: [
						{
							tag: 'div',
							children: [
								'插入公式',
								{
									tag: 'div',
									attributes: {
										class: [ 'ck-dialog-close' ]
									},
									on: {
										click: bind.to( 'close' )
									},
									children: [
										{
											tag: 'i',
											attributes: {
												class: [ 'icon', 'iconfont', 'iconchahao' ]
											}
										}
									]
								}
							],
							attributes: {
								class: [ 'ck-dialog-title' ]
							}
						},
						{
							tag: 'iframe',
							attributes: {
								width: '780px',
								height: '380px',
								border: 'none',
								frameborder: '0',
								scrolling: 'no',
								src: '/static/kityformula-plugin/kityFormulaDialog.html'
							}
						},
						{
							tag: 'div',
							attributes: {
								class: 'ck-dialog-bottom'
							},
							children: [
								{
									tag: 'div',
									children: [
										'居中插入'
									],
									attributes: {
										class: 'ck-dialog-button'
									},
									on: {
										click: bind.to( 'insertAsImage' )
									}
								},
								{
									tag: 'div',
									children: [
										'行内插入'
									],
									on: {
										click: bind.to( 'insertInline' )
									},
									attributes: {
										class: 'ck-dialog-button'
									}
								}
							]
						}

					]
				}
			],
			attributes: {
				class: [ 'ck-fdialog-overlay',
					bind.to( 'visibleClass' )
				]
			}
		} );
	}
}
export default KityFormularView;
