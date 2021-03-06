var Icon = require('./icons.jsx');

module.exports = React.createClass({

  getInitialState() {
    return {
      value: this.props.value,
      iconState: this.getIconState(this.props.value)
    }
  },

  requiredPassed(input) {
    if (this.props.required === undefined) {
      return true;
    } else {
      return (input != '');
    }
  },

  regexPassed(input) {
    if (this.props.regex === undefined) {
      return true;
    } else {
      var re = new RegExp(this.props.regex);
      return re.test(input);
    }
  },

  handleChange(e) {
    this.setState({
      value: e.target.value,
      iconState: this.getIconState(e.target.value)
    });
  },

  getValue() {
    if (this.state.iconState == 'check-circle') {
      return this.state.value;
    } else {
      return null;
    }
  },

  getIconState(input) {
    if (this.regexPassed(input) && this.requiredPassed(input)) {
      return 'check-circle';
    } else {
      return 'exclamation-circle';
    }
  },

  setIconTitle() {
    var svg = $(this.refs.mainDiv.getDOMNode()).children('svg')[0];
    if (this.state.iconState == 'check-circle') {
      svg.setAttribute('title', 'OK');
    } else {
      svg.setAttribute('title', this.props.errorMessage);
    }
  },

  componentDidMount() {
    this.setIconTitle();
  },

  render() {
    return (
      <div className={this.props.groupClass} ref="mainDiv">
       <label htmlFor={this.props.text}>
        <span>{this.props.text}</span>
       </label>
       <input
         type="text"
         ref="txtInput"
         value={this.state.value}
         onChange={this.handleChange}
         className={this.props.className} />
       <Icon type={this.state.iconState} />
      </div>
      );
  },

  componentDidUpdate() {
    this.setIconTitle();
  }

});
