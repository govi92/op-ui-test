import images from '../../assets/image';

const style = {
  label: {
    marginTop: '10px'
  },

  row: {
    paddingTop: '40px',
    paddingBottom: '20px'
  },

  loginButton: {
    color: 'white',
    backgroundColor: '#007bff',
    marginTop: '30px',
    minWidth: '100%'
  },

  containerFluid: {
    display: 'flex',
    flex: '1',
    height: '100vh',
    backgroundImage: "url(https://hdqwalls.com/wallpapers/city-blurred-hd.jpg)",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  formWrapper: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  formContainer: {
    position: 'absolute',
    marginTop: '100px',
    marginLeft: '37%',
    padding: '30px',
    height: '500px',
    width: '25%',
    background: 'white',
    border: 'solid 1px white',
    borderColor: 'transparent',
    borderRadius: '2%',
    boxShadow: '1px 1px 5px black'
  },

  formContainerExtended: {
    position: 'absolute',
    marginTop: '100px',
    marginLeft: '35%',
    padding: '30px',
    height: '560px',
    width: '30%',
    background: 'white',
    border: 'solid 1px black',
    borderRadius: '2%',
    boxShadow: '1px 1px 5px black'
  },

  topic: {
    textAlign: 'center',
  },

  subTopic: {
    textAlign: 'center',
    paddingBottom: '10px'
  },

  inputContainer: {
    // marginBottom: '10px'
  },

  inputStyle: {
    // marginBottom: '10px'
  },

  loginGoogle: {
    color: 'white',
    fontWeight: 'bold',
    background: '#dd4b39',
    width: "200px !important"
  },

  loginFacebook: {
    color: 'white',
    fontWeight: 'bold',
    background: '#3b5998'
  },

  hrContainer: {
    paddingTop: '20px'
  },

  styleEight: {
    overflow: 'visible', /* For IE */
    textAlign: 'center',
    ':after': {
      content: "OR",
      display: 'inline-block',
      position: 'relative',
      top: '-0.7em',
      fontSize: '1em',
      padding: '0 0.25em',
      background: 'white'
    },
  },

  iconStyle: {
    marginLeft: '15px'
  },

  footer: {
    backgroundColor: 'black',
    opacity: '0.6',
    textAlign: 'center',
    position: 'fixed',
    padding: '10px',
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white'
  },

  footerTopic: {
    fontWeight: 'bold',
    opacity: '1'
  },

  errorMsg: {
    background: '#cc0000',
    border: 'solid 1px red',
    borderRadius: '2%',
    boxShadow: '1px 1px 2px black'
  },

  errorText: {
    margin: '5px',
    textAlign: 'center',
    color: 'white',
  }
};

export default style;