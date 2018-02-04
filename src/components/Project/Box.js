import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import studies from "../../databaseStudies.js";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      content: {
        name: "simplePlot",
        type: "graphic",
        outputLoc: "http://www.sharpsightlabs.com/wp-content/uploads/2014/11/scatterplot-in-r_basic.png",
        studies: studies.slice(0, 10)
      }
    };
  },

  isDragging(props, monitor) {
    const item = monitor.getItem();
    return props.name === item.name;
  }
};

class Box extends Component {
  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div style={{ ...style, opacity }}>
        {isDropped ? <s>{name}</s> : name}
      </div>
    );
  }
}

Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDropped: PropTypes.bool.isRequired
};

export default DragSource(
  props => props.type,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box);
