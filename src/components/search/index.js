import { h, Component } from "preact";
import "./search.css";
import hh from "hyperscript-helpers";
const { div } = hh(h);

import debounce from "lodash.debounce";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state.text = props.defaultSearch;
    this.onSearch = debounce(this.props.onSearch, 300);
  }

  updateValue(ev) {
    this.setState({ text: ev.target.value });
    this.onSearch(ev.target.value);
  }

  render(props, { text }) {
    return div(
      { class: "search" },
      h("input", {
        type: "search",
        value: text,
        onInput: this.updateValue.bind(this)
      })
    );
  }
}
