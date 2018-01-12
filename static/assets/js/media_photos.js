/* jshint esversion:6 */
function make_element(name, attrs=[], children=[]) {
    const ele = document.createElement(name);
    attrs.forEach(v => ele.setAttribute(v[0], v[1]));
    children.forEach(v => ele.appendChild(typeof v === 'object' ? v : document.createTextNode(v)));
    return ele;
}
function handle_hash(h) {
    switch (h) {
        case '/': {
            out_photos.style.display = 'none';
            out_list.style.display = 'block';
            break;
        }
        default: {
            out_list.style.display = 'none';
            out_photos.style.display = 'block';
            const q = h.substring(1);
            console.log(q);
            const ele = document.querySelector(`[data-event="${q}"]`);
            if (ele === null) return;
            console.log(ele.dataset);
            out_photos.children[0].textContent = ele.dataset.title;
            out_photos.children[1].remove();
            const slick = make_element('div',[['class','single-item']]);
            (new Array(parseInt(ele.dataset.count)).fill(0))
            .map((v,i) => i + 1)
            .map(v => make_element('img',[['src',`../assets/img/gallery/${q}/${v}.jpg`]]))
            .map(v => make_element('figure', [], [v]))
            .forEach(v => slick.appendChild(v));
            out_photos.appendChild(slick);
            $('.single-item').slick({
                dots: true,
                infinite: true,
                centerMode: true,
                variableWidth: true
            });
            break;
        }
    }
}

const out_list = document.getElementById('gallery_list');
const out_photos = document.getElementById('gallery_photos');

(function page_init() {
    fetch('../assets/gallery_photos.json')
    .then((x) => x.json())
    .then((x) => {
        for (const year_id of Object.keys(x)) {
            const year = x[year_id];
            let year_ele = make_element('div');
            year_ele.appendChild(make_element('p', [], [year_id]));
            let event_list = make_element('div', [['class','figure-list']]);
            for (const event_id of Object.keys(year)) {
                const event = year[event_id];
                let fig = make_element('figure', [['data-event',`${year_id}/${event_id}`],['data-count',event[0]],['data-title',event[1]]], [
                    make_element('a', [['href',`#/${year_id}/${event_id}`]], [
                        make_element('img', [['src',`../assets/img/gallery/${year_id}/${event_id}/1.jpg`]])
                    ]),
                    make_element('figcaption', [], [
                        event[1]
                    ])
                ]);
                event_list.appendChild(fig);
            }
            year_ele.appendChild(event_list);
            year_ele.appendChild(make_element('br'));
            out_list.appendChild(year_ele);
        }
        window.addEventListener('hashchange', function(e) {
            handle_hash(e.newURL.substring(e.newURL.indexOf('#') + 1));
        });
        if (location.hash === '') {
            location.hash = '/';
        }
        else {
            handle_hash(location.hash.substring(1));
        }
    });
})();
