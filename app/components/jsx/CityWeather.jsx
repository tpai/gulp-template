var Tabs = ReactBootstrap.Tabs,
    Tab = ReactBootstrap.Tab;

var CityWeather = React.createClass({
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
      <Tabs activeKey={this.state.now} onSelect={this.handleSelect}>
        {
          this.state.city.map(function(city) {
            return (
              <Tab eventKey={city} title={city.toUpperCase()}>
                <h1>{city.charAt(0).toUpperCase() + city.slice(1)} City</h1>
                <WeatherDetail city={city}/>
              </Tab>
            );
          })
        }
      </Tabs>
    );
  }
});

var WeatherDetail = React.createClass({
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
        <div>
          <h4>{this.state.tem}°C / {this.state.inf}</h4>
          <DailyWeather data={this.state.data}/>
        </div>
      );
    else
      return <div>Loading...</div>;
  }
});
