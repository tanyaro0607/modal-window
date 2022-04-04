const modal = $.modal({
    title: 'Tatiana Modal',
    closable: true,
    content: `
        <p>One two three four.</p>
        <p>Five six seven eight nine ten.</p>
    `,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary button clicked')
            modal.close() //закрытие окна
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger button clicked')
            modal.close() //закрытие окна
        }}
    ]
})
