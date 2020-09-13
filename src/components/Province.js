import React, { Component } from "react";

class Province extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isToggle: true,
    };
    this.getProvince = this.getProvince.bind(this);
  }
  componentDidMount() {
    this.getProvince();
  }
  getProvince() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const urlIndo = "https://api.kawalcorona.com/indonesia/provinsi/";
    const urlGlobal = "https://api.kawalcorona.com"
    if (this.state.isToggle === true) {
      fetch(proxy + urlIndo)
        .then((response) => response.json())
        .then((result) => {
          this.setState({ data: result });
        });
    } else {
      fetch(proxy + urlGlobal)
        .then((response) => response.json())
        .then((result) => {
          this.setState({ data: result });
        });
    }

    this.setState((prevState) => ({
      isToggle: !prevState.isToggle,
    }));
  }

  render() {
    const { data } = this.state;
    if (this.state.isToggle === true) {
      return (
        <div className="detail-province">
          <div className="detail-province__title">
            <div className="text-title">Kasus di Dunia</div>
            <button className="btn-toggle" onClick={this.getProvince}>
              {this.state.isToggle ? "Kasus Indonesia" : "Kasus Dunia"}
            </button>
          </div>
          {data.map((total, index) => (
            <div className="detail-province__list" key={index.toString()}>
              <div className="detail-province__list-data">
                <div className="data-province">
                  {total.attributes.Country_Region}
                </div>
                <div className="data-covid">
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Confirmed}
                    </div>
                    <div className="data-covid__detail-status">Terkonfirmasi</div>
                  </div>
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Recovered}
                    </div>
                    <div className="data-covid__detail-status">Sembuh</div>
                  </div>
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Deaths}
                    </div>
                    <div className="data-covid__detail-status">Meninggal</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="detail-province">
          <div className="detail-province__title">
            <div className="text-title">Kasus di Indonesia</div>
            <button className="btn-toggle" onClick={this.getProvince}>
              {this.state.isToggle ? "Kasus Indonesia" : "Kasus Dunia"}
            </button>
          </div>
          {data.map((total, index) => (
            <div className="detail-province__list" key={index.toString()}>
              <div className="detail-province__list-data">
                <div className="data-province">{total.attributes.Provinsi}</div>
                <div className="data-covid">
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Kasus_Posi}
                    </div>
                    <div className="data-covid__detail-status">Terkonfirmasi</div>
                  </div>
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Kasus_Semb}
                    </div>
                    <div className="data-covid__detail-status">Sembuh</div>
                  </div>
                  <div className="data-covid__detail">
                    <div className="data-covid__detail-number">
                      {total.attributes.Kasus_Meni}
                    </div>
                    <div className="data-covid__detail-status">Meninggal</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Province;
