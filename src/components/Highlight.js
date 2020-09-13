import React from "react";
import { Component } from "react";

class Highlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.kawalcorona.com/indonesia/"

    fetch(proxy + url)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result });
      });
  }
  render() {
    const { data } = this.state;
    return data.map((total, index) => (
      <div className="highlight" key={index.toString()}>
        <div className="highlight__flag">
          <img alt={'indonesia'} src="dist/img/indonesia.png" />
        </div>
        <div className="highlight__total">
          <div className="highlight__total-number">{total.positif}</div>
          <div className="highlight__total-status">Positif</div>
        </div>
        <div className="highlight__detail">
          <div className="highlight__detail-content">
            <div className="content-text">
              <div className="content-text__number">
                {parseInt(total.positif.split(",").join("")) -
                  parseInt(total.sembuh.split(",").join("")) -
                  parseInt(total.meninggal.split(",").join(""))}
              </div>
              <div className="content-text__status">Perawatan</div>
            </div>
            <div className="content-text">
              <div className="content-text__number">{total.sembuh}</div>
              <div className="content-text__status">Sembuh</div>
            </div>
            <div className="content-text">
              <div className="content-text__number">{total.meninggal}</div>
              <div className="content-text__status">Meninggal</div>
            </div>
          </div>
        </div>
      </div>
    ));
  }
}

export default Highlight;
