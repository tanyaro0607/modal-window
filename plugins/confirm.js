$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'Отменить', type: 'secondary', handler() {
                    modal.close() //закрытие окна
                    reject() //отмена
                }}, 
                {text: 'Удалить', type: 'danger', handler() {
                    modal.close() //закрытие окна
                     resolve() //удалить
                }}
            ]
        })

        setTimeout(() => modal.open(), 100)
    })
}