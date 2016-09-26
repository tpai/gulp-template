var Tabs = ReactBootstrap.Tabs,
    Tab = ReactBootstrap.Tab;

var CityWeather = React.createClass({displayName: "CityWeather",
  getInitialState: function() {
    return {
      now: "taichung",
      city: ["taipei", "taichung", "Yunlin", "kaosiung"]
    };
  },
  handleSelect: function(val) {
    this.setState({now: val});
  },
  render: function() {
    return (
      React.createElement(Tabs, {activeKey: this.state.now, onSelect: this.handleSelect}, 
        
          this.state.city.map(function(city) {
            return (
              React.createElement(Tab, {eventKey: city, title: city.toUpperCase()}, 
                React.createElement("h1", null, city.charAt(0).toUpperCase() + city.slice(1), " City"), 
                React.createElement(WeatherDetail, {city: city})
              )
            );
          })
        
      )
    );
  }
});

var WeatherDetail = React.createClass({displayName: "WeatherDetail",
  getInitialState: function() {
    return {
      tem: "",
      inf: "",
      data: null
    };
  },
  componentDidMount: function() {
    var self = this;
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+this.props.city+",TW&units=metric", function(data) {
      self.setState({
        tem: data.list[0].temp.day,
        inf: data.list[0].weather[0].main+" ("+data.list[0].weather[0].description+")",
        data: data
      });
    });
  },
  render: function() {
    if (this.state.data !== null)
      return (
        React.createElement("div", null, 
          React.createElement("h4", null, this.state.tem, "°C / ", this.state.inf), 
          React.createElement(DailyWeather, {data: this.state.data})
        )
      );
    else
      return React.createElement("div", null, "Loading...");
  }
});

var Button = ReactBootstrap.Button,
    Modal = ReactBootstrap.Modal,
    Table = ReactBootstrap.Table;

var DailyWeather = React.createClass({displayName: "DailyWeather",
  getInitialState: function() {
    return {
      show: false
    };
  },
  close: function() {
    this.setState({show: false});
  },
  open: function() {
    this.setState({show: true});
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Button, {
          bsStyle: "primary", 
          bsSize: "large", 
          onClick: this.open
        }, 
          "Daily Weather"
        ), 

        React.createElement(Modal, {show: this.state.show, onHide: this.close}, 
          React.createElement(Modal.Header, {closeButton: true}, 
            React.createElement(Modal.Title, null, "Daily Weather")
          ), 
          React.createElement(Modal.Body, null, 
            React.createElement(Table, {striped: true, bordered: true, condensed: true, hover: true}, 
              React.createElement("thead", null, 
                React.createElement("tr", null, 
                  React.createElement("th", null, "Date"), 
                  React.createElement("th", null, "Weather"), 
                  React.createElement("th", null, "Temperature")
                )
              ), 
              React.createElement("tbody", null, 
                
                  this.props.data.list.map(function(each) {
                    return (
                      React.createElement("tr", null, React.createElement("td", null, new Date(each.dt*1000).toLocaleString()), React.createElement("td", null, each.temp.min, "°C~", each.temp.max, "°C"), React.createElement("td", null, each.weather[0].main, "(", each.weather[0].description, ")"))
                    );
                  })
                
              )
            )
          ), 
          React.createElement(Modal.Footer, null, 
            React.createElement(Button, {onClick: this.close}, "Close")
          )
        )
      )
    );
  }
});

React.render(React.createElement(CityWeather, null), document.getElementById("cityWeather"));
