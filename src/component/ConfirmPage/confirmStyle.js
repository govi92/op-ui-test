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
    position: 'absolute',
    bottom: 30,
    minWidth: 345,
    color: 'white',
    backgroundColor: '#8bc34a',
    marginTop: '30px',
  },

  containerFluid: {
    display: 'flex',
    flex: '1',
    height: '100vh',
    backgroundImage: 'linear-gradient(blue, red)'
  },

  formWrapper: {
    // width: '800px',
    // margin: '0 auto',
  },

  formContainer: {
    position: 'absolute',
    marginTop: '100px',
    marginLeft: '38%',
    padding: '30px',
    height: '520px',
    width: 'auto',
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

  textContainer: {
    marginTop: 100,
    marginBottom: 100,
    textAlign: 'center'
  },

  confirmButton: {
    
  },

  footer: {
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white'
  },

  footerText: {
    color: '#ededed'
  }
};

export default style;