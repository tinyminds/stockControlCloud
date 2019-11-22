import "./StockItemsList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import StockItemsListItem from "./StockItemsListItem";
import Preloader from "./Preloader";
import { Inputs } from "./Inputs"
const initialState = {
  addFormVisible: false,
  subtype: "",
  type: "",
  price: 0,
  material: "",
  submaterial: "",
  description: "",
  quantity: 1,
  isstocklive: 0,
  labelwritten: 0,
  soldquantity: 0
}
class StockItemsList extends Component {
  constructor () {
    super();
    this.state = {
      ...initialState,
      priceAsc:false,
      typeAsc:false,
      orderType: "type"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFilter(fieldName, fieldValue, comparitor, order) {
    //if the comparitor is not == then use order passed
    this.props.fetchStockItemsFilter(fieldName, fieldValue, comparitor, this.state.orderType);
  };

  handleOrder(type , val) {
    const order = val?"asc":"desc";
    this.setState({priceAsc : this.state.priceAsc?false:true});
    this.setState({typeAsc : this.state.typeAsc?false:true});
    this.setState({orderType : type});
    this.props.fetchStockItems(this.props.auth.uid, type, order);
  };

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleFormSubmit (event) {
    const { addStockitem, auth } = this.props;
    event.preventDefault();
    addStockitem({  subtype: this.state.subtype,
                    type: this.state.type, 
                    price: this.state.price,
                    material: this.state.material,
                    submaterial: this.state.submaterial,
                    description: this.state.description,
                    quantity: this.state.quantity,
                    isstocklive: this.state.isstocklive,
                    labelwritten: this.state.labelwritten,
                    soldquantity: this.state.soldquantity 
                  }, auth.uid);
    this.setState({ ...initialState, addFormVisible:true });
  };

  renderAddForm = () => {
    if (this.state.addFormVisible) {
      return (
        <div id="add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
          <Inputs name={"type"} type={"text"} label={"Type of item"} 
          onChange={this.handleChange} 
          value={this.state.type}
          /> 
          <Inputs name={"subtype"} type={"text"} label={"Subtype of item"} 
          onChange={this.handleChange} 
          value={this.state.subtype}
          /> 
          <Inputs name={"material"} type={"text"} label={"Material"} 
          onChange={this.handleChange} 
          value={this.state.material}
          />
          <Inputs name={"submaterial"} type={"text"} label={"Subtype of material"} 
          onChange={this.handleChange} 
          value={this.state.submaterial}
          />
          <Inputs name={"description"} type={"text"} label={"Description"}
          onChange={this.handleChange} 
          value={this.state.description}
          />
          <Inputs name={"isstocklive"} type={"number"} title={"Live?"} min={"0"} max={"1"}
          onChange={this.handleChange} 
          value={this.state.isstocklive}
          />
          <Inputs name={"quantity"} type={"number"} title={"Quantity"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.quantity}
          />
          <Inputs name={"soldquantity"} type={"number"} title={"Sold Quantity"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.soldquantity}
          />
          <Inputs name={"price"} type={"number"} title={"Price: £"} min={"0"}
          onChange={this.handleChange} 
          value={this.state.price}
          />
          <Inputs name={"labelwritten"} type={"number"} title={"Labeled?"} min={"0"} max={"1"}
          onChange={this.handleChange} 
          value={this.state.labelwritten}
          />
            <br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  };

  renderStockItems() {
    const { data } = this.props;
        return data[0][0].map((item, index) => (
          <StockItemsListItem key={index} stockItemId={data[1][0][index]} stockItem={item}/>
          )
        );
  }

  componentDidMount() {
    const { auth } = this.props;
    this.props.fetchStockItems(auth.uid, 'type', 'asc');
  }
  
  render() {
    const { typeAsc, priceAsc, addFormVisible } = this.state;
    if (this.props.data === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    return (
      <div className="list-container">
        <div className="row">
        <br/>
         
          {this.renderAddForm()}
          {this.renderStockItems()}
         
        </div>
        <div className="fixed-action-btn">
        <button
        onClick={() => this.handleOrder("price", priceAsc?false:true)}
        className="teal txtBut">
          {priceAsc ? (<i>Sort by Price desc</i>) : (<i>Sort by Price asc</i>)}
        </button>
        <button
        onClick={() => this.handleOrder("type", typeAsc?false:true)}
        className="teal txtBut">
          {priceAsc ? (<i>Sort by Type desc</i>) : (<i>Sort by Type asc</i>)}
        </button>
        <button
        onClick={() => this.handleFilter("labelwritten", 1, "==", "type")}
        className="blue txtBut">
          <i>Filter Label Written</i>
        </button>
        <button
        onClick={() => this.handleFilter("labelwritten", 0, "==", "type")}
        className="blue txtBut">
          <i>Filter Label Not Written</i>
        </button>
        <button
        onClick={() => this.handleFilter("isstocklive", 1, "==", "type")}
        className="blue txtBut">
          <i>Filter Live Stock</i>
        </button>
        
          <button
            onClick={this.props.signOut}
            id="sign-out-button"
            className="btn-floating btn-large teal darken-4">
            <i className="large material-icons">exit_to_app</i>
          </button>
      
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4">
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
              <i className="large material-icons">add</i>
            )}
          </button>
          
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(StockItemsList);
