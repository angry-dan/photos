import { h, Component } from "preact";
import hh from "hyperscript-helpers";

const { div, dl, dd, dt, a, b, br } = hh(h);

const PER_ROW = 4;

import "./photos.css";

export default class Photos extends Component {
  constructor({ photos }) {
    super();
    this.state.selected = false;
    this.state.delayTimers = Math.floor(photos.length / PER_ROW) + PER_ROW;
    this.cardClick = this.cardClick.bind(this);
  }

  componentDidMount() {
    for (let i = 0; i < this.state.delayTimers; i++) {
      setTimeout(() => this.setState({ animateCardsStep: i }), 75 * (i + 1));
    }
  }

  cardClick(id) {
    this.setState({ selected: this.state.selected !== id ? id : false });
  }

  render({ photos }) {
    // Add's an enterAfter property to the photos, so that they
    // can be faded in a bit like this:
    // 0, 1, 2, 3,
    // 1, 2, 3, 4,
    // 2, 3, 4, 5
    const addDelayCounters = (p, i) =>
      Object.assign({}, p, {
        enterAfter: i - Math.floor(i / PER_ROW) * (PER_ROW - 1)
      });

    const photoCard = p =>
      div(
        {
          class: [
            "photos__card",
            this.state.selected === p.id ? "photos__card--flipped" : undefined,
            this.state.animateCardsStep >= p.enterAfter
              ? "photos__card--in"
              : undefined
          ].join(" "),
          onClick: this.cardClick.bind(this, p.id),
          dataOrder: p.enterAfter
        },
        [
          div(
            { class: "photos__info" },
            dl({}, [
              dd({}, [
                a(
                  {
                    href: `https://www.flickr.com/photos/${p.owner}/${p.id}`
                  },
                  p.title ? p.title : "📷"
                ),
                b({}, " by "),
                a(
                  { href: `https://www.flickr.com/photos/${p.owner}` },
                  p.ownername
                )
              ]),
              ...(p.description._content
                ? [
                    dt({}, `description: `),
                    dd({
                      // I'm trusting Flickr not to stab me in the back here.
                      dangerouslySetInnerHTML: {
                        __html: p.description._content
                      }
                    })
                  ]
                : []),
              ...(p.tags ? [dt({}, `tags: `), dd({}, p.tags)] : [])
            ])
          ),
          h("img", { class: "photos__photo", src: p.url_m, alt: p.title })
        ]
      );

    return div(
      { class: "photos" },
      photos.map(addDelayCounters).map(photoCard)
    );
  }
}
