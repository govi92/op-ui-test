const style = {
  containerFluid: {
    display: 'flex',
    flex: '1',
    height: '100vh',
    backgroundImage: 'linear-gradient(black, blue)'
  },

  formContainer: {
    position: 'absolute',
    marginTop: '100px',
    marginLeft: '39%',
    padding: '30px',
    height: '500px',
    wdith: '30%',
    background: 'white',
    border: 'solid 1px black',
    borderRadius: '2%',
    boxShadow: '1px 1px 5px black'
  },

  topic: {
    textAlign: 'center'
  },

  subTopic: {
    textAlign: 'center'
  },

  formControl: {
    margin: '5px',
    minWidth: 290,
  },

  optionStyle: {
    paddingTop: '10px'
  },

  submitButton: {
    color: 'white',
    backgroundColor: '#8bc34a',
    marginTop: '30px',
    minWidth: 300
  },

  footer: {
    textAlign: 'center',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white'
  },

  errorContainer: {
    marginLeft: '10px',
    marginTop: '100px'
  },

  errorText: {
    textAlign: 'center',
    color: 'red',
  }, 
  errorTextLink: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: '70px',
    color: 'red',
  },
}

export default style;