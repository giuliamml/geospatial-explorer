const formatBbox = (bboxArray: number[]) => {
  if (!bboxArray || bboxArray.length !== 4) {
    return "Invalid Bbox";
  }

  return `SW: ${parseFloat(bboxArray[1].toFixed(2))}, ${parseFloat(
    bboxArray[0].toFixed(2)
  )} - NE: ${parseFloat(bboxArray[3].toFixed(2))}, ${parseFloat(
    bboxArray[2].toFixed(2)
  )}`;
};
export default formatBbox;
