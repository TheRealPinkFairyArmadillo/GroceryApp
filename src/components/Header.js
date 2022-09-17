const Header = (props) => {
  return (
    <header>
      <h1>Company Name</h1>
      <h1>Company Logo</h1>
      <h5> Hello, {props.userName} </h5>
    </header>
  )
}
export default Header