let fruits = [
    {id: 1, title: 'Яблоки', price: 100, img: 'https://images.pexels.com/photos/4399942/pexels-photo-4399942.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'},
    {id: 2, title: 'Апельсины', price: 150, img: 'https://images.pexels.com/photos/5689628/pexels-photo-5689628.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'},
    {id: 3, title: 'Манго', price: 400, img: 'https://images.pexels.com/photos/7543212/pexels-photo-7543212.jpeg?auto=compress&cs=tinysrgb&h=750&w=12600'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px" src="${fruit.img}" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
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

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close() //закрытие окна
        }}
    ]
})

document.addEventListener('click', evt => {
    evt.preventDefault() //удаление хэша # по ссылке
    const btnType = evt.target.dataset.btn //элемент содержащий data атрибут btn (т.e. data-btn)
    const id = +evt.target.dataset.id
    const fruit = fruits.find(f => f.id === id) //поиск фрукта по id

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price} руб/кг</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете <strong>${fruit.title}</strong></p>`
        }).then(() => {
            //удаление элемента
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('отменить')
        })
    }
})
