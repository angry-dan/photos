import { h, Component } from "preact";
import hh from "hyperscript-helpers";
const { div } = hh(h);

import PhotoPreloader from "../photoPreloader";
import Photos from "../photos";
import Search from "../search";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.search(props.defaultSearch);
  }

  search(term) {
    if (term) {
      fetch(
        "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
          `&text=${encodeURIComponent(term)}` +
          "&api_key=ec5d10a8f8941742a236aae85aa58c8e" +
          "&format=json" +
          "&nojsoncallback=1" +
          "&extras=description,owner_name,tags,url_m" +
          // I've turned on the getty images filter just because otherwise you get a lot of junk back for most searches.
          "&is_getty=1" +
          "&per_page=40"
      )
        .then(r => r.json())
        .then(r => this.setState({ photos: r.photos.photo }));
    }
  }

  render({ defaultSearch }) {
    return div({ class: "app" }, [
      h(Search, { defaultSearch, onSearch: this.search.bind(this) }),
      ...(this.state.photos
        ? [
            h(
              PhotoPreloader,
              { photos: this.state.photos },
              h(Photos, { photos: this.state.photos })
            )
          ]
        : [])
    ]);
  }
}
