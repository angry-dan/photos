import "./photoPreloader.css";
import { h, Component } from "preact";
import hh from "hyperscript-helpers";
const { div } = hh(h);

import PreactTransitionGroup from "preact-transition-group/dist/preact-transition-group.js";

export default class PhotoPreloader extends Component {
  constructor(props) {
    super(props);
    this.state.loaded = false;
  }

  componentDidMount() {
    this.preload(this.props.photos);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ loaded: false });
    this.preload(newProps.photos);
  }

  preload(photos) {
    const urls = photos.map(p => p.url_m).map(
      url =>
        new Promise((resolve, reject) => {
          const i = new Image();
          i.onload = resolve;
          i.onerror = reject;
          i.src = url;
        })
    );
    const d = () => this.setState({ loaded: true });
    Promise.all(urls)
      // My IE polyfill doesn't have `finally` support.
      .then(d)
      .catch(d);
  }
  render({ children }) {
    return div({ class: "photo-preloader" }, [
      h(
        PreactTransitionGroup,
        { component: "div" },
        !this.state.loaded ? h(Loader) : undefined
      ),
      ...(this.state.loaded ? [div({}, children)] : [])
    ]);
  }
}

class Loader extends Component {
  componentWillLeave(cb) {
    this.setState({ done: true });
    setTimeout(cb, 300);
  }

  render(props) {
    return div({
      class: [
        "photo-preloader__l",
        this.state.done
          ? "photo-preloader__l--done"
          : "photo-preloader__l--loading"
      ].join(" ")
    });
  }
}
