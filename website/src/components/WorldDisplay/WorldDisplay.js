import './WorldDisplay.css';
function WorldDisplay(props) {
  const {cells, view_size, world_size} = props;

  const cell_size = view_size/world_size;

  const cellElements = [];
  for (let x = 0; x < world_size; x++) {
    for (let y = 0; y < world_size; y++) {
      const cell = findCell(x, y, cells);
      const cellElement = <Cell x={x} y={y} size={cell_size} filled={cell !== null}/>;
      cellElements.push(cellElement);
    }
  }

  return (
    <svg width={view_size} height={view_size}>
      {cellElements}
    </svg>
  );
}

function Cell(props) {
  const {x, y, size, filled} = props;
  const true_x = x*size;
  const true_y = y*size;
  return (<rect className={filled?'filled':'empty'} x={true_x} y={true_y} width={size} height={size} onClick={() => console.log('Looking at '+x+','+y)}/>);
}

function findCell(x, y, cells) {
  const result = cells.filter((cell) => cell.x === x && cell.y === y);
  if (result.length === 1) {
    return result[0];
  } else {
    return null;
  }
}
export default WorldDisplay;
