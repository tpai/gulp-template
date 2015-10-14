var Button = ReactBootstrap.Button,
    Modal = ReactBootstrap.Modal,
    Table = ReactBootstrap.Table;

var DailyWeather = React.createClass({
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
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Daily Weather
        </Button>

        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Daily Weather</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weather</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.data.list.map(function(each) {
                    return (
                      <tr><td>{new Date(each.dt*1000).toLocaleString().substr(0, 10)}</td><td>{each.temp.min}°C~{each.temp.max}°C</td><td>{each.weather[0].main}({each.weather[0].description})</td></tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
