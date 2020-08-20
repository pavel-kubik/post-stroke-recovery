import React from 'react';

class Canvas extends React.Component {

  constructor(props){
    super(props)
    // modify state with functions if necessary, and inherit objects from props
    let width = window.innerWidth;
    let height = window.innerHeight;
    let size = 100;
    this.state = {
        height: height,
        width: width,
        size: size,
        box: this.generateBox(width, height, size)
    }
    this.updateDimensions = this.updateDimensions.bind(this);
    this.resizeMethod = this.resizeMethod.bind(this);
  }

  generateBox(width, height, size) {
    let x = Math.random()*(width - 2*size) + size;
    let y = Math.random()*(height - 2*size) + size;
    return {
      x: x,
      y: y,
      size: size,
      fillColor: this.generateColor(),
      borderColor: this.generateColor()
    }
  }

  generateColor () {
    return '#' +  Math.random().toString(16).substr(-6);
  }

  componentDidMount() {
    this.updateCanvas();
    window.addEventListener('resize', this.resizeMethod);

    this.refs.canvas.addEventListener('mousemove', (e) => {
      let box = this.state.box;
      if (e.clientX >= box.x &&
          e.clientX <= box.x + box.size &&
          e.clientY >= box.y &&
          e.clientY <= box.y + box.size) {
        this.setState({ box: this.generateBox(
          this.state.width,
          this.state.height,
          this.state.size)});
        this.updateCanvas();
      }
    });
  }

  updateCanvas() {
    let {width, height, box} = this.state;

    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    //let boxes = this.state.boxes;
    //boxes.forEach(function(box) {
      ctx.fillStyle  = box.fillColor;
      ctx.strokeStyle = box.borderColor;
      ctx.lineWidth = 5;
      ctx.strokeRect(box.x, box.y, this.state.size, box.size);
      ctx.fillRect(box.x, box.y, this.state.size, box.size);
    //}.bind(this));
  }

  updateDimensions() {
    this.setState({
       height: window.innerHeight,
       width: window.innerWidth
     });
  }

  resizeMethod() {
      this.updateDimensions();
      this.updateCanvas();
  }

  render() {
    return (
        <canvas
          ref="canvas"
          height={this.state.height}
          width={this.state.width}>
        </canvas>
    )
  }
}

export default Canvas
