function ResetButton(props) {
  return (
    <>
      <button type="button" className="reset-btn" onClick={props.handleClick}>
        New Game
      </button>
    </>
  );
}
export default ResetButton;
