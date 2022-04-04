fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://images.pexels.com/photos/4399942/pexels-photo-4399942.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'},
    {id: 1, title: 'Апельсины', price: 30, img: 'https://images.pexels.com/photos/5689628/pexels-photo-5689628.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'},
    {id: 1, title: 'Манго', price: 40, img: 'https://images.pexels.com/photos/7543212/pexels-photo-7543212.jpeg?auto=compress&cs=tinysrgb&h=750&w=12600'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary">Посмотреть цену</a>
                <a href="#" class="btn btn-danger">Удалить</a>
            </div>
        </div>
    </div>
`

//рендерит список
function render() {
    const html = fruits.map(toHTML).join('') 
    document.querySelector('#fruits').innerHTML = html
}

render()

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
