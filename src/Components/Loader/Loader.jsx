import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from '../Loader/Loader.module.css';

class Spinner extends React.Component {
  render() {
    return (
        <div className={s.Container}>
            <Loader
                type="Grid"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={3000}
            />
      </div>
    );
  }
}
export default Spinner;