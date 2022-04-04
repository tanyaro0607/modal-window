//метод appendAfter - добавить footer в html
Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling) //this это footer
}

//пустая функция
function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    //проходим по массиву buttons (= массиву объектов footerButtons)
     buttons.forEach(btn => {
         const $btn = document.createElement('button') //создаем кнопку
         $btn.textContent = btn.text //доб. текст из footerButtons
         $btn.classList.add('btn') // btn - базовый класс из bootstrap
         $btn.classList.add(`btn-${btn.type || 'secondary'}`)
         $btn.onclick = btn.handler || noop //доб. индивидуальный обработчик события
 
         wrap.appendChild($btn) //помещаем кнопку в блок wrap
        })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('wmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Modal window'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return console.log('modal is destroyed')
            }
            //если окно закрыто, то доб. класс open
           !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            //доб. класс hide на время анимации, затем удалить
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        },
    }

    const listener = evt => {
        if (evt.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal) //удаление node из dom-дерева
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        //замена контента в модальном окне
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}
